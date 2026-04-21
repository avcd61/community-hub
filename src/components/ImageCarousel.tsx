import React, { useState } from 'react';

import { useReveal } from '@/hooks/use-reveal';
import '../styles/carousel.css';

interface CarouselImage {
  id: number;
  url: string;
  title: string;
  link?: string;
}

/**
 * "Fedot per day" — 3D CSS carousel. The rotation is pure CSS animation, we
 * only track which image index is showing centered for UI labels. No
 * framer-motion runtime; all appearance is CSS.
 */
const ImageCarousel: React.FC = () => {
  const sadaImages: CarouselImage[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    url: `/sada/${i + 1}.webp`,
    title: `FEDOT_${String(i + 1).padStart(2, '0')}`,
  }));

  const [images] = useState<CarouselImage[]>(sadaImages);
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="carousel" className="relative py-20 md:py-28 border-b border-border overflow-hidden">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow">№ 06 / REEL</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            [{images.length.toString().padStart(2, '0')}_FRAMES_LOADED]
          </span>
        </div>

        <div ref={ref} className="reveal">
          <h2 className="display-xl text-foreground mb-4">
            ФЕДОТ <span className="text-primary">НА КАЖДЫЙ ДЕНЬ</span>
          </h2>
          <p className="max-w-2xl text-foreground/80 text-base md:text-lg mb-10">
            Бесконечная лента кадров. Вращается сама — садись и смотри.
          </p>
        </div>
      </div>

      <div className="carousel-container">
        <div className="carousel">
          <div className="carousel-control-button left">
            <input type="radio" name="carousel-control-input" aria-label="Rotate left" />
          </div>
          <div className="carousel-control-button right">
            <input type="radio" name="carousel-control-input" defaultChecked aria-label="Rotate right" />
          </div>

          <div className="carousel-rotation-direction">
            <ul
              className="carousel-item-wrapper"
              style={{ '--_num-elements': images.length } as React.CSSProperties}
            >
              {images.map((image, index) => (
                <li
                  key={image.id}
                  className="carousel-item"
                  style={
                    {
                      '--_index': index + 1,
                      '--_image-url': `url('${image.url}')`,
                    } as React.CSSProperties
                  }
                >
                  <a href={image.link} target="_blank" rel="noopener noreferrer">
                    {image.title}
                  </a>
                </li>
              ))}
              <li className="carousel-ground" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
