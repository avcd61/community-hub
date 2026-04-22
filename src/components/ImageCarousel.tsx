import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

import { useReveal } from '@/hooks/use-reveal';

interface Episode {
  n: string;
  title: string;
  synopsis: string;
  /**
   * YouTube video id — thumbnail is pulled from i.ytimg.com. Omitted for
   * the teaser slot (episode 07 — not filmed yet, rendered as `???`).
   */
  ytId?: string;
  /** External URL. Omitted for the teaser slot. */
  url?: string;
  bonus?: boolean;
  /** True for the unreleased "???" teaser card. */
  tba?: boolean;
}

/**
 * Сериал «Месть Меллстроя».
 *
 * Палитра секции — «Золотая Лихорадка»:
 *   база        чёрный матовый `#1A1A1A`
 *   акцент      золотой `#FFD700`
 *   CTA         ярко-красный `#E60000`
 *
 * Обложки серий тянутся напрямую с YouTube (i.ytimg.com/vi/<id>/maxresdefault.jpg)
 * с фоллбэком на hqdefault на случай отсутствия maxres.
 *
 * Структура: горизонтальный snap-слайдер (как было раньше в reel), но
 * каждая панель стилизована под кинопостер «Мести Меллстроя» — золотая
 * рамка, золотая типографика, красный CTA с текстом «Смотреть серию».
 * Серия 3.5 помечена как INTERLUDE / BONUS — другой фреймрейт, золотая
 * «BONUS»-лента через плакат.
 */
const episodes: Episode[] = [
  {
    n: '01',
    title: 'Пролог · Долг',
    synopsis: 'Первая серия. Всё начинается с одного долга.',
    ytId: 'EwKjsmcHFm8',
    url: 'https://youtu.be/EwKjsmcHFm8',
  },
  {
    n: '02',
    title: 'Серия II',
    synopsis: 'Братухи выходят на след.',
    ytId: 'cc3PwA6vDFc',
    url: 'https://youtu.be/cc3PwA6vDFc',
  },
  {
    n: '03',
    title: 'Серия III',
    synopsis: 'Погоня ускоряется.',
    ytId: '-u5p1_JPSo4',
    url: 'https://www.youtube.com/watch?v=-u5p1_JPSo4',
  },
  {
    n: '03.5',
    title: 'Interlude · Bonus',
    synopsis: 'Спецвыпуск. Бонусная глава между третьей и четвёртой сериями.',
    ytId: 'mHFl15buXe0',
    url: 'https://www.youtube.com/watch?v=mHFl15buXe0&t=1s',
    bonus: true,
  },
  {
    n: '04',
    title: 'Серия IV',
    synopsis: 'Ставки поднимаются.',
    ytId: 'FtUThRARUik',
    url: 'https://www.youtube.com/watch?v=FtUThRARUik',
  },
  {
    n: '05',
    title: 'Серия V',
    synopsis: 'Предпоследняя партия.',
    ytId: '8RqMc50rabo',
    url: 'https://www.youtube.com/watch?v=8RqMc50rabo',
  },
  {
    n: '06',
    title: 'Шестая',
    synopsis: 'Счёт сравнивается. Месть берёт своё.',
    ytId: 'JPtac4MUTvw',
    url: 'https://www.youtube.com/watch?v=JPtac4MUTvw&t=1051s',
  },
  {
    n: '07',
    title: '???',
    synopsis: 'Седьмая серия ещё не снята. Дата выхода будет позже.',
    tba: true,
  },
];

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const ytThumbFallback = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const GOLD = '#FFD700';
const RED = '#E60000';
const BASE = '#1A1A1A';

