import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

import { useReveal } from '@/hooks/use-reveal';

import andryhlyper from '@/assets/andryhlyper.webp';
import vovan from '@/assets/Vovan.webp';
import bonedust from '@/assets/Bonedust.webp';
import kalc from '@/assets/calci.webp';
import bulim from '@/assets/Bul.webp';
import fsrEggImg from '@/assets/fsr-egg.png';
import fsrEggSound from '@/assets/fsr-egg.mp4';
import bulimEggSound from '@/assets/bulim-egg.mp3';

interface MemberCard {
  name: string;
  role: string;
  description: string;
  avatar: string;
  tag: string;
  born?: string;
}

const members: MemberCard[] = [
  {
    name: 'Андрей Хлюпер',
    role: 'Основатель',
    description:
      'Абсолютная легенда Кривого Рога, создатель 95 братух и ФСР.',
    avatar: andryhlyper,
    tag: 'FOUNDER',
    born: 'КРИВОЙ РОГ · 95',
  },
  {
    name: 'Вован Евгеньевич',
    role: 'Главный монтажёр',
    description:
      'Смонтировал все серии «Мести Меллстроя» и другие популярные видео.',
    avatar: vovan,
    tag: 'EDITOR',
    born: 'PREMIERE PRO',
  },
  {
    name: 'Бон Даст',
    role: 'Главный работяга',
    description: 'Работает в Гринвиче днями и ночами.',
    avatar: bonedust,
    tag: 'ON-SHIFT',
    born: 'GREENWICH',
  },
  {
    name: 'Булимень',
    role: 'Гроза Ставрополя',
    description:
      'Уже больше года должен Докичу 100 рублей и боится его приезда.',
    avatar: bulim,
    tag: 'FUGITIVE',
    born: 'СТАВРОПОЛЬ',
  },
  {
    name: 'Кальций',
    role: 'Спидранер греньки',
    description: 'Бог скорости, пвп-ящер и замечательный актёр.',
    avatar: kalc,
    tag: 'SPEEDRUN',
    born: 'МАТРИЦА',
  },
];

interface Stat {
  value: string;
  label: string;
  note?: string;
}

const stats: Stat[] = [
  { value: '95K+', label: 'Участников', note: 'во всех каналах' },
  { value: '01', label: 'Год вместе', note: 'с запуска' },
  { value: '05', label: 'Альбомов', note: 'в ротации' },
  { value: '24/7', label: 'Завозы', note: 'без пауз' },
];

