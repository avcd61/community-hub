import { useRef } from 'react';

import andrewCutout from '@/assets/Andrew.cutout.webp';
import brishaMp4 from '@/assets/Brisha.mp4';
import brishaWebm from '@/assets/Brisha.webm';
import brishaPoster from '@/assets/Brisha.webp';
import doghAudio from '@/assets/Dogh.mp4';

/**
 * Two cutouts shown at their native aspect with transparent backgrounds —
 * no crop, no frames, no overlay tint. Brisha (looping VP9-alpha webm)
 * sits top-left; Andrew (static transparent PNG cutout) hangs bottom-right.
 * Both render above the CRT scanline overlay so nothing tints them.
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

  const dropClass =
    'block w-full h-auto object-contain relative z-[70]';

  return (
    <section className="relative py-16 md:py-24 border-b border-border">
      <div className="section-container">
        <div className="relative md:min-h-[520px]">
          {/* Brisha — top-left, looping video */}
          <button
            type="button"
            onClick={playDogh}
            aria-label="Брыша"
            className="group md:absolute md:top-0 md:left-0 w-full md:w-[44%] mb-8 md:mb-0"
            style={{ filter: 'none', display: 'block' }}
          >
            <video
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              poster={brishaPoster}
              className={dropClass}
              width={1920}
              height={1080}
              style={{ filter: 'none' }}
            >
              <source src={brishaWebm} type="video/webm" />
              <source src={brishaMp4} type="video/mp4" />
            </video>
          </button>

          {/* Andrew — bottom-right, static cutout */}
          <a
            href={andrewLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Andrew"
            className="group md:absolute md:bottom-0 md:right-0 w-full md:w-[44%]"
            style={{ filter: 'none', display: 'block' }}
          >
            <img
              src={andrewCutout}
              alt="Andrew"
              loading="lazy"
              decoding="async"
              className={dropClass}
              style={{ filter: 'none' }}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlaceholders;
