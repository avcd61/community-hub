import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

import { useReveal } from '@/hooks/use-reveal';

import fl1 from '@/assets/FL1.webp';
import fl2 from '@/assets/FL2.webp';
import fl3 from '@/assets/FL3.webp';
import fl4 from '@/assets/FL4.webp';
import fl5 from '@/assets/FL5.webp';
import fl6 from '@/assets/FL6.webp';
import fl7 from '@/assets/FL7.webp';
import fl8 from '@/assets/FL8.webp';
import fl9 from '@/assets/FL9.webp';
import fl10 from '@/assets/FL10.webp';

/*
  In-game screenshots from Frontierland. Caption is a short Cyrillic
  label shown in the HUD overlay so viewers can tell the scenes apart
  without reading into the scene itself.
*/
const screenshots: { src: string; caption: string }[] = [
  { src: fl1,  caption: 'База · КЛАН' },
  { src: fl2,  caption: 'Аванпост' },
  { src: fl3,  caption: 'Ночной рейд' },
  { src: fl4,  caption: 'Бункер · СБОР' },
  { src: fl5,  caption: 'Монастырь' },
  { src: fl6,  caption: 'Галерея · WEEKND' },
  { src: fl7,  caption: 'Зал императора' },
  { src: fl8,  caption: 'Поля забвения' },
  { src: fl9,  caption: 'Экспедиция' },
  { src: fl10, caption: 'Сакура дол' },
];

const pillars = [
  { title: 'ВЫЖИВАНИЕ', text: 'Честный майн без читов: крафт, строительство, фермы.' },
  { title: 'PVP АРЕНА', text: 'Ежедневные битвы за статус лучшего бойца 95-го.' },
  { title: 'СОБЫТИЯ', text: 'Конкурсы, рейды, командные события каждую неделю.' },
  { title: 'ГИЛЬДИИ', text: 'Собирай команду, стройся, качай прокачку, доминируй.' },
];

const SERVER_IP = 'play.fsr-95.ru';

/**
 * Frontierland. Only section with colour — black base + electric violet
 * accents. Uses its own button style and halftone purple background.
 */
