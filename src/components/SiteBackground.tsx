import { useEffect, useRef } from 'react';

/**
 * Fixed full-viewport canvas that renders a slowly breathing halftone dot
 * field. The dot radius and opacity are modulated by a sum-of-sines noise
 * field (cheap, GPU-light) plus a soft spotlight that trails the cursor.
 *
 * - Respects `prefers-reduced-motion` (freezes the animation).
 * - Skips the cursor spotlight on coarse pointers.
 * - Uses `visibilityState` to pause work when the tab is hidden.
 *
 * Mounted once at the root under everything else (z: 0). All content lives
 * above on z >= 10.
 */
const SiteBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    if (!isCoarse) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave, { passive: true });
    }

    const step = 26;           // grid spacing
    const baseR = 0.55;        // base dot radius
    const ampR = 1.15;         // radius amplitude from noise
    const baseAlpha = 0.085;   // baseline dot opacity
    const spotRadius = 260;
    let start = performance.now();

    const render = (t: number) => {
      const time = (t - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Subtle vignette darkening in corners so the dot field doesn't feel flat.
      const vignette = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active && !isCoarse;

      ctx.fillStyle = 'rgba(242, 239, 231, 1)'; // will be modulated per-dot via globalAlpha

      for (let y = 0; y <= h; y += step) {
        for (let x = 0; x <= w; x += step) {
          // Cheap noise: sum of low-frequency sines, lightly offset per row.
          const n =
            Math.sin((x * 0.012) + time * 0.45) *
              Math.cos((y * 0.014) - time * 0.35) *
              0.5 +
            Math.sin((x + y) * 0.006 + time * 0.22) * 0.5;

          let r = baseR + (n * 0.5 + 0.5) * ampR;
          let a = baseAlpha * (0.55 + (n * 0.5 + 0.5) * 0.9);

          if (mouseActive) {
            const dx = x - mx;
            const dy = y - my;
            const d2 = dx * dx + dy * dy;
            const sr2 = spotRadius * spotRadius;
            if (d2 < sr2) {
              const f = 1 - d2 / sr2; // 0..1
              r += f * 2.4;
              a += f * 0.22;
            }
          }

          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (!prefersReduced) {
        frameRef.current = requestAnimationFrame(render);
      }
    };

    frameRef.current = requestAnimationFrame(render);

    const onVisibility = () => {
      if (document.hidden) {
        if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      } else if (frameRef.current == null && !prefersReduced) {
        start = performance.now();
        frameRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
    />
  );
};

export default SiteBackground;
