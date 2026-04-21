import { useReveal } from '@/hooks/use-reveal';

import andryhlyper from '@/assets/andryhlyper.webp';
import vovan from '@/assets/Vovan.webp';
import miha from '@/assets/Миха.webp';
import bonedust from '@/assets/Bonedust.webp';
import kalc from '@/assets/calci.webp';
import bulim from '@/assets/Bul.webp';

interface MemberCard {
  name: string;
  role: string;
  description: string;
  avatar: string;
}

const memberCards: MemberCard[] = [
  {
    name: 'Андрей Хлюпер',
    role: 'Основатель',
    description: 'Абсолютная легенда Кривого Рога, создатель 95 братух и ФСР',
    avatar: andryhlyper,
  },
  {
    name: 'Вован Евгеньевич',
    role: 'Главный монтажёр',
    description: 'Смонтировал все серии "Мести Меллстроя" и другие популярные видео.',
    avatar: vovan,
  },
  {
    name: 'Михал Палыч',
    role: 'Главнный десигнер',
    description: 'Создал шедевральные аватарки для канала и сервера ФСР.',
    avatar: miha,
  },
  {
    name: 'Бон Даст',
    role: 'Главный работяга',
    description: 'Работает в Гринвиче днями и ночами.',
    avatar: bonedust,
  },
  {
    name: 'Булимень',
    role: 'Гроза Ставрополя',
    description: 'Уже больше года должен Докичу 100 рублей и теперь боится его приезда.',
    avatar: bulim,
  },
  {
    name: 'Кальций',
    role: 'Спидранер греньки',
    description: 'Бог скорости, пвп ящер и замечательный актёр в общем кальций.',
    avatar: kalc,
  },
];

const stats = [
  { value: '95,000+', label: 'Участников' },
  { value: '1', label: 'Год вместе' },
  { value: '5', label: 'Альбомов' },
  { value: '24/7', label: 'Завозы' },
];

/**
 * Roster section. Stats are rendered as hard-edged brutalist blocks with an
 * offset shadow; members are laid out as a grid of "dossier" cards whose
 * photos hang in a thin viewfinder frame. IntersectionObserver staggers the
 * fade-up via a CSS transition so we don't import framer-motion.
 */
const AboutSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-20 md:py-28 border-b border-border">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow">№ 02 / РОСТЕР</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hidden md:inline">
            [06_LOGGED_ON_AIR]
          </span>
        </div>

        <div ref={ref} className="reveal">
          <h2 className="display-xl text-foreground mb-4">
            О&nbsp;НАС<span className="text-primary">.</span>
          </h2>
          <p className="max-w-2xl text-foreground/80 text-base md:text-lg mb-12">
            Самые завозные и активные братухи которые сделали большой вклад в
            развитие ФСР.
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 mb-16">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`border border-border px-5 py-6 md:py-8 bg-card ${
                  i > 0 ? '-ml-px' : ''
                } ${i > 1 ? 'md:ml-0 md:-ml-px' : ''}`}
              >
                <div className="display-lg text-foreground">{s.value}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Roster grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {memberCards.map((m, i) => (
              <li
                key={m.name}
                className="block p-5 md:p-6"
                style={{
                  animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 border border-border bg-background overflow-hidden">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-primary" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
                    <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
                    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-1">
                      № {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display font-black uppercase text-lg md:text-xl leading-none text-foreground mb-2">
                      {m.name}
                    </h3>
                    <div className="chip chip-primary mb-3">{m.role}</div>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
