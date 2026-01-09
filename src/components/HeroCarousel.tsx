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
  buttonUrl: string;
  buttonText: string;
}

const members: Member[] = [
  {
    id: 1,
    name: 'Дискорд сервер',
    role: 'Обитель завозов',
    quote: 'В этом месте сидят 95 братухи и делают завозы каждый день',
    avatar: member1,
    buttonUrl: 'https://discord.com/invite/PNnSKWNhYE',
    buttonText: 'Присоединиться к серверу',
  },
  {
    id: 2,
    name: 'Ютуб канал 95 братко',
    role: 'Фильмы достойные оскара',
    quote: 'Лучший ютуб канал стоящий на уровне мистера Макса и мисс Кейти',
    avatar: member2,
    buttonUrl: 'https://www.youtube.com/@ФСР95',
    buttonText: 'Перейти на канал',
  },
  {
    id: 3,
    name: 'Отрицательно живая группа стим',
    role: 'Там есть докич',
    quote: 'Группа 95 братко в стиме где нет актива но есть докич',
    avatar: member3,
    buttonUrl: 'https://steamcommunity.com/groups/FRSOOfficial',
    buttonText: 'Посетить кладбище',
  },
  {
    id: 4,
    name: 'Труха 95',
    role: '95 кружков жратвы бульменя',
    quote: 'Здесь показана жизнь и быт ФСРа ну и ещё как бульмень готовит',
    avatar: member4,
    buttonUrl: 'https://t.me/+abSXXaH4cf9hNTky',
    buttonText: 'Залететь в труху',
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setDirection(1);
  //     setCurrentIndex((prev) => (prev + 1) % members.length);
  //   }, 6000);
  //   return () => clearInterval(timer);
  // }, []);

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient - no purple glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Subtle animated background element - neutral */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(0 0% 100% / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="section-container relative z-10 py-20">
        <motion.div
          drag="x"
          dragElastic={0.08}
          dragMomentum={false}
          dragConstraints={{ left: -120, right: 120 }}
          onDragEnd={(e, info) => {
            const threshold = 80; // px
            if (info.offset.x > threshold) navigate(-1);
            else if (info.offset.x < -threshold) navigate(1);
          }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh] select-none"
        >
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
                  {/* Subtle neutral glow instead of purple */}
                  <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />
                  <img
                    src={currentMember.avatar}
                    alt={currentMember.name}
                    draggable={false}
                    className="relative w-full h-full object-cover rounded-full border-2 border-border/50 shadow-[0_0_60px_hsl(0_0%_100%/0.1)] select-none"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left select-none">
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
                  className="inline-block px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-6 border border-border/50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentMember.role}
                </motion.span>

                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                  {currentMember.name}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0">
                  "{currentMember.quote}"
                </p>

                <Button
                  variant="default"
                  size="xl"
                  className="group bg-foreground text-background hover:bg-foreground/90 select-none"
                  onClick={() => {
                    if (currentMember.buttonUrl) {
                      window.open(currentMember.buttonUrl, '_blank', 'noopener');
                    }
                  }}
                >
                  <span>{currentMember.buttonText}</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <motion.button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2">
            {members.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-foreground w-8'
                    : 'bg-muted hover:bg-muted-foreground w-2.5'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={() => navigate(1)}
            className="p-3 rounded-full bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-foreground" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
