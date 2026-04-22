import { ArrowUpRight, ArrowUp } from 'lucide-react';

import Marquee from '@/components/Marquee';

const socials = [
  { label: 'Discord', url: 'https://discord.com/invite/PNnSKWNhYE' },
  { label: 'YouTube', url: 'https://www.youtube.com/@ФСР95' },
  { label: 'Telegram', url: 'https://t.me/+abSXXaH4cf9hNTky' },
  { label: 'Steam', url: 'https://steamcommunity.com/groups/FRSOOfficial' },
];

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

      {/* Huge wordmark block. */}
      <div className="section-container py-16 md:py-24 relative">
        <div
          className="font-display uppercase leading-[0.8] tracking-[-0.03em] text-foreground pointer-events-none select-none"
          style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
          aria-hidden="true"
        >
          ФСР<span className="text-foreground/40">·</span>95
        </div>

        <div className="mt-12 grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 md:gap-14 items-end">
          <div>
            <div className="chapter-meta mb-3">
              <span className="pulse-dot" />
              <span>SIGNAL STABLE · 24/7</span>
            </div>
            <p className="text-foreground/70 max-w-xl text-balance">
              Сделано 95 братухами ради ещё 95,000 братух. Ни одного дня
              без завоза. Спасибо что смотришь.
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
            <span>ZЫBRO / ОМБ / 95,000+</span>
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
