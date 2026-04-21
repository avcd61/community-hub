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
 * Two frameless video cards that sit between the hero and the roster. They
 * were originally huge GIF buttons — replaced with looping inline video
 * (MP4 + WebM fallback) which shrinks Brisha.gif from 63 MB to ~500 KB.
 *
 * Left card plays an audio sting on click, right opens the YouTube channel.
 * No amber window chrome — just clean frames with corner ticks and a slim
 * footer bar for the label + action hint.
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
    <section className="relative py-14 md:py-20 border-b border-border">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow">№ 01 / ВЫЗОВ В ЭФИР</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            [TAP_TO_PLAY]
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Brisha — clickable card that plays the Dogh sting */}
          <button
            type="button"
            onClick={playDogh}
            className="group relative text-left"
            aria-label="Брыша — проиграть звук"
          >
            <div className="relative overflow-hidden bg-background">
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
              {/* Viewfinder corner ticks */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary" />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <Volume2 className="w-3 h-3 text-primary" />
                BRISHA.VID <span className="text-muted-foreground/60">// audio-trigger</span>
              </span>
              <span className="text-primary group-hover:text-foreground transition-colors">
                [ TAP ▸ ]
              </span>
            </div>
          </button>

          {/* Right: Andrew — link to YouTube */}
          <a
            href={andrewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="relative overflow-hidden bg-background">
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
                ANDREW.VID <span className="text-muted-foreground/60">// youtube.com/@фср95</span>
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
