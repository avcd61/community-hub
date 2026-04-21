import { useRef } from 'react';
import { ArrowUpRight, Volume2 } from 'lucide-react';

import andrewMp4 from '@/assets/Andrew.mp4';
import andrewWebm from '@/assets/Andrew.webm';
import andrewPoster from '@/assets/Andrew.webp';
import brishaMp4 from '@/assets/Brisha.mp4';
import brishaWebm from '@/assets/Brisha.webm';
import brishaPoster from '@/assets/Brisha.webp';
import doghAudio from '@/assets/Dogh.mp4';

/**
 * Two standalone video drops placed in opposite corners — no card, no
 * container background. Brisha pins to the top-left, Andrew hangs from the
 * bottom-right. Between them, a diagonal strip of mono text fills the
 * negative space so the section doesn't feel empty.
 *
 * Video is loop/muted/inline (MP4 + WebM). Tap Brisha to play the 'Dogh'
 * sting; Andrew opens the YouTube channel.
 */
const andrewLink = 'https://www.youtube.com/@ФСР95';

const InteractivePlaceholders = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playDogh = () => {
    if (!audioRef.current) {
      const a = new Audio(doghAudio);
      a.preload = 'none';
      audioRef.current = a;
    }
    const a = audioRef.current;
    a.currentTime = 0;
    a.play().catch(() => { /* User hasn't interacted yet; ignore. */ });
  };

  return (
    <section className="relative py-16 md:py-24 border-b border-border">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-8">
          <span className="eyebrow">№ 01 / ВЫЗОВ В ЭФИР</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            [TAP_TO_PLAY]
          </span>
        </div>

        {/* Diagonal stage: two drops in opposite corners with a caption ribbon
            running between them. Fixed min-height on md+ so the absolute
            positioning has room to breathe; on mobile it stacks linearly. */}
        <div className="relative min-h-[360px] md:min-h-[520px]">
          {/* Diagonal slash running corner to corner (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none select-none"
          >
            <div
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground/40"
              style={{ transform: 'rotate(-18deg)' }}
            >
              ▸ SIGNAL_ACQUIRED ·· CHANNEL 95 ·· DOGH.WAV ·· SUBSCRIBE.NOW ·· SIGNAL_ACQUIRED
            </div>
          </div>

          {/* Left: Brisha — top-left drop */}
          <button
            type="button"
            onClick={playDogh}
            aria-label="Брыша — проиграть звук"
            className="group block md:absolute md:top-0 md:left-0 w-full md:w-[44%] mb-8 md:mb-0 text-left"
          >
            <div className="relative overflow-hidden">
              <video
                muted
                loop
                autoPlay
                playsInline
                preload="none"
                poster={brishaPoster}
                className="block w-full aspect-square object-cover"
                width={600}
                height={600}
              >
                <source src={brishaWebm} type="video/webm" />
                <source src={brishaMp4} type="video/mp4" />
              </video>
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary" />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <Volume2 className="w-3 h-3 text-primary" />
                BRISHA.VID <span className="text-muted-foreground/60 hidden sm:inline">// audio-trigger</span>
              </span>
              <span className="text-primary group-hover:text-foreground transition-colors">
                [ TAP ▸ ]
              </span>
            </div>
          </button>

          {/* Right: Andrew — bottom-right drop */}
          <a
            href={andrewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block md:absolute md:bottom-0 md:right-0 w-full md:w-[44%]"
          >
            <div className="relative overflow-hidden">
              <video
                muted
                loop
                autoPlay
                playsInline
                preload="none"
                poster={andrewPoster}
                className="block w-full aspect-square object-cover"
                width={600}
                height={600}
              >
                <source src={andrewWebm} type="video/webm" />
                <source src={andrewMp4} type="video/mp4" />
              </video>
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary" />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <ArrowUpRight className="w-3 h-3 text-primary" />
                ANDREW.VID <span className="text-muted-foreground/60 hidden sm:inline">// youtube.com/@фср95</span>
              </span>
              <span className="text-primary group-hover:text-foreground transition-colors">
                [ OPEN ▸ ]
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlaceholders;
