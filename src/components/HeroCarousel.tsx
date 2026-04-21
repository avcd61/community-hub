import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

import member1 from '@/assets/member-1.webp';
import member2 from '@/assets/member-2.webp';
import member3 from '@/assets/member-3.webp';
import member4 from '@/assets/member-4.webp';

interface Member {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  buttonUrl: string;
  buttonText: string;
}

const members: Member[] = [
  {
    id: 1,
    name: 'Дискорд сервер',
    role: 'Обитель завозов',
    quote: 'В этом месте сидят 95 братухи и делают завозы каждый день',
    avatar: member1,
    buttonUrl: 'https://discord.com/invite/PNnSKWNhYE',
    buttonText: 'Присоединиться к серверу',
  },
  {
    id: 2,
    name: 'Ютуб канал 95 братко',
    role: 'Фильмы достойные оскара',
    quote: 'Лучший ютуб канал стоящий на уровне мистера Макса и мисс Кейти',
    avatar: member2,
    buttonUrl: 'https://www.youtube.com/@ФСР95',
    buttonText: 'Перейти на канал',
  },
  {
    id: 3,
    name: 'Отрицательно живая группа стим',
    role: 'Там есть докич',
    quote: 'Группа 95 братко в стиме где нет актива но есть докич',
    avatar: member3,
    buttonUrl: 'https://steamcommunity.com/groups/FRSOOfficial',
    buttonText: 'Посетить кладбище',
  },
  {
    id: 4,
    name: 'Труха 95',
    role: '95 кружков жратвы бульменя',
    quote: 'Здесь показана жизнь и быт ФСРа ну и ещё как бульмень готовит',
    avatar: member4,
    buttonUrl: 'https://t.me/+abSXXaH4cf9hNTky',
    buttonText: 'Залететь в труху',
  },
];

/**
 * Hero: a VHS/magazine-cover carousel. Full-bleed portrait with the channel
 * name typed across the bottom as one giant brutalist label; a thin meta
 * strip on top spells out CH.XX / ROLE / EST. On desktop, a narrow sidebar
 * holds the station identity and ticker — no amber window chrome, just clean
 * frames with corner ticks.
 *
 * All animations are CSS-only; the replay on index change is forced with
 * `key={current.id}` so we never pull in framer-motion here.
 */
const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const current = members[index];
  const next = () => setIndex((i) => (i + 1) % members.length);
  const prev = () => setIndex((i) => (i === 0 ? members.length - 1 : i - 1));

  return (
    <section
      id="hero"
      className="relative pt-14 md:pt-16 border-b border-border overflow-hidden"
    >
      {/* Ticker strip pinned right under the header. Duplicated content so the
          CSS translateX can loop seamlessly. */}
      <div className="relative h-7 border-b border-border bg-card/70 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker will-change-transform">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div
              key={dup}
              className="flex items-center gap-8 px-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary"
            >
              <span>◾ FSR-95 BROADCAST LIVE</span>
              <span className="text-muted-foreground">// САМЫЕ ЗАВОЗНЫЕ 95 БРАТУХИ</span>
              <span>◾ CH.95 / MHZ 1995.00</span>
              <span className="text-muted-foreground">// АНДРЕЙ — ЛУЧШИЙ АДМИН</span>
              <span>◾ DO NOT ADJUST YOUR SET</span>
              <span className="text-muted-foreground">// ЗАВОЗЯМБА</span>
              <span>◾ FSR-95 BROADCAST LIVE</span>
              <span className="text-muted-foreground">// САМЫЕ ЗАВОЗНЫЕ 95 БРАТУХИ</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container pt-10 md:pt-14 pb-8 md:pb-10">
        {/* Meta strip above the cover */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="chip chip-signal">
              <span className="on-air-dot" /> TRANSMISSION
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              EST. 2024
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hidden md:inline">
              // MHZ 1995.00
            </span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            CH.<span className="text-primary">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-muted-foreground/60">/{String(members.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Station ID headline */}
        <h1 className="display-xl text-foreground mb-8 md:mb-10">
          ЗАВО<span className="text-primary">ЗЯМБА</span>
          <span className="text-foreground/40"> · </span>
          <span className="text-foreground">№95</span>
        </h1>

        {/* Cover card: full-bleed portrait, typography over the bottom */}
        <article
          key={current.id}
          className="relative overflow-hidden border border-border bg-card animate-fade-up"
        >
          <div className="relative aspect-[16/10] md:aspect-[21/9] bg-background">
            <img
              src={current.avatar}
              alt={current.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="async"
              width={1600}
              height={900}
            />

            {/* Subtle vignette for legibility of the bottom text */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(11,9,6,0.15) 0%, rgba(11,9,6,0) 30%, rgba(11,9,6,0) 45%, rgba(11,9,6,0.88) 100%)',
              }}
            />

            {/* Corner ticks */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary" />

            {/* Top-left channel badge */}
            <div className="absolute top-5 left-5 md:top-6 md:left-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary bg-background/75 backdrop-blur-sm px-2.5 py-1 border border-primary/70">
                CH.{String(index + 1).padStart(2, '0')} · {current.role}
              </div>
            </div>

            {/* Top-right REC indicator */}
            <div className="absolute top-5 right-5 md:top-6 md:right-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-signal bg-background/75 backdrop-blur-sm px-2 py-1 border border-border">
                <span className="on-air-dot" /> REC
              </div>
            </div>

            {/* Bottom text stack */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <h2
                className="font-display font-black uppercase leading-[0.85] text-foreground tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
              >
                {current.name}
              </h2>
              <p className="mt-3 md:mt-4 max-w-2xl text-foreground/85 text-sm md:text-base leading-snug italic">
                «{current.quote}»
              </p>

              <div className="mt-5 md:mt-6 flex items-center gap-4 flex-wrap">
                <a
                  href={current.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
                >
                  <span>{current.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <button
                  onClick={next}
                  className="group inline-flex items-center gap-2 px-3 py-3 border border-border hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                  aria-label="Next channel"
                >
                  SKIP <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Channel dial */}
        <div className="mt-6 md:mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <button
            onClick={prev}
            className="group flex items-center gap-2 px-3 py-2 border border-border hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            aria-label="Previous channel"
          >
            <ChevronLeft className="w-4 h-4" /> PREV
          </button>

          <div className="flex items-stretch justify-center gap-2 md:gap-3 overflow-x-auto">
            {members.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setIndex(i)}
                aria-label={`Channel ${i + 1}: ${m.name}`}
                aria-current={i === index}
                className={`group shrink-0 flex flex-col items-start gap-1.5 px-3 py-2 border font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  i === index
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 ${
                      i === index ? 'bg-primary' : 'bg-border'
                    }`}
                    aria-hidden="true"
                  />
                  CH.{String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`max-w-[14ch] truncate text-[10px] ${
                    i === index ? 'text-foreground' : 'text-muted-foreground/80'
                  }`}
                >
                  {m.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="group flex items-center gap-2 px-3 py-2 border border-border hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            aria-label="Next channel"
          >
            NEXT <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
