import { ArrowUpRight } from 'lucide-react';

import member1 from '@/assets/member-1.webp';
import member2 from '@/assets/member-2.webp';
import member3 from '@/assets/member-3.webp';
import member4 from '@/assets/member-4.webp';

interface Channel {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  buttonUrl: string;
  buttonText: string;
}

const channels: Channel[] = [
  {
    id: 1,
    name: 'Дискорд сервер',
    role: 'Обитель завозов',
    quote: 'В этом месте сидят 95 братухи и делают завозы каждый день',
    avatar: member1,
    buttonUrl: 'https://discord.com/invite/PNnSKWNhYE',
    buttonText: 'Присоединиться',
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
 * Hero — a full broadcast "channel guide". Instead of a carousel that
 * hides 3 of 4 destinations behind a click, all four are shown as rows
 * in a TV-guide table. Each row is a link; the whole row highlights
 * amber on hover/focus. Keeps the avatars at a natural 1:1 size so they
 * don't get chopped by a 21:9 crop.
 *
 * No framer-motion, no carousel state; CSS-only interactions.
 */
const HeroCarousel = () => {
  return (
    <section
      id="hero"
      className="relative pt-14 md:pt-16 border-b border-border overflow-hidden"
    >
      {/* Ticker — thin marquee bar under the header. Two opposing rows feel busier without being loud. */}
      <div className="relative border-y border-border bg-card/70 overflow-hidden">
        <div className="relative h-7 overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker will-change-transform">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div
                key={dup}
                className="flex items-center gap-8 px-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground"
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
        <div className="relative h-7 overflow-hidden border-t border-border bg-foreground text-background">
          <div className="flex whitespace-nowrap animate-ticker-reverse will-change-transform">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div
                key={dup}
                className="flex items-center gap-8 px-4 font-mono text-[11px] uppercase tracking-[0.25em]"
              >
                <span>▮ NO COLOR // ALL SIGNAL</span>
                <span className="opacity-70">// MONO EDITION v0.95</span>
                <span>▮ ANALOG IS THE MESSAGE</span>
                <span className="opacity-70">// BRISHA ▸ ANDREW ▸ БУЛЬМЕНЬ ▸ ДОКИЧ</span>
                <span>▮ STAY ON CHANNEL 95</span>
                <span className="opacity-70">// NO TINT — JUST INK</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container pt-10 md:pt-14 pb-10 md:pb-14">
        {/* Station identity */}
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <span className="chip chip-signal">
            <span className="on-air-dot" /> TRANSMISSION
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            EST. 2024 // MHZ 1995.00
          </span>
        </div>

        <h1
          className="font-display font-black uppercase leading-[0.88] tracking-[-0.02em] text-foreground overflow-hidden"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
        >
          <span className="char-rise inline-block align-baseline" aria-hidden="true">
            {'ЗАВО'.split('').map((c, i) => (
              <span key={`a-${i}`} style={{ ['--i' as never]: i }}>{c}</span>
            ))}
          </span>
          <span
            className="char-rise inline-block align-baseline bg-foreground text-background px-1 md:px-2 ml-0.5 md:ml-1"
            aria-hidden="true"
          >
            {'ЗЯМБА'.split('').map((c, i) => (
              <span key={`b-${i}`} style={{ ['--i' as never]: 4 + i }}>{c}</span>
            ))}
          </span>
          <span className="char-rise inline-block align-baseline ml-3 md:ml-5 text-foreground/40" aria-hidden="true">
            <span style={{ ['--i' as never]: 9 }}>№</span>
          </span>
          <span className="char-rise inline-block align-baseline text-foreground glitch-x" aria-hidden="true">
            <span style={{ ['--i' as never]: 10 }}>9</span>
            <span style={{ ['--i' as never]: 11 }}>5</span>
          </span>
          <span className="sr-only">ЗАВОЗЯМБА №95</span>
        </h1>

        <p
          className="mt-5 max-w-2xl text-foreground/75 text-base md:text-lg leading-relaxed animate-fade-up"
          style={{ animationDelay: '650ms' }}
        >
          Ретрансляция криворожского андеграунда. Музыка, Minecraft, мемы и 95
          братух в прямом эфире. Ниже — все каналы,{' '}
          <span className="bg-foreground text-background px-1">выбирай любой</span>.
        </p>

        {/* Channel guide — TV-guide table of all 4 destinations */}
        <div className="mt-10 md:mt-14">
          <div className="flex items-baseline justify-between mb-4">
            <span className="eyebrow">// CHANNEL GUIDE</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              [{String(channels.length).padStart(2, '0')}_CHANNELS_ON_AIR]
            </span>
          </div>

          <ul className="border border-border bg-border grid gap-px">
            {channels.map((ch, i) => (
              <li key={ch.id} className="bg-card">
                <a
                  href={ch.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid grid-cols-[auto_auto_1fr_auto] md:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 md:gap-6 p-4 md:p-5 transition-colors hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background"
                  style={{
                    animation: 'fade-up 0.55s cubic-bezier(0.16,1,0.3,1) both',
                    animationDelay: `${80 + i * 70}ms`,
                  }}
                >
                  {/* Channel code */}
                  <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground w-12 md:w-16 shrink-0">
                    CH.{String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Avatar in a viewfinder frame */}
                  <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0 border border-border bg-background overflow-hidden">
                    <img
                      src={ch.avatar}
                      alt={ch.name}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-foreground" />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-foreground" />
                    <span className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-foreground" />
                    <span className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-foreground" />
                  </div>

                  {/* Name / role / quote */}
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h2 className="font-display font-black uppercase leading-none tracking-[-0.01em] text-lg md:text-2xl transition-colors">
                        {ch.name}
                      </h2>
                      <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-background/70 group-focus-visible:text-background/70 transition-colors">
                        // {ch.role}
                      </span>
                    </div>
                    <p className="mt-1.5 text-foreground/70 text-xs md:text-sm leading-snug line-clamp-2 md:line-clamp-1 group-hover:text-background/80 group-focus-visible:text-background/80 transition-colors">
                      «{ch.quote}»
                    </p>
                  </div>

                  {/* CTA text (hidden on narrow, visible md+) */}
                  <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-background group-focus-visible:text-background transition-colors">
                    {ch.buttonText}
                  </span>

                  {/* Arrow chip */}
                  <span
                    className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 border border-border text-foreground group-hover:bg-background group-hover:text-foreground group-hover:border-background group-focus-visible:bg-background group-focus-visible:text-foreground transition-all group-hover:-translate-x-0 group-hover:-translate-y-0 overflow-hidden relative"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-3 group-hover:-translate-y-3" />
                    <ArrowUpRight className="w-4 h-4 absolute -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Footnote: EQ bars + frequency dial */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-end gap-1 h-6" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="eq-bar"
                  style={{
                    animationDelay: `${(i % 7) * 80}ms`,
                    height: `${10 + (i % 5) * 4}px`,
                  }}
                />
              ))}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              CH.95 <span className="text-foreground">//</span> 1995.00 MHz{' '}
              <span className="text-foreground caret" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
