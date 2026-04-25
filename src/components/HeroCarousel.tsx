import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import CharRise from '@/components/CharRise';
import Marquee from '@/components/Marquee';
import { useReveal } from '@/hooks/use-reveal';

import andrewCutout from '@/assets/Andrew.cutout.webp';
import brishaMp4 from '@/assets/Brisha.mp4';
import brishaWebm from '@/assets/Brisha.webm';
import brishaPoster from '@/assets/Brisha.webp';
import doghAudio from '@/assets/Dogh.mp4';

const channels = [
  {
    label: 'Discord',
    role: 'Обитель завозов',
    quote: 'Пиздецки смешные мемчики каждый день',
    url: 'https://discord.com/invite/PNnSKWNhYE',
    cta: 'Присоединиться',
  },
  {
    label: 'YouTube',
    role: 'Фильмы уровня Оскара',
    quote: 'ФСР-95 бросает вызов мистеру Максу',
    url: 'https://www.youtube.com/@ФСР95',
    cta: 'Подписаться',
  },
  {
    label: 'Steam',
    role: 'Кладбище с Докичем',
    quote: 'Актива нет — есть докич и легенда',
    url: 'https://steamcommunity.com/groups/FRSOOfficial',
    cta: 'Помянуть',
  },
  {
    label: 'Telegram',
    role: 'Труха 95',
    quote: 'Как бульмень готовит кружки',
    url: 'https://t.me/+abSXXaH4cf9hNTky',
    cta: 'В трубу',
  },
];

/**
 * Hero. Three layered things:
 *   1. Big kinetic title "ЗАВОЗЯМБА" with a serif italic "edition" callout.
 *   2. Bottom dock of channel links with index numerals and row-inversion on hover.
 *   3. Two floating cutouts (Brisha + Andrew) positioned as decorative elements
 *      that react on hover (slight parallax/scale) — they don't crop the layout.
 */
