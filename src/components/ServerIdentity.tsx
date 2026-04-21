import { useReveal } from '@/hooks/use-reveal';

import logo from '@/assets/logo.webp';

const tags = [
  { emoji: '🎵', label: 'Музыка' },
  { emoji: '🎮', label: 'Игры' },
  { emoji: '🎨', label: 'Искусство' },
  { emoji: '💬', label: 'Общение' },
];

/**
 * Server identity / manifesto. Huge "95" numeral on the left (brutalist),
 * Tatar manifesto paragraph on the right. The logo sits inside a viewfinder
 * frame. Completely static — no animation runtime.
 */
const ServerIdentity = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="server" className="relative py-20 md:py-28 border-b border-border">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow">№ 03 / МАНИФЕСТ</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            [IDENT_CARD]
          </span>
        </div>

        <div ref={ref} className="reveal grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
          {/* Logo + giant "95" */}
          <div className="relative flex items-center gap-6">
            <div className="relative w-36 h-36 md:w-44 md:h-44 border border-border bg-card shrink-0">
              <img
                src={logo}
                alt="FSR-95"
                className="w-full h-full object-contain p-4"
                loading="lazy"
                decoding="async"
                width={200}
                height={200}
              />
              <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-primary" />
              <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-primary" />
              <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-primary" />
              <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary" />
            </div>
            <div
              className="font-display font-black uppercase leading-[0.8] text-primary select-none"
              style={{ fontSize: 'clamp(6rem, 22vw, 18rem)', letterSpacing: '-0.05em' }}
              aria-hidden="true"
            >
              95
            </div>
          </div>

          {/* Manifesto */}
          <div>
            <h2 className="display-lg text-foreground mb-5">
              FSR<span className="text-primary">-</span>95
            </h2>
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed max-w-xl">
              Иҗат туа торган һәм нык дуслык бәйләнешләре корыла торган урын. Без гади генә
              Discord-сервер түгел — без музыка, уеннар һәм сәнгатькә булган уртак мәхәббәт
              белән берләшкән фикердәшләр гаиләсе.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t.label} className="chip">
                  <span aria-hidden="true">{t.emoji}</span>
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerIdentity;
