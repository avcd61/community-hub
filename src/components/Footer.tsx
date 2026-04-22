import { ArrowUpRight, ArrowUp } from 'lucide-react';

import Marquee from '@/components/Marquee';

const socials = [
  { label: 'Discord', url: 'https://discord.com/invite/PNnSKWNhYE' },
  { label: 'YouTube', url: 'https://www.youtube.com/@ФСР95' },
  { label: 'Telegram', url: 'https://t.me/+abSXXaH4cf9hNTky' },
  { label: 'Steam', url: 'https://steamcommunity.com/groups/FRSOOfficial' },
];

/**
 * Kinetic 3D wordmark — the big "95" that pulses and rotates on a
 * perspective axis. Multiple stacked ghost copies create the extrusion feel,
 * each offset in Z. An SVG text-on-path ring spins around the digits.
 *
 * Uses CSS keyframes only (no libraries). Respects prefers-reduced-motion
 * via the global override in index.css.
 */
const KineticWordmark = () => {
  const ghosts = Array.from({ length: 7 });
  return (
    <div className="relative select-none pointer-events-none" aria-hidden="true">
      {/* Rotating text ring behind digits */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        style={{
          animation: 'spin-slow 38s linear infinite',
          maxWidth: '72vw',
          maxHeight: '72vw',
        }}
      >
        <defs>
          <path
            id="footer-ring"
            d="M 260,260 m -210,0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0"
            fill="none"
          />
        </defs>
        <text
          fontFamily="JetBrains Mono, monospace"
          fontSize="17"
          letterSpacing="12"
          fill="hsl(var(--foreground))"
          opacity="0.55"
          textLength="1270"
        >
          <textPath href="#footer-ring" startOffset="0">
            FSR · 95 · BROADCAST · EDITION II · ZЫBRO · НИ ОДНОГО ДНЯ БЕЗ ЗАВОЗА · 95,000+ БРАТУХ ·
          </textPath>
        </text>
      </svg>

      {/* 3D-extruded "95" */}
      <div
        className="relative mx-auto"
        style={{ perspective: '1200px', width: 'min(100%, 900px)' }}
      >
        <div
          className="relative font-display uppercase leading-[0.75] tracking-[-0.05em] text-center"
          style={{
            fontSize: 'clamp(10rem, 28vw, 26rem)',
            transformStyle: 'preserve-3d',
            animation: 'footer-tilt 9s ease-in-out infinite',
          }}
        >
          {/* Extruded ghost stack (behind the main fill) */}
          {ghosts.map((_, i) => {
            const depth = ghosts.length - i;
            return (
              <span
                key={i}
                className="absolute inset-0 font-display uppercase leading-[0.75] tracking-[-0.05em]"
                style={{
                  WebkitTextStroke: '1px hsl(var(--foreground))',
                  color: 'transparent',
                  transform: `translateZ(${-depth * 14}px)`,
                  opacity: 0.08 + i * 0.03,
                }}
              >
                95
              </span>
            );
          })}

          {/* Fill */}
          <span
            className="relative block"
            style={{
              color: 'hsl(var(--foreground))',
              transform: 'translateZ(4px)',
            }}
          >
            95
          </span>

          {/* Front scanning highlight */}
          <span
            className="absolute inset-0 block"
            style={{
              background:
                'linear-gradient(180deg, hsl(var(--foreground) / 0) 0%, hsl(var(--foreground) / 0.85) 50%, hsl(var(--foreground) / 0) 100%)',
              WebkitMaskImage:
                'linear-gradient(180deg, transparent 40%, black 48%, black 52%, transparent 60%)',
              maskImage:
                'linear-gradient(180deg, transparent 40%, black 48%, black 52%, transparent 60%)',
              color: 'hsl(var(--background))',
              mixBlendMode: 'difference',
              animation: 'footer-scan 3.4s ease-in-out infinite',
            }}
          >
            <span className="font-display uppercase leading-[0.75] tracking-[-0.05em]">
              95
            </span>
          </span>
        </div>

        {/* Split FSR label under the 95 with per-letter animation */}
        <div className="mt-2 md:mt-4 flex items-center justify-center gap-[0.6em] font-mono text-[11px] md:text-[13px] uppercase tracking-[0.45em] text-muted-foreground">
          {['F', 'S', 'R', '·', '9', '5', '·', 'B', 'R', 'O', 'A', 'D', 'C', 'A', 'S', 'T'].map(
            (ch, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: 'footer-bob 2.4s ease-in-out infinite',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {ch}
              </span>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes footer-tilt {
          0%,100% { transform: rotateX(8deg) rotateY(-6deg); }
          50%     { transform: rotateX(-4deg) rotateY(6deg); }
        }
        @keyframes footer-scan {
          0%,100% { opacity: 0.0; transform: translateY(-8%); }
          45%     { opacity: 0.9; transform: translateY(0%); }
          55%     { opacity: 0.9; transform: translateY(0%); }
          100%    { opacity: 0.0; transform: translateY(8%); }
        }
        @keyframes footer-bob {
          0%,100% { transform: translateY(0); opacity: 0.75; }
          50%     { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const Footer = () => {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative section-shell">
      {/* Rail marquee at the top of footer. */}
      <Marquee tone="paper" duration={44} reverse>
        <span>END OF TRANSMISSION</span>
        <span className="dot-sep" />
        <span>FSR-95 · EDITION II</span>
        <span className="dot-sep" />
        <span>MADE IN 2026 · KЫR-95</span>
        <span className="dot-sep" />
        <span>{'<'} RETURN TO TOP {'>'}</span>
        <span className="dot-sep" />
      </Marquee>

      {/* Kinetic 3D wordmark. */}
      <div className="section-container py-20 md:py-28 relative">
        <KineticWordmark />

        <div className="mt-16 md:mt-24 grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 md:gap-14 items-end">
          <div>
            <div className="chapter-meta mb-3">
              <span className="pulse-dot" />
              <span>SIGNAL STABLE · 24/7</span>
            </div>
            <p className="text-foreground/70 max-w-xl text-balance">
              Сделано 95 братухами ради ещё 95 000 братух. Ни одного дня без
              завоза. Спасибо что смотришь.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-invert group"
                >
                  <span>{s.label}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hatched separator. */}
        <div className="mt-14 h-[10px] hatch" aria-hidden="true" />

        <div className="mt-6 flex items-center justify-between flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>© 2024–2026 FSR-95</span>
            <span className="opacity-50">·</span>
            <span>ZЫBRO / ОМБ / 95 000+</span>
          </div>
          <button
            type="button"
            onClick={toTop}
            className="u-link inline-flex items-center gap-2 text-foreground"
            aria-label="Наверх"
          >
            <span>К началу</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
