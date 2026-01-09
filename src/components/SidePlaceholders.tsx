import { motion } from 'framer-motion';

const SidePlaceholders = () => {
  return (
    <>
      {/* Left Side Placeholder */}
      <div className="fixed left-0 top-0 h-full w-12 lg:w-20 pointer-events-none z-40 hidden lg:block">
        <motion.div
          className="absolute top-1/4 left-2 w-8 h-32 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(180deg, hsl(263 80% 60% / 0.3) 0%, transparent 100%)',
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-4 w-6 h-24 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(180deg, hsl(280 90% 70% / 0.3) 0%, transparent 100%)',
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-2 w-4 h-16 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(263 80% 60% / 0.3) 100%)',
          }}
          animate={{
            y: [0, 10, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Right Side Placeholder */}
      <div className="fixed right-0 top-0 h-full w-12 lg:w-20 pointer-events-none z-40 hidden lg:block">
        <motion.div
          className="absolute top-1/3 right-2 w-8 h-32 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(280 90% 70% / 0.3) 100%)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-2/3 right-4 w-6 h-20 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(180deg, hsl(263 80% 60% / 0.3) 0%, transparent 100%)',
          }}
          animate={{
            y: [0, 15, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/4 right-3 w-5 h-14 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(280 90% 70% / 0.3) 0%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
      </div>
    </>
  );
};

export default SidePlaceholders;
