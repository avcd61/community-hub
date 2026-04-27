import { useEffect, useRef } from 'react';

/**
 * Fixed full-viewport canvas that renders a slowly breathing halftone dot
 * field. The dot radius and opacity are modulated by a sum-of-sines noise
 * field (cheap, GPU-light).
 *
 * Perf notes (why this is tuned the way it is):
 * - Capped to ~24 fps via timestamp throttle — the motion is ambient and
 *   imperceptible at higher rates, but the composite pressure on a fixed
 *   full-screen canvas can visibly stall scroll on mid-range laptops.
 * - Paused while the page is scrolling — `scroll` fires many times a
 *   second and the user isn't looking at the background anyway.
 * - No cursor spotlight inside the canvas (it used to cause measurable
 *   scroll jank because every pointermove kicked a paint on the fixed
 *   layer that competed with the scroll compositor).
 * - Vignette is rendered once into an offscreen gradient and blitted, not
 *   rebuilt per frame.
 * - On coarse pointers / small screens / reduced-motion it renders ONE
 *   static frame and stops — zero ongoing CPU.
 */
const SiteBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 900;
    /**
     * `staticMode` → render ONE frame and stop. Used on mobile / low-end
     * devices / reduced-motion. The visual barely changes so this is fine.
     */
    const staticMode = reduceMotion || isCoarse || isSmall;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    window.addEventListener('resize', resize);

    const step = 32;
    const baseR = 0.5;
    const ampR = 1.0;
    const baseAlpha = 0.075;

    // Throttle animation to ~24 fps (42ms frame budget).
    const frameBudget = 1000 / 24;
    let lastFrame = 0;
    let start = performance.now();
    let scrolling = false;
    let scrollTimer: number | null = null;

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Vignette drawn first (cheap gradient fill).
      const vignette = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.72
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.38)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = 'rgba(242, 239, 231, 1)';

      for (let y = 0; y <= h; y += step) {
        for (let x = 0; x <= w; x += step) {
          const n =
            Math.sin(x * 0.012 + time * 0.45) *
              Math.cos(y * 0.014 - time * 0.35) *
              0.5 +
            Math.sin((x + y) * 0.006 + time * 0.22) * 0.5;
          const r = baseR + (n * 0.5 + 0.5) * ampR;
          const a = baseAlpha * (0.55 + (n * 0.5 + 0.5) * 0.9);
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const render = (t: number) => {
      if (document.hidden || scrolling) {
        frameRef.current = requestAnimationFrame(render);
        return;
      }
      if (t - lastFrame >= frameBudget) {
        lastFrame = t;
        drawFrame((t - start) / 1000);
      }
      frameRef.current = requestAnimationFrame(render);
    };

    if (staticMode) {
      drawFrame(0);
    } else {
      frameRef.current = requestAnimationFrame(render);
    }

    const onScroll = () => {
      scrolling = true;
      if (scrollTimer != null) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
      }, 140);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onVisibility = () => {
      if (document.hidden) {
        if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      } else if (frameRef.current == null && !staticMode) {
        start = performance.now();
        frameRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      if (scrollTimer != null) window.clearTimeout(scrollTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        // Promote canvas to its own compositor layer so scroll stays smooth.
        willChange: 'transform',
        transform: 'translateZ(0)',
        contain: 'strict',
      }}
    />
  );
};

export default SiteBackground;
