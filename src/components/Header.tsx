import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import logo from '@/assets/logo.webp';

const navLinks = [
  { label: 'Главная', href: '#hero', code: 'CH.01' },
  { label: 'О нас', href: '#about', code: 'CH.02' },
  { label: 'Альбомы', href: '#music', code: 'CH.03' },
  { label: 'Frontierland', href: '#frontierland', code: 'CH.04' },
];

/**
 * Broadcast control bar. Pinned to the top, swaps to an opaque + bordered
 * state once the user scrolls past the hero. All animations are CSS — no
 * framer-motion is imported here anymore, which saves ~60 KB gzipped on the
 * initial bundle.
 */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-background/92 backdrop-blur-sm border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-14 md:h-16">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go('#hero');
            }}
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="FSR-95"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase">
              <span className="text-foreground">[FSR-95]</span>{' '}
              <span className="text-primary">CH.95</span>{' '}
              <span className="hidden md:inline text-muted-foreground">// BROADCAST</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="group font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-primary group-hover:text-foreground">{link.code}</span>{' '}
                {link.label}
              </a>
            ))}
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-signal pl-4 border-l border-border">
              <span className="on-air-dot" /> ON AIR
            </span>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-foreground"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed top-14 inset-x-0 z-40 md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="section-container py-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="flex items-baseline gap-3 font-mono text-sm uppercase tracking-[0.2em] text-foreground py-1"
              >
                <span className="text-primary text-[11px]">{link.code}</span>
                <span>{link.label}</span>
              </a>
            ))}
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-signal pt-3 border-t border-border">
              <span className="on-air-dot" /> ON AIR
            </span>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
