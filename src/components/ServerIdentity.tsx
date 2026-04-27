import { useReveal } from '@/hooks/use-reveal';

import logo from '@/assets/logo.webp';

const tags = [
  { glyph: '♪', label: 'Музыка' },
  { glyph: '☍', label: 'Игры' },
  { glyph: '✶', label: 'Искусство' },
  { glyph: '☷', label: 'Общение' },
];

/**
 * Manifesto. Sits between About and Music. Giant numeric "95" with
 * outline twin for depth, a Tatar manifesto block, and a badge row.
 * Everything is static except a slow rotation on a small kinetic mark.
 */
const ServerIdentity = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="server" className="relative section-shell py-24 md:py-32">
      <div className="section-container">
        <div className="chapter-meta mb-8">
          <span>№ III</span>
          <span className="opacity-50">/</span>
          <span>МАНИФЕСТ</span>
          <span className="ml-auto opacity-50 hidden sm:inline">[IDENT_CARD]</span>
        </div>

        <div ref={ref} className="reveal grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-20 items-center">
          {/* Logo + giant numeric */}
          <div className="relative flex items-center gap-6 md:gap-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 border border-border bg-card shrink-0 flex items-center justify-center">
              <img
                src={logo}
                alt="FSR-95"
                className="w-full h-full object-contain p-5"
                loading="lazy"
                decoding="async"
                width={200}
                height={200}
              />
              <span className="pointer-events-none absolute -top-1 -left-1 w-4 h-4 border-t border-l border-foreground" />
              <span className="pointer-events-none absolute -top-1 -right-1 w-4 h-4 border-t border-r border-foreground" />
              <span className="pointer-events-none absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-foreground" />
              <span className="pointer-events-none absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-foreground" />
            </div>
            <div
              className="relative font-display uppercase leading-[0.8] select-none"
              style={{ fontSize: 'clamp(5rem, 20vw, 16rem)', letterSpacing: '-0.05em' }}
              aria-hidden="true"
            >
              <span
                className="absolute inset-0 text-transparent"
                style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.35)' }}
              >
                95
              </span>
              <span className="relative text-foreground inline-block">95</span>
            </div>
          </div>

          {/* Manifesto */}
          <div>
            <h2 className="display-lg mb-6">
              FSR<span className="bg-foreground text-background px-[0.15em] mx-[0.03em]">-</span>95
            </h2>
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed max-w-xl text-balance">
              Иҗат туа торган һәм нык дуслык бәйләнешләре корыла торган урын. Без
              гади генә Discord-сервер түгел — без музыка, уеннар һәм сәнгатькә
              булган уртак мәхәббәт белән берләшкән фикердәшләр гаиләсе.
            </p>
            <p className="mt-4 font-serif-italic text-foreground/60 text-base md:text-lg max-w-xl" style={{ fontStyle: 'italic' }}>
              /&nbsp;место где рождается творчество и куются крепкие дружеские связи.
            </p>

            <ul className="mt-10 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t.label} className="chip group transition-colors duration-200 hover:bg-foreground hover:text-background hover:border-foreground">
                  <span aria-hidden="true" className="opacity-70 group-hover:opacity-100">{t.glyph}</span>
                  {t.label}
                </li>
              ))}
            </ul>

            {/* Kinetic mark — slow spinner with text around an SVG circle. */}
            <div className="mt-10 flex items-center gap-5">
              <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
                <svg
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="server-circle"
                      d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                    />
                  </defs>
                  <text
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="9"
                    letterSpacing="4"
                    fill="currentColor"
                    className="text-foreground uppercase"
                  >
                    <textPath href="#server-circle">
                      · FSR-95 · BROADCAST · EST. 2024 · MHZ 1995.00 · ЗАВОЗЯМБА
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-display uppercase leading-none text-base text-foreground">
                  95
                </div>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                <div className="text-foreground">SIGNAL STABLE</div>
                <div className="mt-1">24/7 · 365 · NO DAY OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerIdentity;