const HeroCarousel = () => {
  const ref = useReveal<HTMLDivElement>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const playDogh = () => {
    if (!audioRef.current) {
      const a = new Audio(doghAudio);
      a.preload = 'none';
      audioRef.current = a;
    }
    const a = audioRef.current;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tx = (e.clientX - cx) / rect.width;
      ty = (e.clientY - cy) / rect.height;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setParallax({ x: tx, y: ty });
          raf = 0;
        });
      }
    };
    const onLeave = () => setParallax({ x: 0, y: 0 });
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (!coarse) {
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    }
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative section-shell pt-24 md:pt-28 overflow-hidden"
    >
      {/* Top marquee */}
      <Marquee duration={42}>
        <span>Labas</span>
        <span className="dot-sep" />
        <span className="opacity-60">BoneDust + Izumm = Sex</span>
        <span className="dot-sep" />
        <span>Админ всегда долбоёб</span>
        <span className="dot-sep" />
        <span className="opacity-60">Кладе спиздил сладкий подарок</span>
        <span className="dot-sep" />
        <span>ПтичкаБурмалдичка</span>
        <span className="dot-sep" />
      </Marquee>

      <div ref={wrapRef} className="relative">
        {/* Floating cutouts (behind the title content, above the bg canvas) */}
        <div
          className="pointer-events-none absolute top-[8%] left-[-4%] w-[34%] max-w-[440px] min-w-[180px] opacity-95 z-[5]"
          style={{
            transform: `translate3d(${parallax.x * -18}px, ${parallax.y * -12}px, 0)`,
            transition: 'transform 0.35s cubic-bezier(0.2,0.9,0.2,1)',
          }}
        >
          <button
            type="button"
            onClick={playDogh}
            aria-label="Брыша — нажми"
            className="pointer-events-auto block w-full"
          >
            <video
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              poster={brishaPoster}
              className="block w-full h-auto object-contain"
              width={1920}
              height={1080}
            >
              <source src={brishaWebm} type="video/webm" />
              <source src={brishaMp4} type="video/mp4" />
            </video>
          </button>
        </div>

        <div
          className="pointer-events-none absolute bottom-[10%] md:bottom-[14%] right-[4%] md:right-[6%] w-[32%] md:w-[34%] max-w-[440px] min-w-[200px] opacity-95 z-[5]"
          style={{
            transform: `translate3d(${parallax.x * 18}px, ${parallax.y * 14}px, 0)`,
            transition: 'transform 0.35s cubic-bezier(0.2,0.9,0.2,1)',
          }}
        >
          <a
            href="https://www.youtube.com/@ФСР95"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Andrew — на YouTube"
            className="pointer-events-auto block w-full"
          >
            <img
              src={andrewCutout}
              alt=""
              loading="eager"
              decoding="async"
              className="block w-full h-auto object-contain"
            />
          </a>
        </div>

        <div ref={ref} className="section-container relative z-10 pt-12 md:pt-20 pb-16 md:pb-24 reveal">
          {/* Eyebrow */}
          <div className="chapter-meta mb-8 md:mb-12">
            <span className="pulse-dot" />
            <span className="text-foreground">Frontier Squad Rebith</span>
            <span className="hidden md:inline opacity-60">/ Born in 2025</span>
            <span className="ml-auto opacity-60 hidden sm:inline">
              <span className="font-serif-italic text-foreground/80 text-[15px] not-italic-tracking">95</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display uppercase text-foreground leading-[0.86] tracking-[-0.03em]">
            <span className="block text-[clamp(3rem,10vw,9rem)]">
              <CharRise text="ЗАВО" stepMs={40} />
            </span>
            <span className="block text-[clamp(3rem,10vw,9rem)] relative">
              <span className="inline-block bg-foreground text-background px-[0.1em]">
                <CharRise text="ЗЯМБА" startDelay={120} stepMs={40} />
              </span>
              <span
                className="font-serif-italic not-italic-tracking ml-4 md:ml-6 align-middle text-foreground/70"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontStyle: 'italic' }}
              >
                №&nbsp;95
              </span>
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="mt-8 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed text-balance">
            Апгрейд сайта и он теперь красный культурно не получится.
          </p>

          {/* CTA row */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
            <a
              href="https://discord.com/invite/PNnSKWNhYE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid group"
            >
              <span>Залететь в дискорд</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
            </a>
            <a href="#music" className="btn-invert group">
              <span>Слушать альбомы</span>
              <span className="opacity-60">↓</span>
            </a>
            <div className="ml-auto hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>{'['}</span>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="eq-bar"
                  style={{
                    height: '18px',
                    animationDelay: `${i * 120}ms`,
                    color: 'hsl(var(--foreground))',
                  }}
                />
              ))}
              <span>{']'}</span>
              <span>Zavoz STABLE</span>
            </div>
          </div>
        </div>

        {/* Channels dock — 4 rows */}
        <div className="relative z-10 section-container pb-16 md:pb-24">
          <div className="chapter-meta mb-4">
            <span>&gt;</span>
            <span>Наши соц. сети / места прибывания</span>
          </div>
          <ul className="border-y border-border">
            {channels.map((ch, i) => (
              <li key={ch.label} className="border-b border-border last:border-b-0">
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 py-5 md:py-6 transition-colors duration-200 hover:bg-foreground hover:text-background px-2 md:px-4"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-background/70 w-[3ch]">
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display uppercase text-xl md:text-3xl leading-none tracking-[-0.02em]">
                      {ch.label}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-base text-foreground/70 group-hover:text-background/80">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-background/60 border border-border group-hover:border-background/40 px-2 py-0.5">
                        {ch.role}
                      </span>
                      <span className="truncate">{ch.quote}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 md:gap-3 font-mono text-[11px] uppercase tracking-[0.25em]">
                    <span className="hidden md:inline">{ch.cta}</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
