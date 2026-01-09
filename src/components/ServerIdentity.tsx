import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import logo from '@/assets/logo.png';

const ServerIdentity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="server" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Subtle background - no purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5">
        <div className="w-full h-full bg-gradient-radial from-white/20 via-white/5 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Logo - no glow effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <img
                src={logo}
                alt="FSR-95 Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left max-w-lg"
          >
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              FSR-95
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Место, где рождается творчество и создаются крепкие дружеские связи. 
              Мы больше, чем просто Discord-сервер — мы семья единомышленников, 
              объединённых страстью к музыке, играм и искусству.
            </p>

            <motion.div 
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { emoji: '🎵', label: 'Музыка' },
                { emoji: '🎮', label: 'Игры' },
                { emoji: '🎨', label: 'Искусство' },
                { emoji: '💬', label: 'Общение' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:border-foreground/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  {item.emoji} {item.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServerIdentity;
