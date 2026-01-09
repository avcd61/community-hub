import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import album1 from '@/assets/album-1.jpg';
import album2 from '@/assets/album-2.jpg';
import album3 from '@/assets/album-3.jpg';
import album4 from '@/assets/album-4.jpg';
import album5 from '@/assets/album-5.jpg';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  tracks: string[];
}

const albums: Album[] = [
  {
    id: 1,
    title: 'Midnight Echoes',
    artist: 'FSR-95 Collective',
    cover: album1,
    tracks: ['Intro', 'Neon Dreams', 'Void Walker', 'Digital Rain', 'Outro'],
  },
  {
    id: 2,
    title: 'Synthwave City',
    artist: 'SoundMaster',
    cover: album2,
    tracks: ['City Lights', 'Retrograde', 'Pulse', 'Highway', 'Sunset Drive'],
  },
  {
    id: 3,
    title: 'Cloud Nine',
    artist: 'Luna',
    cover: album3,
    tracks: ['Ascending', 'Floating', 'Dreamscape', 'Above the Sky', 'Return'],
  },
  {
    id: 4,
    title: 'Thunder',
    artist: 'NightWolf',
    cover: album4,
    tracks: ['Storm Approaching', 'Lightning', 'Rain Dance', 'Thunder Rolls', 'Calm After'],
  },
  {
    id: 5,
    title: 'Frequency',
    artist: 'FSR-95 Collective',
    cover: album5,
    tracks: ['Signal', 'Wavelength', 'Resonance', 'Amplitude', 'Transmission'],
  },
];

const MusicSection = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([30]);
  const [volume, setVolume] = useState([70]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const openPlayer = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentTrack(0);
    setIsPlaying(false);
    setProgress([0]);
  };

  const closePlayer = () => {
    setSelectedAlbum(null);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (selectedAlbum) {
      setCurrentTrack((prev) =>
        prev < selectedAlbum.tracks.length - 1 ? prev + 1 : 0
      );
      setProgress([0]);
    }
  };

  const prevTrack = () => {
    if (selectedAlbum) {
      setCurrentTrack((prev) =>
        prev > 0 ? prev - 1 : selectedAlbum.tracks.length - 1
      );
      setProgress([0]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
  };

  return (
    <section id="music" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Наши альбомы
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Музыка, созданная нашим сообществом с любовью и страстью
          </p>
        </motion.div>

        {/* Albums Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {albums.map((album) => (
            <motion.div
              key={album.id}
              variants={itemVariants}
              onClick={() => openPlayer(album)}
              className="group cursor-pointer"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-card transition-all duration-300 group-hover:border-border">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-6 h-6 fill-background text-background ml-1" />
                  </motion.div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-display font-semibold text-sm md:text-base text-foreground group-hover:text-foreground transition-colors">
                  {album.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  {album.artist}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Music Player Modal */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
            onClick={closePlayer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-md p-6 rounded-3xl border border-border"
            >
              {/* Close Button */}
              <button
                onClick={closePlayer}
                className="absolute top-4 right-4 p-2 rounded-full bg-card hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Album Cover */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 border border-border">
                <img
                  src={selectedAlbum.cover}
                  alt={selectedAlbum.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Album Info */}
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl font-bold mb-1 text-foreground">
                  {selectedAlbum.title}
                </h3>
                <p className="text-muted-foreground">{selectedAlbum.artist}</p>
              </div>

              {/* Current Track */}
              <div className="text-center mb-4">
                <span className="text-sm text-foreground font-medium">
                  {currentTrack + 1}. {selectedAlbum.tracks[currentTrack]}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1:23</span>
                  <span>3:45</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.button
                  onClick={prevTrack}
                  className="p-3 rounded-full bg-card hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 rounded-full bg-foreground text-background hover:scale-105 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </motion.button>
                <motion.button
                  onClick={nextTrack}
                  className="p-3 rounded-full bg-card hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              {/* Download Button */}
              <Button variant="outline" className="w-full border-border hover:border-foreground/30">
                <Download className="w-4 h-4 mr-2" />
                Скачать альбом
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MusicSection;
