import { ArrowUpRight, ArrowUp } from 'lucide-react';

import Marquee from '@/components/Marquee';

const socials = [
  { label: 'Discord', url: 'https://discord.com/invite/PNnSKWNhYE' },
  { label: 'YouTube', url: 'https://www.youtube.com/@ФСР95' },
  { label: 'Telegram', url: 'https://t.me/+abSXXaH4cf9hNTky' },
  { label: 'Steam', url: 'https://steamcommunity.com/groups/FRSOOfficial' },
];

/**
 * Footer wordmark — a large "95" rendered as an SVG with a stepped
 * extrusion behind a solid fill, plus a slow stroke-chase animation
 * travelling along the glyph outline. The previous iteration added a
 * rotating text ring and a `scale()` breathe animation on the digits;
 * both were removed because idle transforms on such a large element
 * read as the whole page gently rocking up and down.
 *
 * All animation here is opacity / stroke-dashoffset based — nothing
 * translates or scales, so there is zero perceivable movement of the
 * surrounding layout.
 */
const KineticWordmark = () => {
  return (
    <div
      className="relative mx-auto select-none pointer-events-none"
      aria-hidden="true"
      style={{ width: 'min(100%, 880px)' }}
    >
      <svg viewBox="0 0 1000 360" className="relative block w-full h-auto">
        <defs>
          <linearGradient id="footer-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.82" />
          </linearGradient>
        </defs>

        {/* Back ghosts — stepped extrusion behind the fill. */}
        {Array.from({ length: 7 }).map((_, i) => {
          const d = 7 - i;
          return (
            <text
              key={i}
              x="500"
              y="300"
              textAnchor="middle"
              fontFamily="Syne, sans-serif"
              fontWeight={800}
              fontSize="360"
              letterSpacing="-10"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeOpacity={0.08 + i * 0.035}
              strokeWidth="1.5"
              transform={`translate(${d * 2}, ${-d * 6})`}
            >
              95
            </text>
          );
        })}

        {/* Solid fill. */}
        <text
          x="500"
          y="300"
          textAnchor="middle"
          fontFamily="Syne, sans-serif"
          fontWeight={800}
          fontSize="360"
          letterSpacing="-10"
          fill="url(#footer-fill)"
        >
          95
        </text>

        {/* Glow outline — soft pulsing ghost sitting flush on top of the
            fill. Pure opacity animation, no transform. */}
        <text
          x="500"
          y="300"
          textAnchor="middle"
          fontFamily="Syne, sans-serif"
          fontWeight={800}
          fontSize="360"
          letterSpacing="-10"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          style={{
            animation: 'footer-glow 5.2s ease-in-out infinite',
            filter: 'blur(6px)',
          }}
        >
          95
        </text>

        {/* Running-light outline — a dashed stroke whose offset animates
            so a bright segment slides around the glyph perimeter. */}
        <text
          x="500"
          y="300"
          textAnchor="middle"
          fontFamily="Syne, sans-serif"
          fontWeight={800}
          fontSize="360"
          letterSpacing="-10"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeOpacity={0.95}
          strokeWidth="2"
          strokeDasharray="80 1180"
          style={{ animation: 'footer-chase 6s linear infinite' }}
        >
          95
        </text>
      </svg>

      {/* Quiet typographic sig — no per-letter bob. */}
      <div className="mt-4 text-center font-mono text-[11px] md:text-[13px] uppercase tracking-[0.45em] text-muted-foreground">
        FSR · 95 · BROADCAST
      </div>
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

      <div className="section-container py-20 md:py-28 relative">
        <KineticWordmark />

        <div className="mt-14 md:mt-20 grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 md:gap-14 items-end">
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