const ImageCarousel = () => {
  const ref = useReveal<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  /*
    Per-episode fallback state. YouTube does not render a
    `maxresdefault.jpg` for every video (e.g. episode 5, 8RqMc50rabo,
    returns 404) — so we try `maxresdefault` first and, on error, flip
    this map so the card re-renders with `hqdefault` (which every
    video has). An on-DOM fallback via `img.onerror` is not enough
    because the carousel re-renders on scroll and React would keep
    resetting `img.src` back to `maxresdefault` each time.
  */
  const [thumbFallback, setThumbFallback] = useState<Record<string, boolean>>({});

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
    <section
      id="reel"
      className="relative py-24 md:py-32 border-t border-b"
      style={{
        background: BASE,
        borderColor: 'rgba(255, 215, 0, 0.18)',
        // Section-scoped color overrides so all defaults read as gold-on-black.
        color: '#E8E0C7',
      }}
    >
      {/* Gold rail ticker across the top */}
      <div
        className="absolute top-0 inset-x-0 h-8 overflow-hidden border-b"
        style={{ borderColor: 'rgba(255,215,0,0.28)' }}
      >
        <div
          className="marquee-track flex items-center gap-10 h-full pr-10 font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ animationDuration: '38s', color: GOLD }}
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-10">
              <span>МЕСТЬ МЕЛЛСТРОЯ · СЕРИАЛ ФСР-95</span>
              <span>·</span>
              <span>7 СЕРИЙ · ВКЛЮЧАЯ BONUS-INTERLUDE</span>
              <span>·</span>
              <span>ЗОЛОТАЯ ЛИХОРАДКА · EDITION II</span>
              <span>·</span>
              <span>{'<'} WATCH ON YOUTUBE {'>'}</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container pt-6">
        <div
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] mb-8"
          style={{ color: GOLD }}
        >
          <span>№ VI</span>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>СЕРИАЛ</span>
          <span className="ml-auto hidden sm:inline" style={{ opacity: 0.7 }}>
            [MELLSTROY_REVENGE · 07_EP]
          </span>
        </div>

        <div ref={ref} className="reveal">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-4">
            <h2
              className="font-display uppercase leading-[0.88] tracking-[-0.03em] text-balance"
              style={{ fontSize: 'clamp(2.75rem, 10vw, 8rem)' }}
            >
              <span
                className="inline-block"
                style={{
                  color: RED,
                  animation: 'red-pulse 3.6s ease-in-out infinite',
                }}
              >
                МЕСТЬ
              </span>{' '}
              <span
                className="font-serif-italic not-italic-tracking"
                style={{
                  fontStyle: 'italic',
                  color: GOLD,
                  background: `linear-gradient(90deg, #b88a00 0%, ${GOLD} 30%, #fff6b5 50%, ${GOLD} 70%, #b88a00 100%)`,
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gold-shimmer 5.5s linear infinite',
                }}
              >
                Меллстроя
              </span>
            </h2>
            <div
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: GOLD, opacity: 0.75 }}
            >
              {String(active + 1).padStart(2, '0')} / {String(episodes.length).padStart(2, '0')}
            </div>
          </div>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed mb-10" style={{ color: '#D9CDA1' }}>
            Семь серий включая бонусный Interlude. Обложки подтягиваются прямо
            с YouTube — тыкай и смотри.
          </p>

          <div className="relative">
            <div
              ref={trackRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
              style={{
                border: `1px solid ${GOLD}55`,
                background: '#0E0E0E',
              }}
            >
              {episodes.map((ep, i) => (
                <article
                  key={ep.n}
                  data-slide={i}
                  className="relative snap-center shrink-0 w-full aspect-[16/9] md:aspect-[21/9] group"
                >
                  {ep.tba || !ep.ytId ? (
                    // Teaser slot — no thumbnail yet, show giant gold
                    // "???" placeholder on matte black.
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background:
                          'radial-gradient(65% 75% at 50% 55%, #231f0c 0%, #0c0c0c 78%)',
                      }}
                    >
                      <div
                        className="font-display uppercase leading-none tracking-[-0.02em]"
                        style={{
                          fontSize: 'clamp(6rem, 22vw, 20rem)',
                          color: GOLD,
                          textShadow:
                            '0 0 40px rgba(255,215,0,0.28), 0 0 120px rgba(255,215,0,0.12)',
                          opacity: 0.9,
                        }}
                        aria-hidden="true"
                      >
                        ???
                      </div>
                    </div>
                  ) : (
                    <img
                      src={
                        thumbFallback[ep.ytId]
                          ? ytThumbFallback(ep.ytId)
                          : ytThumb(ep.ytId)
                      }
                      alt={ep.title}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      onError={() => {
                        if (ep.ytId && !thumbFallback[ep.ytId]) {
                          setThumbFallback((m) => ({ ...m, [ep.ytId!]: true }));
                        }
                      }}
                    />
                  )}
                  {/* Duotone gold-wash */}
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{
                      background: `linear-gradient(180deg, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.55) 55%, rgba(26,26,26,0.95) 100%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(60% 60% at 50% 30%, rgba(255,215,0,0.18) 0%, rgba(255,215,0,0) 70%)',
                    }}
                  />

                  {/* Gold frame inset */}
                  <div
                    className="absolute inset-3 md:inset-5 pointer-events-none"
                    style={{ border: `1px solid ${GOLD}66` }}
                    aria-hidden="true"
                  />

                  {/* Corner ticks */}
                  {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
                    <span
                      key={c}
                      aria-hidden="true"
                      className="absolute w-4 h-4 pointer-events-none"
                      style={{
                        top: c.startsWith('t') ? '12px' : 'auto',
                        bottom: c.startsWith('b') ? '12px' : 'auto',
                        left: c.endsWith('l') ? '12px' : 'auto',
                        right: c.endsWith('r') ? '12px' : 'auto',
                        borderTop: c.startsWith('t') ? `2px solid ${GOLD}` : undefined,
                        borderBottom: c.startsWith('b') ? `2px solid ${GOLD}` : undefined,
                        borderLeft: c.endsWith('l') ? `2px solid ${GOLD}` : undefined,
                        borderRight: c.endsWith('r') ? `2px solid ${GOLD}` : undefined,
                      }}
                    />
                  ))}

                  {/* Top meta row — EP number / BONUS badge */}
                  <div className="absolute top-5 md:top-7 left-5 right-5 md:left-7 md:right-7 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
                    <span className="inline-flex items-center gap-3" style={{ color: GOLD }}>
                      <span
                        className="pulse-dot"
                        style={{
                          background: GOLD,
                          boxShadow: `0 0 10px ${GOLD}`,
                        }}
                      />
                      <span>
                        {ep.tba
                          ? `TBA · EP ${ep.n}`
                          : ep.bonus
                          ? 'INTERLUDE'
                          : `EPISODE · ${ep.n}`}
                      </span>
                    </span>
                    {ep.bonus ? (
                      <span
                        className="px-2 py-0.5 font-mono text-[10px] tracking-[0.3em]"
                        style={{
                          background: GOLD,
                          color: BASE,
                          fontWeight: 700,
                        }}
                      >
                        BONUS · 03.5
                      </span>
                    ) : ep.tba ? (
                      <span
                        className="px-2 py-0.5 font-mono text-[10px] tracking-[0.3em]"
                        style={{
                          border: `1px solid ${GOLD}`,
                          color: GOLD,
                          fontWeight: 700,
                        }}
                      >
                        COMING SOON
                      </span>
                    ) : (
                      <span style={{ color: GOLD, opacity: 0.75 }}>FSR-95 · MELLSTROY REVENGE</span>
                    )}
                  </div>

                  {/* Bottom block — title + synopsis + CTA */}
                  <div className="absolute bottom-5 md:bottom-8 left-5 right-5 md:left-8 md:right-8 flex items-end justify-between gap-6">
                    <div className="min-w-0">
                      <div
                        className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-2"
                        style={{ color: GOLD, opacity: 0.8 }}
                      >
                        {ep.bonus
                          ? 'BONUS · 03.5'
                          : ep.tba
                          ? `№ ${ep.n} · TBA`
                          : `№ ${ep.n}`}
                      </div>
                      <div
                        className="font-display uppercase tracking-[-0.02em] leading-[0.9] text-balance max-w-[22ch]"
                        style={{
                          fontSize: 'clamp(1.5rem, 3.4vw, 3.25rem)',
                          color: GOLD,
                          textShadow: '0 2px 24px rgba(0,0,0,0.7)',
                        }}
                      >
                        {ep.title}
                      </div>
                      <p
                        className="mt-3 max-w-[48ch] text-sm md:text-base"
                        style={{ color: '#E8DCA9' }}
                      >
                        {ep.synopsis}
                      </p>
                    </div>
                    {ep.tba || !ep.url ? (
                      <span
                        className="shrink-0 inline-flex items-center gap-2 px-5 md:px-6 h-11 md:h-12 font-mono text-[11px] uppercase tracking-[0.25em] cursor-not-allowed"
                        style={{
                          background: 'transparent',
                          color: GOLD,
                          border: `1px solid ${GOLD}55`,
                          opacity: 0.75,
                          fontWeight: 700,
                        }}
                        aria-disabled="true"
                      >
                        <span>Скоро</span>
                      </span>
                    ) : (
                      <a
                        href={ep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-2 px-5 md:px-6 h-11 md:h-12 font-mono text-[11px] uppercase tracking-[0.25em] transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          background: RED,
                          color: '#FFF',
                          boxShadow:
                            '0 10px 30px -10px rgba(230,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.12)',
                          fontWeight: 700,
                        }}
                      >
                        <Play className="w-4 h-4" fill="currentColor" />
                        <span>Смотреть</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Nav */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="w-11 h-11 flex items-center justify-center transition-colors duration-200"
                style={{
                  border: `1px solid ${GOLD}55`,
                  color: GOLD,
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.color = BASE;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = GOLD;
                }}
                aria-label="Предыдущая серия"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="w-11 h-11 flex items-center justify-center transition-colors duration-200"
                style={{
                  border: `1px solid ${GOLD}55`,
                  color: GOLD,
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.color = BASE;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = GOLD;
                }}
                aria-label="Следующая серия"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div
                className="ml-2 flex-1 grid"
                style={{ gridTemplateColumns: `repeat(${episodes.length}, 1fr)`, gap: '6px' }}
              >
                {episodes.map((_, i) => (
                  <span
                    key={i}
                    className="relative h-[3px] overflow-hidden"
                    style={{ background: `${GOLD}22` }}
                  >
                    <span
                      className="absolute inset-y-0 left-0 transition-[width] duration-500"
                      style={{
                        width: active === i ? '100%' : '0%',
                        background: GOLD,
                        boxShadow: active === i ? `0 0 10px ${GOLD}80` : undefined,
                      }}
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
