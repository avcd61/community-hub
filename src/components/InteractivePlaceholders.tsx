import { motion } from 'framer-motion';
import { MousePointer } from 'lucide-react';
import Andrew from '@/assets/Andrew.gif';
import Brisha from '@/assets/Brisha.gif';
import Dogh from '@/assets/Dogh.mp4';

interface PlaceholderProps {
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Placeholder = ({ src, onClick, href, className }: PlaceholderProps & { src?: string }) => {
  return (  
    <motion.button
      onClick={() => {
        if (onClick) return onClick();
        if (href) window.open(href, '_blank');
      }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {src ? (
        <img src={src} alt="GIF" className="w-full h-full object-cover rounded-2xl" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
          <MousePointer className="w-6 h-6" />
          <span className="text-xs font-medium">GIF / Image</span>
        </div>
      )}
    </motion.button>
  );
};

const InteractivePlaceholders = () => {
  const andrewLink = 'https://www.youtube.com/@ФСР95';
 

  return (
    <section className="relative py-8 md:py-12">
      {/* Background gradient - same as rest of site */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      <div className="section-container relative z-10">
        <div className="flex justify-between items-center gap-20 md:gap-32 lg:gap-48">
          {/* Left placeholder - positioned with offset from edge */}
            <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="ml-4 md:ml-8"
          >
              <Placeholder
                src={Brisha}
                onClick={() => {
                  const audio = new Audio(Dogh);
                  audio.play();
                }}
              />
          </motion.div>

          {/* Center space - can be used for decorative elements */}
          <div className="flex-1" />

          {/* Right placeholder - positioned with offset from edge */}
            <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mr-4 md:mr-8"
          >
            <Placeholder src={Andrew} href={andrewLink} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlaceholders;
