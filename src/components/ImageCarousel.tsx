import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useReveal } from '@/hooks/use-reveal';

import fedot1 from '@/assets/1.webp';
import fedot2 from '@/assets/Bonedust.webp';
import fedot3 from '@/assets/Bul.webp';
import fedot4 from '@/assets/andryhlyper.webp';
import fedot5 from '@/assets/calci.webp';
import fedot6 from '@/assets/Vovan.webp';

const slides = [
  { src: fedot1, caption: 'Плёнка I — Федот на охоте' },
  { src: fedot2, caption: 'Плёнка II — Кривой Рог, 95-й' },
  { src: fedot3, caption: 'Плёнка III — Докич и Булимень' },
  { src: fedot4, caption: 'Плёнка IV — Фестиваль 95 братух' },
  { src: fedot5, caption: 'Плёнка V — Съёмка новой серии' },
  { src: fedot6, caption: 'Плёнка VI — Закат над Гринвичем' },
];

/**
 * Reel — horizontally-snapping full-bleed image track. The active slide
 * is determined by scroll position (IntersectionObserver per slide). Nav
 * buttons programmatically scroll by one slide width.
 */
const ImageCarousel = () => {
  const ref = useReveal<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.querySelectorAll<HTMLDivElement>('[data-slide]'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number(e.target.getAttribute('data-slide'));
            setActive(idx);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  const go = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const w = track.clientWidth;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section id="reel" className="relative section-shell py-24 md:py-32">
      <div className="section-container">
        <div className="chapter-meta mb-8">
          <span>№ VI</span>
          <span className="opacity-50">/</span>
          <span>РОЛИК ФЕДОТА</span>
          <span className="ml-auto opacity-50 hidden sm:inline">[REEL_95]</span>
        </div>

        <div ref={ref} className="reveal">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
            <h2 className="display-xl text-balance">
              КИНО <span className="font-serif-italic text-foreground/80" style={{ fontStyle: 'italic' }}>о&nbsp;нас</span>
            </h2>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>

          <div className="relative">
            <div
              ref={trackRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide border border-border"
            >
              {slides.map((s, i) => (
                <div
                  key={s.src}
                  data-slide={i}
                  className="relative snap-center shrink-0 w-full aspect-[16/9] md:aspect-[21/9]"
                >
                  <img
                    src={s.src}
                    alt={s.caption}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/90 flex items-center gap-3">
                    <span className="pulse-dot" />
                    <span>REEL · {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between gap-6">
                    <div className="font-display uppercase tracking-[-0.02em] leading-[0.9] text-2xl md:text-4xl text-balance max-w-[34ch]">
                      {s.caption}
                    </div>
                    <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/70">
                      95 · ФСР
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nav */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="w-11 h-11 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                aria-label="Назад"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="w-11 h-11 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                aria-label="Вперёд"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="flex-1 flex gap-1">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 h-[2px]"
                    style={{
                      background:
                        active === i ? 'hsl(var(--foreground))' : 'hsl(var(--foreground) / 0.22)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
