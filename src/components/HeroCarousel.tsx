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
 * Hero section, framed as a "channel selector" on a broadcast panel.
 * The left column is a big brutalist index panel (01/04, TRANSMISSION, ticker).
 * The right column is the current channel's dossier with a CTA that opens the
 * community's external destination (Discord / YouTube / etc.) in a new tab.
 *
 * Ticker and EQ bars are pure CSS; channel transitions are one CSS animation
 * replayed via a `key` on each content change — no animation library is loaded
 * for the hero.
 */
const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const current = members[index];
  const next = () => setIndex((i) => (i + 1) % members.length);
  const prev = () => setIndex((i) => (i === 0 ? members.length - 1 : i - 1));

  return (
    <section
      id="hero"
      className="relative pt-20 md:pt-24 pb-10 md:pb-16 border-b border-border overflow-hidden"
    >
      {/* Ticker strip at the very top of the hero. Duplicated content so the
          CSS translateX can loop seamlessly. */}
      <div className="absolute top-14 md:top-16 inset-x-0 h-7 border-y border-border bg-card/70 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker will-change-transform">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-8 px-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
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

      <div className="section-container grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-stretch min-h-[70vh] pt-14">
        {/* LEFT: station ID + massive display title + channel index */}
        <div className="flex flex-col justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="chip chip-signal">
                <span className="on-air-dot" /> TRANSMISSION
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                EST. 2024
              </span>
            </div>

            <h1 className="display-xl text-foreground">
              ЗАВО<span className="text-primary">ЗЯМБА</span>
              <br />
              <span className="text-foreground">№</span>
              <span className="text-foreground">95</span>
            </h1>

            <p className="mt-6 max-w-xl text-foreground/80 text-base md:text-lg leading-relaxed">
              Ретрансляция криворожского андеграунда. Музыка, Minecraft, мемы и 95
              братух в прямом эфире. Переключай каналы внизу —{' '}
              <span className="text-primary">каждый ведёт в своё место</span>.
            </p>
          </div>

          {/* Big channel counter + CSS equalizer bars */}
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                CHANNEL
              </div>
              <div className="display-lg text-foreground">
                {String(index + 1).padStart(2, '0')}
                <span className="text-primary">/</span>
                {String(members.length).padStart(2, '0')}
              </div>
            </div>

            <div className="hidden md:flex items-end gap-1 h-8" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="eq-bar"
                  style={{ animationDelay: `${(i % 6) * 90}ms`, height: `${16 + (i % 4) * 6}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: the current channel's dossier card */}
        <div className="relative">
          <article
            key={current.id}
            className="window h-full min-h-[420px] flex flex-col animate-fade-up"
          >
            <div className="window-title">
              <span>▓</span>
              <span>CH.{String(index + 1).padStart(2, '0')}_DOSSIER.TXT</span>
              <span className="ml-auto text-primary-foreground/80">● REC</span>
            </div>
            <div className="window-body flex-1 grid md:grid-cols-[140px_1fr] gap-5 p-5 md:p-7 pt-8">
              <div className="relative w-32 h-32 md:w-[140px] md:h-[140px] border border-border bg-background overflow-hidden">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  width={280}
                  height={280}
                />
                {/* corner ticks for a viewfinder feel */}
                <span className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-primary" />
                <span className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-primary" />
                <span className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-primary" />
                <span className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-primary" />
              </div>

              <div className="flex flex-col">
                <span className="chip chip-primary self-start mb-3">{current.role}</span>
                <h2 className="display-lg text-foreground mb-4">{current.name}</h2>
                <p className="text-foreground/80 text-base md:text-lg italic leading-relaxed">
                  «{current.quote}»
                </p>
                <div className="mt-auto pt-6">
                  <a
                    href={current.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-[0.2em] border border-primary hover:bg-foreground hover:text-background transition-colors"
                  >
                    <span>{current.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Channel dial: prev / dots / next */}
      <div className="section-container mt-8 md:mt-10 flex items-center justify-between gap-4">
        <button
          onClick={prev}
          className="group flex items-center gap-2 px-3 py-2 border border-border hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          aria-label="Previous channel"
        >
          <ChevronLeft className="w-4 h-4" /> PREV
        </button>

        <div className="flex-1 flex items-center gap-3 justify-center">
          {members.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              aria-label={`Channel ${i + 1}: ${m.name}`}
              className={`flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                i === index ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`h-1 transition-all duration-300 ${
                  i === index ? 'w-10 bg-primary' : 'w-6 bg-border'
                }`}
              />
              CH.{String(i + 1).padStart(2, '0')}
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
    </section>
  );
};

export default HeroCarousel;
