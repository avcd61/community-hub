import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** Duration in seconds. Defaults: 40s (standard), 46s (reverse). */
  duration?: number;
  /** `ink` = white on black. `paper` = black on white. */
  tone?: 'ink' | 'paper';
  className?: string;
}

/**
 * Horizontal marquee. Renders its children four times end-to-end and
 * translates the track by -50% over `duration` so that on any viewport
 * width there are always enough duplicates to fill the screen — no
 * blank seam at the loop boundary. Pause-on-hover is built in.
 */
const Marquee = ({
  children,
  reverse = false,
  duration,
  tone = 'ink',
  className = '',
}: MarqueeProps) => {
  const d = duration ?? (reverse ? 46 : 40);
  const toneCls =
    tone === 'ink'
      ? 'bg-transparent text-foreground'
      : 'bg-foreground text-background';

  const copyCls =
    'flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.28em]';

  return (
    <div className={`relative overflow-hidden ${toneCls} ${className}`}>
      <div
        className={reverse ? 'marquee-track marquee-reverse' : 'marquee-track'}
        style={{ animationDuration: `${d}s` }}
      >
        <div className={copyCls}>{children}</div>
        <div className={copyCls} aria-hidden="true">{children}</div>
        <div className={copyCls} aria-hidden="true">{children}</div>
        <div className={copyCls} aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
