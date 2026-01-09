import { motion } from 'framer-motion';
import { MousePointer } from 'lucide-react';

interface PlaceholderProps {
  onClick?: () => void;
  className?: string;
}

const Placeholder = ({ onClick, className }: PlaceholderProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-border/60 hover:bg-card/50 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
        <MousePointer className="w-6 h-6" />
        <span className="text-xs font-medium">GIF / Image</span>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-border/50 group-hover:border-muted-foreground/50 transition-colors" />
      <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-border/50 group-hover:border-muted-foreground/50 transition-colors" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-border/50 group-hover:border-muted-foreground/50 transition-colors" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-border/50 group-hover:border-muted-foreground/50 transition-colors" />
    </motion.button>
  );
};

const InteractivePlaceholders = () => {
  const handleLeftClick = () => {
    console.log('Left placeholder clicked');
    // Can be replaced with actual functionality
  };

  const handleRightClick = () => {
    console.log('Right placeholder clicked');
    // Can be replaced with actual functionality
  };

  return (
    <section className="relative py-8 md:py-12">
      <div className="section-container">
        <div className="flex justify-between items-center">
          {/* Left placeholder - positioned with offset from edge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="ml-4 md:ml-8"
          >
            <Placeholder onClick={handleLeftClick} />
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
            <Placeholder onClick={handleRightClick} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlaceholders;
