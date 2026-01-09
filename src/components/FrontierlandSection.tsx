import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import minecraft1 from '@/assets/minecraft-1.jpg';
import minecraft2 from '@/assets/minecraft-2.jpg';
import minecraft3 from '@/assets/minecraft-3.jpg';

const screenshots = [minecraft1, minecraft2, minecraft3];

const FrontierlandSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  return (
    <section id="frontierland" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background with subtle purple glow - KEPT for Frontierland */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        {/* Header - with purple accent for Frontierland */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Frontierland</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Наш уникальный Minecraft-сервер, где каждый может создать свою историю
            <span className="text-primary"> (администратор — AndrewHyper)</span>
          </p>
        </motion.div>

        {/* Screenshot Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-card border border-primary/20">
            {screenshots.map((screenshot, index) => (
              <motion.img
                key={index}
                src={screenshot}
                alt={`Frontierland screenshot ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/70 hover:border-primary/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/70 hover:border-primary/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Bottom-left description */}
            <motion.div 
              className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md p-4 rounded-xl bg-background/70 backdrop-blur-sm border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                Погрузитесь в мир безграничных возможностей. Стройте замки, 
                исследуйте подземелья, создавайте свою историю вместе с друзьями 
                в уникальной атмосфере нашего сервера.
              </p>
            </motion.div>
          </div>

          {/* Dots - with purple accent */}
          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary w-8'
                    : 'bg-muted hover:bg-muted-foreground w-2.5'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Features - with purple accents */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: '🏰', title: 'Эпические постройки', desc: 'Создавайте величественные сооружения' },
            { icon: '⚔️', title: 'PvE приключения', desc: 'Сражайтесь с уникальными боссами' },
            { icon: '🤝', title: 'Сообщество', desc: 'Находите друзей и союзников' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-2xl text-center hover:border-primary/30 transition-colors border border-border/50"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-display font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FrontierlandSection;