const FrontierlandSection = () => {
  const ref = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActive((i) => (i + 1) % screenshots.length);
    }, 5500);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="frontierland"
      className="violet-section relative section-shell py-24 md:py-32 border-t"
    >
      {/* Violet rail / kinetic ticker exclusive to this section */}
      <div className="absolute top-0 inset-x-0 h-8 overflow-hidden border-b" style={{ borderColor: 'hsl(var(--violet-700) / 0.55)' }}>
        <div
          className="marquee-track flex items-center gap-10 h-full pr-10 font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ animationDuration: '36s', color: 'hsl(var(--violet-300))' }}
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-10">
              <span>FRONTIERLAND · MINECRAFT 1.20.1</span>
              <span>·</span>
              <span>CH.IV / PURPLE SIGNAL</span>
              <span>·</span>
              <span>IP {SERVER_IP}</span>
              <span>·</span>
              <span>24/7 · NO GRIEF · NO CHEATS</span>
              <span>·</span>
              <span>{'<'} JOIN THE FRONTIER {'>'}</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container pt-6">
        <div
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] mb-8"
          style={{ color: 'hsl(var(--violet-300))' }}
        >
          <span>№ V</span>
          <span className="opacity-50">/</span>
          <span>FRONTIERLAND</span>
          <span className="ml-auto opacity-70 hidden sm:inline">[MC_SERVER]</span>
        </div>

        <div ref={ref} className="reveal">
          {/* Full-width headline — always above the gallery. */}
          <div className="mb-10 md:mb-14">
            <div className="violet-badge mb-5">
              <span aria-hidden="true">◆</span>
              Minecraft · ФСР-95
            </div>
            <h2
              className="display-xl text-balance"
              style={{ fontSize: 'clamp(3rem, 12vw, 11rem)' }}
            >
              <span>FRONTIER</span>
              <span
                className="relative inline-block"
                style={{
                  color: 'hsl(var(--violet-400))',
                  textShadow:
                    '0 0 32px hsl(var(--violet-400) / 0.55), 0 0 80px hsl(var(--violet-500) / 0.35)',
                }}
              >
                LAND
              </span>
            </h2>
            <p
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: 'hsl(var(--violet-50) / 0.85)' }}
            >
              Частный MC-сервер ФСР-95. Твой шанс увидеть, как 95 братух строят
              целую цивилизацию на одном поле — от скромной землянки до города
              с рейдами и ареной.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left — copy (without the headline now). */}
          <div className="lg:col-span-5 order-2 lg:order-1">

            {/* IP + copy */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-stretch">
              <div
                className="relative flex items-center gap-3 px-4 h-12 font-mono text-[12px] uppercase tracking-[0.25em] truncate"
                style={{
                  background: 'hsl(var(--violet-900) / 0.55)',
                  border: '1px solid hsl(var(--violet-500) / 0.6)',
                  color: 'hsl(var(--violet-50))',
                }}
              >
                <span className="opacity-60 hidden sm:inline">IP &gt;</span>
                <span className="truncate">{SERVER_IP}</span>
              </div>
              <button
                type="button"
                onClick={copyIP}
                className="btn-violet h-12"
                aria-label="Копировать IP"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Скопировано' : 'Скопировать IP'}</span>
              </button>
            </div>

            {/* Pillars grid */}
            <ul className="mt-10 grid grid-cols-2 gap-px" style={{ background: 'hsl(var(--violet-500) / 0.45)', border: '1px solid hsl(var(--violet-500) / 0.45)' }}>
              {pillars.map((p, i) => (
                <li
                  key={p.title}
                  className="p-4 md:p-5"
                  style={{
                    background: 'hsl(0 0% 4%)',
                    animation: 'fade-up 0.8s cubic-bezier(0.2,0.9,0.2,1) both',
                    animationDelay: `${i * 120}ms`,
                  }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2"
                    style={{ color: 'hsl(var(--violet-300))' }}
                  >
                    #0{i + 1}
                  </div>
                  <div className="font-display uppercase text-lg md:text-xl leading-none tracking-[-0.02em]">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: 'hsl(var(--violet-50) / 0.75)' }}>
                    {p.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — screenshot stack */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[16/10] overflow-hidden" style={{ border: '1px solid hsl(var(--violet-500) / 0.5)' }}>
              {screenshots.map(({ src, caption }, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Frontierland · ${caption}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, hsl(265 60% 14% / 0) 0%, hsl(265 60% 14% / 0.6) 100%)',
                }}
              />
              {/* HUD-ish labels */}
              <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'hsl(var(--violet-300))' }}>
                <span className="pulse-dot" style={{ background: 'hsl(var(--violet-400))', boxShadow: '0 0 12px hsl(var(--violet-400) / 0.6)' }} />
                <span>Live feed · {String(active + 1).padStart(2, '0')}/{String(screenshots.length).padStart(2, '0')}</span>
              </div>
              <div
                className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.28em] max-w-[70%] truncate"
                style={{ color: 'hsl(var(--violet-50))' }}
              >
                {screenshots[active]?.caption}
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'hsl(var(--violet-50) / 0.8)' }}>
                FRONTIERLAND · MC_1.20.1
              </div>

              {/* Controls */}
              <button
                type="button"
                onClick={() => setActive((i) => (i - 1 + screenshots.length) % screenshots.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
                style={{
                  background: 'hsl(0 0% 4% / 0.55)',
                  border: '1px solid hsl(var(--violet-500) / 0.55)',
                  color: 'hsl(var(--violet-50))',
                }}
                aria-label="Предыдущий скриншот"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActive((i) => (i + 1) % screenshots.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
                style={{
                  background: 'hsl(0 0% 4% / 0.55)',
                  border: '1px solid hsl(var(--violet-500) / 0.55)',
                  color: 'hsl(var(--violet-50))',
                }}
                aria-label="Следующий скриншот"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pager strip */}
            <div className="mt-4 flex items-center gap-2">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Показать ${i + 1}`}
                  className="relative flex-1 h-[3px]"
                  style={{
                    background: 'hsl(var(--violet-500) / 0.25)',
                  }}
                >
                  <span
                    className="absolute inset-y-0 left-0 transition-[width] duration-500"
                    style={{
                      width: active === i ? '100%' : '0%',
                      background: 'hsl(var(--violet-400))',
                      boxShadow: active === i ? '0 0 12px hsl(var(--violet-400) / 0.6)' : undefined,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontierlandSection;
