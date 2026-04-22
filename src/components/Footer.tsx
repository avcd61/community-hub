import { ArrowUpRight, ArrowUp } from 'lucide-react';

import Marquee from '@/components/Marquee';

const socials = [
  { label: 'Discord', url: 'https://discord.com/invite/PNnSKWNhYE' },
  { label: 'YouTube', url: 'https://www.youtube.com/@ФСР95' },
  { label: 'Telegram', url: 'https://t.me/+abSXXaH4cf9hNTky' },
  { label: 'Steam', url: 'https://steamcommunity.com/groups/FRSOOfficial' },
];

/**
 * Footer wordmark — a large "95" rendered as an SVG so we can layer a
 * stroked extrusion behind a solid fill with perfect pixel alignment (no
 * font-offset drift that CSS WebkitTextStroke has). Around it, a slow
 * rotating ring of mono labels carries the kinetic energy.
 *
 * Why SVG instead of the previous CSS stack:
 * - The old footer layered CSS `WebkitTextStroke` ghosts on top of a
 *   filled `<span>` with a `mix-blend-mode: difference` scanning band.
 *   On a fixed dark page the scan band clipped the digits horizontally
 *   and looked like the "95" was cracked in half. SVG text is the
 *   predictable way to stack stroke + fill without any blend mode.
 * - Everything animates via CSS keyframes defined in index.css so we
 *   don't ship per-component <style> blocks.
 */
const KineticWordmark = () => {
  return (
    <div
      className="relative mx-auto select-none pointer-events-none"
      aria-hidden="true"
      style={{ width: 'min(100%, 880px)' }}
    >
      {/* Rotating ring behind the digits. */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="560"
        height="560"
        viewBox="0 0 560 560"
        style={{
          animation: 'spin-slow 46s linear infinite',
          maxWidth: '86vw',
          maxHeight: '86vw',
        }}
      >
        <defs>
          <path
            id="footer-ring"
            d="M 280,280 m -230,0 a 230,230 0 1,1 460,0 a 230,230 0 1,1 -460,0"
            fill="none"
          />
        </defs>
        <text
          fontFamily="JetBrains Mono, monospace"
          fontSize="16"
          letterSpacing="10"
          fill="hsl(var(--foreground))"
          opacity="0.45"
          textLength="1420"
        >
          <textPath href="#footer-ring" startOffset="0">
            FSR · 95 · BROADCAST · EDITION II · ZЫBRO · НИ ОДНОГО ДНЯ БЕЗ ЗАВОЗА · 95 000+ БРАТУХ · ФСР · 95 ·
          </textPath>
        </text>
      </svg>

      {/* The "95" itself — extruded via stacked stroked copies, no blend mode. */}
      <svg
        viewBox="0 0 1000 360"
        className="relative block w-full h-auto"
        style={{ animation: 'footer-breathe 7s ease-in-out infinite' }}
      >
        <defs>
          <linearGradient id="footer-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.82" />
          </linearGradient>
        </defs>
        {/* Back ghosts — each one offset upward so the digits read as a
            stepped extrusion. Opacities fade back into the bg. */}
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
        {/* Fill (front). */}
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
      </svg>

      {/* Per-letter FSR label under the digits with staggered bob. */}
      <div className="mt-3 md:mt-5 flex items-center justify-center gap-[0.55em] font-mono text-[11px] md:text-[13px] uppercase tracking-[0.45em] text-muted-foreground">
        {['F', 'S', 'R', '·', '9', '5', '·', 'B', 'R', 'O', 'A', 'D', 'C', 'A', 'S', 'T'].map(
          (ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: 'footer-bob 2.6s ease-in-out infinite',
                animationDelay: `${i * 80}ms`,
              }}
            >
              {ch}
            </span>
          )
        )}
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
