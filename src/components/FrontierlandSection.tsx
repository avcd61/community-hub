import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useReveal } from '@/hooks/use-reveal';

import minecraft1 from '@/assets/FL1.webp';
import minecraft2 from '@/assets/FL2.webp';
import minecraft3 from '@/assets/FL3.webp';

const screenshots = [
  { src: minecraft1, label: 'MAP_ALPHA' },
  { src: minecraft2, label: 'MGE_DUEL' },
  { src: minecraft3, label: 'SPIDRAN' },
];

const features = [
  {
    icon: '🏰',
    title: 'Эпические спидраны',
    desc: 'В 1 секунду существования сервера кальций уже будет ходить в незерке',
  },
  {
    icon: '⚔️',
    title: 'MGE срачи',
    desc: 'Пиздиловка из за маленького писюна... ОУ ДА!!!',
  },
  {
    icon: '🤝',
    title: 'Админ завозит',
    desc: 'Админ бывает даёт ёбу и начинается ужас',
  },
];

/**
 * Frontierland broadcast feed. Screenshots are framed like a TV monitor with
 * station ident overlays (timestamp / channel / REC). We lazy-load the two
 * offscreen images and only decode the active one synchronously.
 */
const FrontierlandSection = () => {
  const [slide, setSlide] = useState(0);
  const ref = useReveal<HTMLDivElement>();

  const next = () => setSlide((s) => (s + 1) % screenshots.length);
  const prev = () => setSlide((s) => (s === 0 ? screenshots.length - 1 : s - 1));

  return (
    <section id="frontierland" className="relative py-20 md:py-28 border-b border-border">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow">№ 04 / FEED</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            [FRONTIERLAND_MC]
          </span>
        </div>

        <div ref={ref} className="reveal">
          <h2 className="display-xl text-foreground mb-4">
            FRONTIER<span className="text-primary">LAND</span>
          </h2>
          <p className="max-w-2xl text-foreground/80 text-base md:text-lg mb-10">
            Наш уникальный майнкрафт сервер, где каждый может навалить контенту и забить на него
            через неделю.
            <span className="text-primary"> (Андрей — Лучший Админ)</span>
          </p>

          {/* Monitor */}
          <div className="relative max-w-5xl mx-auto">
            <div className="window">
              <div className="window-title">
                <span>▓</span>
                <span>FEED_{slide + 1}_OF_{screenshots.length}.CAM</span>
                <span className="ml-auto flex items-center gap-2 text-primary-foreground/90">
                  <span className="on-air-dot" />
                  <span>{screenshots[slide].label}</span>
                  <span className="hidden md:inline">/ 00:{String(10 + slide * 7).padStart(2, '0')}:{String(slide * 12 + 2).padStart(2, '0')}</span>
                </span>
              </div>
              <div className="window-body pt-7">
                <div className="relative aspect-video bg-background overflow-hidden">
                  {screenshots.map((s, i) => (
                    <img
                      key={i}
                      src={s.src}
                      alt={`Frontierland ${i + 1}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      width={1280}
                      height={720}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        i === slide ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  {/* Overlay chrome */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-3 left-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary drop-shadow">
                      REC ● CH.04
                    </div>
                    <div className="absolute bottom-3 right-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary drop-shadow">
                      {String(slide + 1).padStart(2, '0')}/{String(screenshots.length).padStart(2, '0')}
                    </div>
                    <div className="absolute bottom-3 left-3 right-16 md:right-auto md:max-w-md bg-background/80 border border-border p-3 md:p-4">
                      <p className="text-sm md:text-base text-foreground leading-relaxed">
                        Погрузитесь в мир конченных сборок. Стройте писюны, исспытывайте терпение
                        админа, завозите контент в уникальной атмосфере нашего сервера.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor controls */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={prev}
                className="flex items-center gap-2 px-3 py-2 border border-border hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4" /> PREV
              </button>
              <div className="flex items-center gap-2">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`h-1 transition-all duration-300 ${
                      i === slide ? 'w-10 bg-primary' : 'w-6 bg-border'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex items-center gap-2 px-3 py-2 border border-border hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                aria-label="Next screenshot"
              >
                NEXT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature cards */}
          <ul className="grid md:grid-cols-3 gap-5 md:gap-6 mt-14 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <li
                key={f.title}
                className="border border-border bg-card p-6"
                style={{
                  animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
                  animationDelay: `${200 + i * 80}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                    № {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-3xl" aria-hidden="true">{f.icon}</span>
                </div>
                <h3 className="font-display font-black uppercase text-lg md:text-xl text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FrontierlandSection;
