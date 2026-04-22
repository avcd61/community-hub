import { useEffect, useRef } from 'react';

/**
 * A soft white radial glow that follows the cursor, rendered with
 * `mix-blend-mode: overlay` so it gently lifts surfaces it passes over
 * instead of tinting them. Writes its position into CSS variables on
 * the element itself, so no React state / rerenders per frame.
 *
 * Disabled on coarse pointers (touch) and when `prefers-reduced-motion`
 * is on via CSS.
 */
const CursorSpotlight = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch — no hover pointer to follow.
    if (typeof window.matchMedia === 'function') {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (coarse || reduce) return;
    }

    let raf = 0;
    let targetX = -500;
    let targetY = -500;
    let x = -500;
    let y = -500;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      // Ease toward target for a slight trailing effect.
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
};

export default CursorSpotlight;