const AboutSection = () => {
  const ref = useReveal<HTMLDivElement>();

  const [feature, ...rest] = members;

  const [fsrEggOpen, setFsrEggOpen] = useState(false);
  const fsrEggAudioRef = useRef<HTMLAudioElement | null>(null);
  const bulimEggAudioRef = useRef<HTMLAudioElement | null>(null);
  const [calcEggOpen, setCalcEggOpen] = useState(false);

  const triggerCalcEgg = () => setCalcEggOpen(true);
  const closeCalcEgg = () => setCalcEggOpen(false);

  const triggerBulimEgg = () => {
    if (!bulimEggAudioRef.current) {
      const a = new Audio(bulimEggSound);
      a.preload = 'auto';
      bulimEggAudioRef.current = a;
    }
    const a = bulimEggAudioRef.current;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  const triggerFsrEgg = () => {
    setFsrEggOpen(true);
    if (!fsrEggAudioRef.current) {
      const a = new Audio(fsrEggSound);
      a.preload = 'auto';
      fsrEggAudioRef.current = a;
    }
    const a = fsrEggAudioRef.current;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  const closeFsrEgg = () => {
    setFsrEggOpen(false);
    const a = fsrEggAudioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!fsrEggOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFsrEgg();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fsrEggOpen]);

  useEffect(() => {
    if (!calcEggOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCalcEgg();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [calcEggOpen]);

  return (
    <section id="about" className="relative section-shell py-24 md:py-32">
      <div className="section-container">
        <div className="chapter-meta mb-8">
          <span>№ II</span>
          <span className="opacity-50">/</span>
          <span>О НАС</span>
          <span className="ml-auto opacity-50 hidden sm:inline">[05_ON_AIR]</span>
        </div>

        <div ref={ref} className="reveal">
          <h2 className="display-xl mb-6 text-balance">
            О{' '}
            <span
              className="font-serif-italic text-foreground/80 not-italic-tracking"
              style={{ fontStyle: 'italic' }}
            >
              нас
            </span>
          </h2>
          <p className="max-w-xl text-foreground/70 text-base md:text-lg mb-16 text-balance">
            Самые завозные и активные братухи, которые вкладываются в развитие{' '}
            <button
              type="button"
              onClick={triggerFsrEgg}
              className="cursor-pointer bg-transparent border-0 p-0 m-0 text-inherit font-inherit hover:text-foreground transition-colors"
            >
              ФСР
            </button>{' '}
            каждый день — от монтажа до мордобоя.
          </p>

          {/* Stats — static values, each cell inverts on hover. */}
          <ul className="mb-20 md:mb-24 border-y border-border grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <li
                key={s.label}
                className="group relative p-5 md:p-7 border-r border-border last:border-r-0 md:[&:nth-child(4n)]:border-r-0 border-b md:border-b-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0 transition-colors duration-200 hover:bg-foreground hover:text-background"
                style={{
                  animation: 'fade-up 0.7s cubic-bezier(0.2,0.9,0.2,1) both',
                  animationDelay: `${120 + i * 90}ms`,
                }}
              >
                <span className="absolute top-3 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-background/60">
                  #0{i + 1}
                </span>
                <div
                  className="font-display font-black uppercase leading-none whitespace-nowrap tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >
                  {s.value}
                </div>
                <div className="mt-3 md:mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-background/70">
                  {s.label}
                </div>
                {s.note && (
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 group-hover:text-background/50">
                    {s.note}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Roster — editorial asymmetric grid.
              Feature card (Андрей) spans two columns with a large portrait.
              Remaining four members sit as portrait-top name-bottom cards. */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border">
            {/* Feature (col-span 2 on md+, full row on lg shared with 3 small) */}
            <article
              className="group relative bg-card md:col-span-3 lg:col-span-2 overflow-hidden transition-colors duration-300 hover:bg-foreground hover:text-background"
              style={{
                animation: 'fade-up 0.8s cubic-bezier(0.2,0.9,0.2,1) both',
                animationDelay: '60ms',
              }}
            >
              <div className="relative h-[360px] md:h-[460px] overflow-hidden bg-background">
                <img
                  src={feature.avatar}
                  alt={feature.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] scale-[1.02] transition-all duration-[1200ms] group-hover:grayscale-0 group-hover:scale-[1.06]"
                />
                {/* Kinetic meta strip over portrait */}
                <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-5 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                  <span className="inline-flex items-center gap-2">
                    <span className="pulse-dot" /> REC · LIVE
                  </span>
                  <span>{feature.born}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-foreground">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                    #01 · {feature.tag}
                  </div>
                  <div
                    className="mt-2 font-display uppercase leading-[0.88] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(2.25rem, 5.2vw, 4rem)' }}
                  >
                    {feature.name}
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-background/70">
                    {feature.role}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-background/50">
                    01 / {String(members.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-3 text-base md:text-lg leading-relaxed text-foreground/80 group-hover:text-background/85 text-balance">
                  {feature.description}
                </p>
              </div>
            </article>

            {/* Remaining members — portrait-top cards */}
            {rest.map((m, i) => {
              const isBulim = m.name === 'Булимень';
              const isCalc = m.name === 'Кальций';
              const onCardClick = isBulim ? triggerBulimEgg : isCalc ? triggerCalcEgg : undefined;
              return (
              <article
                key={m.name}
                onClick={onCardClick}
                className={`group relative bg-card overflow-hidden transition-colors duration-300 hover:bg-foreground hover:text-background${onCardClick ? ' cursor-pointer' : ''}`}
                style={{
                  animation: 'fade-up 0.8s cubic-bezier(0.2,0.9,0.2,1) both',
                  animationDelay: `${140 + i * 80}ms`,
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.05]"
                  />
                  <span className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                    #0{i + 2}
                  </span>
                  <span className="pointer-events-none absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.25em] border border-foreground/40 px-2 py-0.5 text-foreground/80 bg-background/40 backdrop-blur-[1px]">
                    {m.tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div
                    className="font-display uppercase leading-[0.95] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(1.35rem, 1.8vw, 1.85rem)' }}
                  >
                    {m.name}
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground group-hover:text-background/70">
                    {m.role}
                  </div>
                  <p className="mt-3 text-[13px] md:text-sm leading-relaxed text-foreground/75 group-hover:text-background/85">
                    {m.description}
                  </p>
                  {m.born && (
                    <div className="mt-4 pt-3 border-t border-border group-hover:border-background/25 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground group-hover:text-background/50 flex items-center justify-between">
                      <span>{m.born}</span>
                      <span>{String(i + 2).padStart(2, '0')} / {String(members.length).padStart(2, '0')}</span>
                    </div>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </div>

      {fsrEggOpen && (
        <div
          role="dialog"
          aria-label="Секрет"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={closeFsrEgg}
          style={{ textTransform: 'none', letterSpacing: 0 }}
        >
          <div
            className="relative max-w-[min(92vw,720px)] max-h-[88vh] bg-card border border-border shadow-[0_24px_80px_-12px_hsl(0_0%_0%/0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="pulse-dot" />
                SECRET · 04
              </span>
              <button
                type="button"
                onClick={closeFsrEgg}
                aria-label="Закрыть"
                className="w-6 h-6 flex items-center justify-center text-white hover:opacity-80"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src={fsrEggImg}
              alt="Слава Богу 95"
              className="block w-full h-auto max-h-[78vh] object-contain bg-black"
              draggable={false}
            />
          </div>
        </div>
      )}

      {calcEggOpen && (
        <div
          role="dialog"
          aria-label="Секрет"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={closeCalcEgg}
          style={{ textTransform: 'none', letterSpacing: 0 }}
        >
          <div
            className="relative w-[min(92vw,960px)] bg-card border border-border shadow-[0_24px_80px_-12px_hsl(0_0%_0%/0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="pulse-dot" />
                SECRET · 05
              </span>
              <button
                type="button"
                onClick={closeCalcEgg}
                aria-label="Закрыть"
                className="w-6 h-6 flex items-center justify-center text-white hover:opacity-80"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
              <iframe
                src="https://www.youtube.com/embed/BuYKG8LsQx4?autoplay=1&rel=0"
                title="Кальций"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
