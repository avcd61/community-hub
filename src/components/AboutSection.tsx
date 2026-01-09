import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import member1 from '@/assets/member-1.jpg';
import member2 from '@/assets/member-2.jpg';
import member3 from '@/assets/member-3.jpg';
import member4 from '@/assets/member-4.jpg';

interface MemberCard {
  name: string;
  role: string;
  description: string;
  avatar: string;
}

const memberCards: MemberCard[] = [
  {
    name: 'NightWolf',
    role: 'Основатель',
    description: 'Визионер и душа сообщества. Создал FSR-95 как место для творческих людей.',
    avatar: member1,
  },
  {
    name: 'Luna',
    role: 'Креативный директор',
    description: 'Отвечает за визуальную идентичность и арт-направление всех проектов.',
    avatar: member2,
  },
  {
    name: 'SoundMaster',
    role: 'Музыкальный продюсер',
    description: 'Создаёт уникальное звучание сообщества и курирует музыкальные релизы.',
    avatar: member3,
  },
  {
    name: 'PixelDream',
    role: 'Модератор',
    description: 'Заботится о комфорте участников и поддерживает дружескую атмосферу.',
    avatar: member4,
  },
];

const stats = [
  { value: '1,500+', label: 'Участников' },
  { value: '3', label: 'Года вместе' },
  { value: '5', label: 'Альбомов' },
  { value: '24/7', label: 'Активность' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            О нас
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мы — сообщество творческих людей, объединённых любовью к музыке, играм и искусству
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 glass-card rounded-2xl hover:border-border transition-colors"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Member Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {memberCards.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="glass-card p-6 rounded-2xl h-full transition-all duration-300 hover:border-border">
                <motion.div 
                  className="relative w-20 h-20 mx-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="relative w-full h-full object-cover rounded-full border-2 border-border group-hover:border-foreground/30 transition-colors"
                  />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-display font-bold text-lg mb-1 text-foreground group-hover:text-foreground transition-colors">
                    {member.name}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium mb-3 border border-border/50">
                    {member.role}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
