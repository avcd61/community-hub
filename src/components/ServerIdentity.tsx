import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import logo from '@/assets/logo.png';

const ServerIdentity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="server" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20">
        <div className="w-full h-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl scale-150 animate-pulse-glow" />
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <img
                src={logo}
                alt="FSR-95 Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_40px_hsl(263_80%_60%/0.5)]"
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
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">FSR-95</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Место, где рождается творчество и создаются крепкие дружеские связи. 
              Мы больше, чем просто Discord-сервер — мы семья единомышленников, 
              объединённых страстью к музыке, играм и искусству.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
                🎵 Музыка
              </div>
              <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
                🎮 Игры
              </div>
              <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
                🎨 Искусство
              </div>
              <div className="px-4 py-2 rounded-full bg-card border border-border text-sm">
                💬 Общение
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServerIdentity;
