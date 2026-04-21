import { useEffect, useRef } from 'react';

/**
 * Minimal scroll-reveal hook built on IntersectionObserver.
 *
 * Apply the returned ref to an element that already has the `.reveal` class
 * in CSS. When it intersects the viewport, `is-visible` is toggled on and
 * the CSS transition runs. The observer disconnects after the first hit so
 * long lists don't keep work pending.
 *
 * Replaces framer-motion's `whileInView` for our use case so we don't ship a
 * ~60 KB animation runtime for effects a CSS transition can do.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Users with reduced-motion preference see content immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12, ...options }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [options]);

  return ref;
}
