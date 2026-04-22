import { ArrowUpRight, ArrowUp } from 'lucide-react';

import Marquee from '@/components/Marquee';

const socials = [
  { label: 'Discord', url: 'https://discord.com/invite/PNnSKWNhYE' },
  { label: 'YouTube', url: 'https://www.youtube.com/@ФСР95' },
  { label: 'Telegram', url: 'https://t.me/+abSXXaH4cf9hNTky' },
  { label: 'Steam', url: 'https://steamcommunity.com/groups/FRSOOfficial' },
];

/**
 * Kinetic "95" wordmark. Five stacked SVG layers, all animated via
 * non-layout-affecting properties (stroke-dashoffset, opacity, and a
 * transformed rect that lives inside a clipPath — the clipPath keeps the
 * moving band visually confined to the glyph shape only):
 *
 *   1. Stepped extrusion (7 back ghosts) — static depth.
 *   2. Solid fill.
 *   3. Scan band — bright horizontal gradient wipes down through the
 *      digits via a clipPath. Visible but can't escape the glyph bbox.
 *   4. Pulsing blurred glow outline.
 *   5. Two running-light outlines chasing in opposite directions for
 *      the kinetic feel.
 *
 * Plus a subtle CRT-style flicker on the whole group so the wordmark
 * reads as a live sign rather than static type.
 */
const GLYPH_PROPS = {
  x: 500,
  y: 300,
  textAnchor: 'middle' as const,
  fontFamily: 'Syne, sans-serif',
  fontWeight: 800,
  fontSize: 360,
  letterSpacing: -10,
};

const KineticWordmark = () => {
  return (
    <div
      className="relative mx-auto select-none pointer-events-none"
      aria-hidden="true"
      style={{ width: 'min(100%, 880px)' }}
    >
      <svg
        viewBox="0 0 1000 360"
        className="relative block w-full h-auto"
        style={{ animation: 'footer-flicker 6.5s steps(1, end) infinite' }}
      >
        <defs>
          <linearGradient id="footer-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.82" />
          </linearGradient>

          {/*
            Vertical bright band used by the scan animation. Previously
            this used the `foreground` bone-white colour, which blended
            with the glyph fill and read as basically invisible. Now it
            uses the electric violet accent already defined on the site
            (same family as Frontierland) so the band pops against the
            fill with a clear colour shift. The bright core is wider
            (38→62%) for a more readable sweep.
          */}
          <linearGradient id="footer-scan-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="hsl(var(--violet-400))" stopOpacity="0" />
            <stop offset="38%"  stopColor="hsl(var(--violet-400))" stopOpacity="0" />
            <stop offset="47%"  stopColor="hsl(var(--violet-300))" stopOpacity="0.85" />
            <stop offset="50%"  stopColor="hsl(var(--violet-50))"  stopOpacity="1" />
            <stop offset="53%"  stopColor="hsl(var(--violet-300))" stopOpacity="0.85" />
            <stop offset="62%"  stopColor="hsl(var(--violet-400))" stopOpacity="0" />
            <stop offset="100%" stopColor="hsl(var(--violet-400))" stopOpacity="0" />
          </linearGradient>

          {/* Clip path shaped as the "95" glyphs — keeps the scan band
              visually inside the digits. */}
          <clipPath id="footer-clip">
            <text {...GLYPH_PROPS}>95</text>
          </clipPath>
        </defs>

        {/* Back ghosts — stepped extrusion behind the fill. */}
        {Array.from({ length: 7 }).map((_, i) => {
          const d = 7 - i;
          return (
            <text
              key={i}
              {...GLYPH_PROPS}
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
        <text {...GLYPH_PROPS} fill="url(#footer-fill)">
          95
        </text>

        {/* Scan band — a tall rectangle clipped to the glyph shape. The
            rect itself is 3× the svg height; translating it -33%..33%
            sweeps the bright middle band through the visible area. */}
        <g clipPath="url(#footer-clip)">
          <rect
            x="0"
            y="-360"
            width="1000"
            height="1080"
            fill="url(#footer-scan-grad)"
            style={{
              animation: 'footer-scan 3.6s linear infinite',
              transformOrigin: '50% 50%',
            }}
          />
        </g>

        {/* Pulsing blurred glow outline. */}
        <text
          {...GLYPH_PROPS}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="8"
          style={{
            animation: 'footer-glow 3.4s ease-in-out infinite',
            filter: 'blur(10px)',
          }}
        >
          95
        </text>

        {/* Forward running-light — bright, chunky dash sliding clockwise. */}
        <text
          {...GLYPH_PROPS}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeOpacity={1}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="140 1120"
          style={{ animation: 'footer-chase 3.6s linear infinite' }}
        >
          95
        </text>

        {/* Reverse running-light — thinner, faster, counter-clockwise. */}
        <text
          {...GLYPH_PROPS}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeOpacity={0.85}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="40 1220"
          style={{ animation: 'footer-chase-reverse 2.4s linear infinite' }}
        >
          95
        </text>
      </svg>

      {/* Quiet typographic sig. */}
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
