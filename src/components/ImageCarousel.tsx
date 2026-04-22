import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

import { useReveal } from '@/hooks/use-reveal';

import still1 from '@/assets/1.webp';
import still2 from '@/assets/Bonedust.webp';
import still3 from '@/assets/Bul.webp';
import still4 from '@/assets/andryhlyper.webp';
import still5 from '@/assets/calci.webp';
import still6 from '@/assets/Vovan.webp';

interface Episode {
  n: string;
  title: string;
  synopsis: string;
  still: string;
  duration: string;
  /** YouTube / VK link. TBD placeholders — will be filled in by the user. */
  url?: string;
}

/**
 * Сериал «Месть Меллстроя». Ссылки заполняются пользователем; пока
 * кнопка неактивна и кликом показывает toast-подобный статус.
 */
const episodes: Episode[] = [
  {
    n: '01',
    title: 'Пролог · Долг',
    synopsis: 'Первая серия. Докич приезжает в Ставрополь за 100 рублями.',
    still: still1,
    duration: 'EP 01',
  },
  {
    n: '02',
    title: 'Кривой Рог, 95-й',
    synopsis: 'Вторая серия. Андрей собирает 95 братух и выходит на след.',
    still: still2,
    duration: 'EP 02',
  },
  {
    n: '03',
    title: 'Булимень под облавой',
    synopsis: 'Булимень прячется в подвалах — начинается большая охота.',
    still: still3,
    duration: 'EP 03',
  },
  {
    n: '04',
    title: 'Фестиваль 95',
    synopsis: 'Фестиваль братух превращается в поле боя с Меллстроем.',
    still: still4,
    duration: 'EP 04',
  },
  {
    n: '05',
    title: 'Гриндвич',
    synopsis: 'Бон Даст выходит из смены. Все сходятся в финальной точке.',
    still: still5,
    duration: 'EP 05',
  },
  {
    n: '06',
    title: 'Месть',
    synopsis: 'Финал. Вован монтирует последний кадр — счёт сравнялся.',
    still: still6,
    duration: 'FINALE',
  },
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
          <span>СЕРИАЛ</span>
          <span className="ml-auto opacity-50 hidden sm:inline">[MELLSTROY_REVENGE]</span>
        </div>

        <div ref={ref} className="reveal">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-4">
            <h2 className="display-xl text-balance">
              МЕСТЬ{' '}
              <span
                className="font-serif-italic text-foreground/80 not-italic-tracking"
                style={{ fontStyle: 'italic' }}
              >
                Меллстроя
              </span>
            </h2>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {String(active + 1).padStart(2, '0')} / {String(episodes.length).padStart(2, '0')}
            </div>
          </div>
          <p className="max-w-2xl text-foreground/70 text-base md:text-lg mb-8 text-balance">
            Самый большой сериал ФСР-95 в шести сериях. Заготовка — ссылки на
            серии появятся позже.
          </p>

          <div className="relative">
            <div
              ref={trackRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide border border-border"
            >
              {episodes.map((ep, i) => (
                <div
                  key={ep.n}
                  data-slide={i}
                  className="relative snap-center shrink-0 w-full aspect-[16/9] md:aspect-[21/9] group"
                >
                  <img
                    src={ep.still}
                    alt={ep.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  {/* Top meta row */}
                  <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-foreground/90">
                    <span className="inline-flex items-center gap-3">
                      <span className="pulse-dot" />
                      <span>EP · {ep.n}</span>
                    </span>
                    <span className="text-foreground/60">{ep.duration}</span>
                  </div>

                  {/* Bottom meta + play button */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between gap-6">
                    <div className="min-w-0">
                      <div className="font-display uppercase tracking-[-0.02em] leading-[0.9] text-2xl md:text-5xl text-balance max-w-[30ch]">
                        {ep.title}
                      </div>
                      <div className="mt-2 max-w-[52ch] text-sm md:text-base text-foreground/75">
                        {ep.synopsis}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {ep.url ? (
                        <a
                          href={ep.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-solid group/btn"
                        >
                          <Play className="w-4 h-4" />
                          <span>Смотреть</span>
                        </a>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="inline-flex items-center justify-center gap-2 px-5 h-11 font-mono text-[11px] uppercase tracking-[0.2em] border border-foreground/30 text-foreground/50 cursor-not-allowed"
                          title="Ссылка появится позже"
                        >
                          <Play className="w-4 h-4" />
                          <span>TBD</span>
                        </span>
                      )}
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
                className="w-11 h-11 border border-border flex items-center justify-center text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
                aria-label="Предыдущая серия"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="w-11 h-11 border border-border flex items-center justify-center text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
                aria-label="Следующая серия"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="ml-2 flex-1 grid" style={{ gridTemplateColumns: `repeat(${episodes.length}, 1fr)`, gap: '6px' }}>
                {episodes.map((_, i) => (
                  <span key={i} className="relative h-[3px] bg-border overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-500"
                      style={{ width: active === i ? '100%' : '0%' }}
                    />
                  </span>
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
