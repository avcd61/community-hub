import { useEffect, useRef, useState } from 'react';

import { useReveal } from '@/hooks/use-reveal';

import andryhlyper from '@/assets/andryhlyper.webp';
import vovan from '@/assets/Vovan.webp';
import bonedust from '@/assets/Bonedust.webp';
import kalc from '@/assets/calci.webp';
import bulim from '@/assets/Bul.webp';

interface MemberCard {
  name: string;
  role: string;
  description: string;
  avatar: string;
  tag: string;
}

const members: MemberCard[] = [
  {
    name: 'Андрей Хлюпер',
    role: 'Основатель',
    description: 'Абсолютная легенда Кривого Рога, создатель 95 братух и ФСР.',
    avatar: andryhlyper,
    tag: 'FOUNDER',
  },
  {
    name: 'Вован Евгеньевич',
    role: 'Главный монтажёр',
    description: 'Смонтировал все серии «Мести Меллстроя» и другие популярные видео.',
    avatar: vovan,
    tag: 'EDITOR',
  },
  {
    name: 'Бон Даст',
    role: 'Главный работяга',
    description: 'Работает в Гринвиче днями и ночами.',
    avatar: bonedust,
    tag: 'ON-SHIFT',
  },
  {
    name: 'Булимень',
    role: 'Гроза Ставрополя',
    description: 'Уже больше года должен Докичу 100 рублей и боится его приезда.',
    avatar: bulim,
    tag: 'FUGITIVE',
  },
  {
    name: 'Кальций',
    role: 'Спидранер греньки',
    description: 'Бог скорости, пвп-ящер и замечательный актёр.',
    avatar: kalc,
    tag: 'SPEEDRUN',
  },
];

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  /** Formatter for the displayed value during count-up. */
  format?: (n: number) => string;
}

const stats: Stat[] = [
  {
    value: 95000,
    suffix: '+',
    label: 'Участников',
    format: (n) => n.toLocaleString('ru-RU'),
  },
  { value: 1, label: 'Год вместе' },
  { value: 5, label: 'Альбомов' },
  { value: 24, suffix: '/7', label: 'Завозы' },
];

/**
 * Animated count-up display. Triggers once when the element enters view.
 * Uses requestAnimationFrame with an ease-out curve.
 */
const CountUp = ({ to, durationMs = 1600, format }: { to: number; durationMs?: number; format?: (n: number) => string }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - start) / durationMs, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, durationMs]);

  return <span ref={ref}>{format ? format(n) : n}</span>;
};

const AboutSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative section-shell py-24 md:py-32">
      <div className="section-container">
        <div className="chapter-meta mb-8">
          <span>№ II</span>
          <span className="opacity-50">/</span>
          <span>РОСТЕР</span>
          <span className="ml-auto opacity-50 hidden sm:inline">[05_ON_AIR]</span>
        </div>

        <div ref={ref} className="reveal">
          <h2 className="display-xl mb-6 text-balance">
            КТО <span className="font-serif-italic text-foreground/80" style={{ fontStyle: 'italic' }}>сидит</span>{' '}
            НА ЭТОМ КАНАЛЕ
          </h2>
          <p className="max-w-xl text-foreground/70 text-base md:text-lg mb-16 text-balance">
            Самые завозные и активные братухи, которые вкладываются в развитие ФСР
            каждый день — от монтажа до мордобоя.
          </p>

          {/* Stats — each cell inverts on hover. */}
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
                <div className="font-display font-black uppercase leading-none whitespace-nowrap tracking-[-0.03em]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                  <CountUp to={s.value} format={s.format} />
                  {s.suffix && <span className="opacity-90">{s.suffix}</span>}
                </div>
                <div className="mt-3 md:mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-background/70">
                  {s.label}
                </div>
              </li>
            ))}
          </ul>

          {/* Roster cards. */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {members.map((m, i) => (
              <li
                key={m.name}
                className="group relative bg-card p-6 md:p-8 transition-colors duration-300 hover:bg-foreground hover:text-background"
                style={{
                  animation: 'fade-up 0.8s cubic-bezier(0.2,0.9,0.2,1) both',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex items-start gap-5">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 border border-border group-hover:border-background/30 bg-background overflow-hidden">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.05]"
                    />
                    <span className="pointer-events-none absolute -top-px -left-px w-3 h-3 border-t border-l border-foreground/60 group-hover:border-background/60" />
                    <span className="pointer-events-none absolute -bottom-px -right-px w-3 h-3 border-b border-r border-foreground/60 group-hover:border-background/60" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-background/60">
                        #0{i + 1}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] border border-border group-hover:border-background/40 px-2 py-0.5 text-muted-foreground group-hover:text-background/70">
                        {m.tag}
                      </span>
                    </div>
                    <div className="font-display uppercase text-2xl md:text-3xl leading-none tracking-[-0.02em]">
                      {m.name}
                    </div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 group-hover:text-background/70">
                      {m.role}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm md:text-base text-foreground/75 group-hover:text-background/85 leading-relaxed">
                  {m.description}
                </p>
                {/* Corner decoration. */}
                <span className="pointer-events-none absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-background/50">
                  {String(i + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
