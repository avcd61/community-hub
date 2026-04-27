import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

import logo from '@/assets/logo.webp';

const EGG_TEXT =
  'Нихера себе! Ты нашёл секретку, но вопрос — зачем? Нахер ты вообще шаришься по этому сайту, он разве так интересен? Ну ладно, если ты это видишь, то либо ты макака, которая везде кликает, либо целенаправленно искал тут секретки. Ну, удачи найти все пасхалки!';

const navLinks = [
  { label: 'Главная', href: '#hero', index: 'I' },
  { label: 'О нас', href: '#about', index: 'II' },
  { label: 'Альбомы', href: '#music', index: 'III' },
  { label: 'Frontierland', href: '#frontierland', index: 'IV' },
  { label: 'Меллстрой', href: '#reel', index: 'V' },
];

/**
 * Top navigation. A thin 44px rail at the very top is always visible —
 * contains the wordmark and a live clock/status. The main nav lives
 * beneath it and hides on scroll down / re-appears on scroll up.
 */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('#hero');
  const [clock, setClock] = useState<string>('');
  const [eggOpen, setEggOpen] = useState(false);
  const eggRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const goingDown = y > lastY && y > 120;
      setHidden(goingDown);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { threshold: [0.2, 0.5, 0.8] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!eggOpen) return;
    const onClick = (e: MouseEvent) => {
      if (eggRef.current && !eggRef.current.contains(e.target as Node)) {
        setEggOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEggOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [eggOpen]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      setClock(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Thin status rail — always visible at the very top. */}
      <div className="fixed top-0 inset-x-0 z-50 h-7 flex items-center border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="section-container flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          <div className="flex items-center gap-3 relative" ref={eggRef}>
            <button
              type="button"
              onClick={() => setEggOpen((v) => !v)}
              aria-label="Секрет"
              aria-expanded={eggOpen}
              className="pulse-dot cursor-pointer p-0 border-0 bg-transparent inline-block align-middle"
              style={{ padding: 0 }}
            />
            <span className="text-foreground">FSR-95</span>
            <span className="hidden sm:inline">/ Version IV</span>

            {eggOpen && (
              <div
                role="dialog"
                aria-label="Секрет"
                className="absolute left-0 top-full mt-3 z-[60] w-[min(92vw,360px)] bg-card border border-border shadow-[0_12px_40px_-12px_hsl(0_0%_0%/0.6)] animate-fade-in"
                style={{ textTransform: 'none', letterSpacing: '0' }}
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="pulse-dot" />
                    SECRET · 01
                  </span>
                  <button
                    type="button"
                    onClick={() => setEggOpen(false)}
                    aria-label="Закрыть"
                    className="w-6 h-6 flex items-center justify-center text-foreground/70 hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="px-4 py-4 text-sm leading-relaxed text-foreground font-sans normal-case tracking-normal">
                  {EGG_TEXT}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">95 Братухи зовут...</span>
            <span className="text-foreground/80">{clock}</span>
          </div>
        </div>
      </div>

      {/* Main nav below it. */}
      <header
        className={`fixed top-7 inset-x-0 z-50 transition-all duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-background/90 backdrop-blur-sm border-b border-border'
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
            className="flex items-center gap-3"
            aria-label="FSR-95, на главную"
          >
            <img
              src={logo}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="font-display uppercase text-[15px] md:text-base tracking-[-0.02em] leading-none">
              FSR<span className="bg-foreground text-background px-[0.22em] mx-[0.1em]">-</span>95
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={`u-link font-mono text-[11px] uppercase tracking-[0.25em] ${
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-active={active || undefined}
                >
                  <span className="opacity-50 mr-2">{link.index}</span>
                  {link.label}
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-foreground"
            aria-label="Меню"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      {open && (
        <div className="fixed top-[5.25rem] inset-x-0 z-40 md:hidden bg-background border-y border-border animate-fade-in">
          <nav className="section-container py-6 flex flex-col gap-3">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="flex items-baseline justify-between gap-3 border-b border-border py-3"
                style={{
                  animation: 'fade-up 0.5s cubic-bezier(0.2,0.9,0.2,1) both',
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <span className="font-display uppercase text-xl leading-none">
                  {link.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {link.index}
                </span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
