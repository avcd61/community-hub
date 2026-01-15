import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/carousel.css';

interface CarouselImage {
  id: number;
  url: string;
  title: string;
  link?: string;
}

const ImageCarousel: React.FC = () => {
  const sadaImages: CarouselImage[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    url: `/sada/${i + 1}.png`,
    title: `Photo ${i + 1}`,
  }));

  const [images] = useState<CarouselImage[]>(sadaImages);

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <motion.h2 
          className="carousel-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            initial: { duration: 0.6 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          viewport={{ once: true }}
        >
          Федот на каждый день
        </motion.h2>
      </div>
      <div className="carousel">
        <div className="carousel-control-button left">
          <input type="radio" name="carousel-control-input" />
        </div>
        <div className="carousel-control-button right">
          <input type="radio" name="carousel-control-input" defaultChecked />
        </div>

        <div className="carousel-rotation-direction">
          <ul className="carousel-item-wrapper" style={{ '--_num-elements': images.length } as React.CSSProperties}>
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
            <li className="carousel-ground"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
