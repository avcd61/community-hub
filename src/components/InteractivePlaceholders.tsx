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
 * Two "terminal windows" that sit between the hero and the roster. They were
 * originally huge GIF buttons — replaced with looping inline video (MP4 +
 * WebM fallback) which shrinks the single Brisha.gif from 63 MB to ~500 KB.
 *
 * Left window plays an audio sting on click, right window opens the YouTube
 * channel. Both are deferred on paint (`playsInline` + `autoPlay` without
 * `preload="auto"`) so they don't compete with the hero for bandwidth.
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
    a.play().catch(() => { /* User might not have interacted yet; ignore. */ });
  };

  return (
    <section className="relative py-14 md:py-20 border-b border-border">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow">
            № 01 / ВЫЗОВ В ЭФИР
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            [TAP_TO_PLAY]
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Brisha — clickable terminal window that plays audio */}
          <button
            type="button"
            onClick={playDogh}
            className="window text-left group block"
            aria-label="Брыша — проиграть звук"
          >
            <div className="window-title">
              <span>▓</span>
              <span>WND_01_BRISHA.VID</span>
              <span className="ml-auto flex items-center gap-2">
                <Volume2 className="w-3 h-3" />
                <span className="on-air-dot" />
              </span>
            </div>
            <div className="window-body pt-8 p-3">
              <video
                muted
                loop
                autoPlay
                playsInline
                preload="none"
                poster={brishaPoster}
                className="w-full aspect-square object-cover bg-background"
                width={600}
                height={600}
              >
                <source src={brishaWebm} type="video/webm" />
                <source src={brishaMp4} type="video/mp4" />
              </video>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>// audio-trigger</span>
                <span className="text-primary group-hover:text-foreground transition-colors">
                  [ TAP ▸ ]
                </span>
              </div>
            </div>
          </button>

          {/* Right: Andrew — link to YouTube */}
          <a
            href={andrewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="window block group"
          >
            <div className="window-title">
              <span>▓</span>
              <span>WND_02_ANDREW.VID</span>
              <span className="ml-auto flex items-center gap-2">
                <ArrowUpRight className="w-3 h-3" />
                <span className="on-air-dot" />
              </span>
            </div>
            <div className="window-body pt-8 p-3">
              <video
                muted
                loop
                autoPlay
                playsInline
                preload="none"
                poster={andrewPoster}
                className="w-full aspect-square object-cover bg-background"
                width={600}
                height={600}
              >
                <source src={andrewWebm} type="video/webm" />
                <source src={andrewMp4} type="video/mp4" />
              </video>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>// youtube.com/@фср95</span>
                <span className="text-primary group-hover:text-foreground transition-colors">
                  [ OPEN ▸ ]
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlaceholders;
