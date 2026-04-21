import { useRef } from 'react';

import andrewMp4 from '@/assets/Andrew.mp4';
import andrewWebm from '@/assets/Andrew.webm';
import andrewPoster from '@/assets/Andrew.webp';
import brishaMp4 from '@/assets/Brisha.mp4';
import brishaWebm from '@/assets/Brisha.webm';
import brishaPoster from '@/assets/Brisha.webp';
import doghAudio from '@/assets/Dogh.mp4';

/**
 * Bare video drops — no frames, no labels, no captions. Two looping
 * videos placed in opposite corners: Brisha top-left, Andrew bottom-right.
 * Tap Brisha to play the Dogh sting; tap Andrew to jump to YouTube.
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
        <div className="relative min-h-[360px] md:min-h-[520px]">
          {/* Brisha — top-left */}
          <button
            type="button"
            onClick={playDogh}
            aria-label="Брыша"
            className="group block md:absolute md:top-0 md:left-0 w-full md:w-[44%] mb-8 md:mb-0"
          >
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
          </button>

          {/* Andrew — bottom-right */}
          <a
            href={andrewLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Andrew"
            className="group block md:absolute md:bottom-0 md:right-0 w-full md:w-[44%]"
          >
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlaceholders;
