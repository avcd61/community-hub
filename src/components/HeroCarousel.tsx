import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import member1 from '@/assets/member-1.jpg';
import member2 from '@/assets/member-2.jpg';
import member3 from '@/assets/member-3.jpg';
import member4 from '@/assets/member-4.jpg';

interface Member {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const members: Member[] = [
  {
    id: 1,
    name: 'NightWolf',
    role: 'Основатель',
    quote: 'Создаём атмосферу, где каждый чувствует себя дома',
    avatar: member1,
  },
  {
    id: 2,
    name: 'Luna',
    role: 'Креативный директор',
    quote: 'Музыка объединяет, искусство вдохновляет',
    avatar: member2,
  },
  {
    id: 3,
    name: 'SoundMaster',
    role: 'Музыкальный продюсер',
    quote: 'Каждый трек — это история нашего сообщества',
    avatar: member3,
  },
  {
    id: 4,
    name: 'PixelDream',
    role: 'Модератор',
    quote: 'Комьюнити — это семья, которую мы выбираем',
    avatar: member4,
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % members.length;
      }
      return prev === 0 ? members.length - 1 : prev - 1;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentMember = members[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Animated background glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(263 80% 50% / 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="section-container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Avatar */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentMember.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-50 blur-2xl animate-pulse-glow" />
                  <img
                    src={currentMember.avatar}
                    alt={currentMember.name}
                    className="relative w-full h-full object-cover rounded-full border-4 border-primary/30 shadow-[0_0_60px_hsl(263_80%_60%/0.3)]"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentMember.id}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentMember.role}
                </motion.span>

                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
                  {currentMember.name}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0">
                  "{currentMember.quote}"
                </p>

                <Button variant="hero" size="xl" className="group">
                  <span>Присоединиться</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {members.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate(1)}
            className="p-3 rounded-full bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
