import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import album1 from '@/assets/BulimPenis.png';
import album2 from '@/assets/album-2.jpg';
import album3 from '@/assets/gtabulib.png';
import album4 from '@/assets/1.png';
import album5 from '@/assets/Echo95.gif';

// Normalized track and album types
type Track = { title: string; file?: string };

interface AlbumType {
  id: number;
  title: string;
  artist: string;
  cover: string;
  description?: string;
  tracks: Track[];
  basePath?: string;
  folder?: string;
}

// Helper to normalize mixed track entries (string | {title,file})
const createAlbum = (
  id: number,
  title: string,
  artist: string,
  description: string | undefined,
  cover: string,
  rawTracks: Array<string | { title: string; file?: string }>,
  basePath = '/music/',
  folder?: string
): AlbumType => {
  const normalize = (entry: string | { title: string; file?: string }): Track => {
    if (typeof entry === 'string') {
      const t = entry;
      // Build file location: basePath + folder + title (no URL encoding — files have real Unicode names)
      const folderPath = folder ? `${folder}/` : '';
      const file = `${basePath}${folderPath}${t}.mp3`;
      return { title: t, file };
    }
    return { title: entry.title, file: entry.file };
  };

  return {
    id,
    title,
    artist,
    description,
    cover,
    tracks: rawTracks.map(normalize),
    basePath,
    folder,
  };
};

// Albums created with the utility — this follows the structure you provided
const albums: AlbumType[] = [
  createAlbum(
    1,
    'BulimPenis',
    '2095',
    'Первый эпический альбом BulimPenis, где исполнитель впервые сталкивается с тёмными силами и начинает свой путь борьбы с Сатаной.',
    album1,
    [
      { title: 'BulimPenis part 1', file: '/music/BulimPenis1.mp3' },
      'BulimPenis part 2',
      'BulimPenis part 3'
    ],
    '/music/',
    'Album1'
  ),
  createAlbum(
    2,
    'БулимХач',
    '2025',
    'Жизнь БулимПениса',
    album2,
    [
      'Взрыв Бани',
      'Взрыв Бани v2',
      { title: 'БулимКиборг-Т95', file: '/music/БулимКиборг-Т95.mp3' },
      { title: 'Булимпэнис и Андрей БО СИН', file: '/music/Булимпэнис и Андрей БО СИН.mp3' }
    ],
    '/music/',
    'Album2'
  ),
  createAlbum(
    3,
    'Бульменизм',
    '2025',
    'Ода величию Булимпэниса, который превратил свою жизнь в легенду!.',
    album3,
    [
      { title: 'Братва из Крапоткина', file: '/music/Братва из Крапоткина.mp3' },
      { title: 'Бульменизм', file: '/music/Album3/Бульменизм.MP3' },
      { title: 'Армянский закон (feat. Слава КПСС)', file: '/music/Армянский закон(feat. Слава КПСС, Поп Жозя).MP3' },
      { title: 'Бульминатор (моя судьба)', file: '/music/Бульминатор (моя судьба).mp3' },
      { title: 'Базар держу (feat. Татарский Мишка Фредди, URA)', file: '/music/Базар держу (feat. Татарский Мишка Фредди, URA).MP3' },
      { title: 'Интро Бульминатор грядет…', file: '/music/Album3/Интро Бульминатор грядет….mp3' },
      { title: 'Дьявол сбежал', file: '/music/Дьявол сбежал.MP3' },
      { title: 'Живой, как Цой', file: '/music/Живой, как Цой.mp3' },
      { title: 'Отцы и братва (feat. Саня Русов)', file: '/music/Отцы и братва (feat. Саня Русов).mp3' },
      { title: 'Шаурма и закон…', file: '/music/Шаурма и закон.mp3' },
      { title: 'Бенито Бенито!', file: '/music/Бенито Бенито!.mp3' },
      { title: 'Кто тут главный!', file: '/music/Кто тут главный!.mp3' }
    ],
    '/music/',
    'Album3'
  ),
  createAlbum(
    4,
    'Мартовский Разнос 95',
    '2025',
    'Первый весенний альбом!.',
    album4,
    [
      'Прогноз Погоды',
      { title: 'Любовь по понятиям (ft. ChozaMaestro, El Morgan)', file: '/music/Album4/Любовь по понятиям (ft. ChozaMaestro, El Morgan).mp3' },
      { title: 'Много любви (feat. Татарский Мишка Фредди)', file: '/music/Album4/3.mp3' },
      { title: 'Любовь враг? (featt. rostikfacekid)', file: '/music/Album4/12.mp3' },
      { title: 'Много лиц (feat. Playboi Carti)', file: '/music/Album4/Много лиц (feat. Playboi Carti).mp3' },
      { title: 'Весна (feat. URA, Татарский Мишка Фредди, Поп Жозя)', file: '/music/Album4/2.mp3' },
      'U luv',
      'НАСТЯ',
      { title: 'День как финал (feat. 5opka, Chief Keef)', file: '/music/Album4/День как финал (feat. 5opka, Chief Keef).mp3' },
      { title: 'Бандосы Тюльпановы (feat. Walter White, Мориарти)', file: '/music/Album4/Бандосы Тюльпановы (feat. Walter White, Мориарти).mp3' }
    ],
    '/music/',
    'Album4'
  ),
  createAlbum(
    5,
    'Эхо 95-го',
    '2026',
    'История альбома начинается с кассет, записанных в ЗАТО Кривой Рог - 95, закрытом городе, где в 90-е годы реальность смешивалась с тенями. Эти кассеты хранят голоса жителей — их боль, предательства и надежду, пропитанные философским осмыслением судьбы. В центре повествования — юноша, чей светлый дух разбивается, когда 2 марта он узнаёт настоящую правду. Его путь проходит через уличные разборки Крапоткина, где он сталкивается с мафиозным миром тёмное прошлое криминального авторитета в уральском ОПГ и иллюзии, которые разрушают всё вокруг. Кассеты становятся его проводником: они шепчут о предательстве в самом ЗАТО, где имена, звучащие как эхо тьмы, плетут заговоры, но также обещают свет в конце пути.',
    album5,
    [
      { title: 'Эхо призыва', file: '/music/Album5/Эхо призыва.mp3' },
      { title: 'Иллюзия Теней', file: '/music/Album5/Иллюзия Теней.mp3' },
      { title: 'Свет после вихря', file: '/music/Album5/Свет после вихря.MP3' },
      { title: 'Тень уральского камня', file: '/music/Album5/Тень уральского камня.MP3' },
      { title: 'Рушано Диоса', file: '/music/Album5/Рушано Диоса.MP3' },
      { title: 'Тихая ночь', file: '/music/Album5/Тихая ночь.MP3' },
      { title: 'Тысяча рук', file: '/music/Album5/Тысяча рук.MP3' },
      { title: 'ЙОТОВ (feat. LTA)', file: '/music/Album5/ЙОТОВ (feat. LTA).MP3' },
      { title: 'Мои пацаны', file: '/music/Album5/Мои пацаны.MP3' },
      { title: 'Ночное спасение', file: '/music/Album5/Ночное спасение.MP3' },
      { title: 'Притча о ковбое', file: '/music/Album5/Притча о ковбое.MP3' },
      { title: '95 kill', file: '/music/Album5/95 kill.MP3' },
      { title: 'EVIL MARKIZ', file: '/music/Album5/EVIL MARKIZ.MP3' },
      { title: 'GTA', file: '/music/Album5/GTA.MP3' },
      { title: 'La Passiono', file: '/music/Album5/La Passiono.MP3' },
      { title: 'Босинизм', file: '/music/Album5/Босинизм.MP3' },
      { title: 'Булимитович', file: '/music/Album5/Булимитович.MP3' },
      { title: 'Декстер', file: '/music/Album5/Декстер.MP3' },
      { title: 'Что с нами блять не так', file: '/music/Album5/Что с нами блять не так.MP3' },
      { title: 'звуки последних мёртвых кассет', file: '/music/Album5/звуки последних мёртвых кассет.MP3' }
    ],
    '/music/',
    'Album5'
  ),
];

// Build a map of available mp3 asset URLs using Vite's import.meta.glob
const modules = import.meta.glob('../assets/music/*/*.{mp3,MP3}', { eager: true }) as Record<string, any>;
const assetMap: Record<string, string> = {};
for (const p in modules) {
  const mod = modules[p];
  const url: string = (mod && mod.default) || mod;
  // basename without extension
  const parts = p.split('/');
  const filename = parts[parts.length - 1];
  const nameNoExt = filename.replace(/\.[^/.]+$/, '');
  const folder = parts[parts.length - 2] || '';

  // Store multiple key variants
  assetMap[filename] = url;
  assetMap[nameNoExt] = url;
  assetMap[encodeURIComponent(nameNoExt)] = url;

  // Store foldered variants
  if (folder) {
    assetMap[`${folder}/${filename}`] = url;
    assetMap[`${folder}/${nameNoExt}`] = url;
    assetMap[`/music/${folder}/${filename}`] = url;
    assetMap[`/music/${folder}/${nameNoExt}`] = url;
    assetMap[`music/${folder}/${filename}`] = url;
    assetMap[`music/${folder}/${nameNoExt}`] = url;
  }
}
console.log('🗂️ Asset map sample keys:', Object.keys(assetMap).slice(0, 20));

// Resolve album track file URLs: prefer explicit file, otherwise try matching by title
for (const album of albums) {
  for (let i = 0; i < album.tracks.length; i++) {
    const track = album.tracks[i];
    if (!track.file) continue;

    // First try full path (e.g., /music/Album5/file.mp3)
    const fullPath = track.file.replace(/^\//, ''); // remove leading /
    if (assetMap[fullPath]) {
      track.file = assetMap[fullPath];
      continue;
    }
    if (assetMap[track.file]) {
      track.file = assetMap[track.file];
      continue;
    }

    // Then try basename
    const parts = track.file.split('/').filter(Boolean);
    const basename = parts[parts.length - 1];
    if (assetMap[basename]) {
      track.file = assetMap[basename];
      continue;
    }
    const nameNoExt = basename.replace(/\.[^/.]+$/, '');
    if (assetMap[nameNoExt]) {
      track.file = assetMap[nameNoExt];
      continue;
    }

    // Try to match by title
    const titleKey = track.title;
    if (assetMap[titleKey]) {
      track.file = assetMap[titleKey];
      continue;
    }

    // Fuzzy match: try to find a filename in the same folder that contains the title (normalized)
    if (album.folder) {
      const folder = album.folder;
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9а-яё0-9]+/gi, '');
      const titleNorm = norm(track.title || '');
      if (titleNorm) {
        // check keys that belong to this folder
        const folderKeys = Object.keys(assetMap).filter((k) => {
          return k.includes(`${folder}/`) || k.includes(`/music/${folder}/`) || k.startsWith(`${folder}/`);
        });
        let matched = false;
        for (const k of folderKeys) {
          const name = k.split('/').pop() || k;
          const nameNoExt = name.replace(/\.[^/.]+$/, '');
          const nameNorm = norm(nameNoExt);
          if (!nameNorm) continue;
          if (nameNorm.includes(titleNorm) || titleNorm.includes(nameNorm)) {
            track.file = assetMap[k];
            matched = true;
            console.log(`✓ Fuzzy matched ${track.title} -> ${k}`);
            break;
          }
        }
        if (matched) continue;
      }
    }

    // Last resort: if the track is a string and has no explicit file, try to find by index
    // For example, if track is "BulimPenis part 2" (i=1), look for "2.mp3" or "Album1/2.mp3"
    if (album.folder) {
      // Try indexed files (2.mp3 for second track, 3.mp3 for third, etc.)
      const idx = i + 1;
      const indexedKey = `${album.folder}/${idx}.mp3`;
      if (assetMap[indexedKey]) {
        track.file = assetMap[indexedKey];
        console.log(`✓ Matched ${track.title} by index: ${indexedKey}`);
        continue;
      }
    }
  }
}

// Fallback: assign unresolved tracks to remaining files in the album folder (sequential)
for (const album of albums) {
  if (!album.folder) continue;
  // collect all asset keys that belong to this folder and end with .mp3
  const folderKeys = Object.keys(assetMap).filter((k) => {
    return k.includes(`${album.folder}/`) || k.includes(`/music/${album.folder}/`) || k.startsWith(`${album.folder}/`);
  }).filter((k) => /\.(mp3|MP3)$/.test(k));

  // map keys to unique URLs and basenames
  const fileEntries = folderKeys.map((k) => ({ key: k, url: assetMap[k], name: k.split('/').pop() }));

  // exclude already assigned URLs
  const assigned = new Set(album.tracks.map((t) => t.file).filter(Boolean));
  const available = fileEntries.filter((e) => !assigned.has(e.url));

  let ai = 0;
  for (const track of album.tracks) {
    if (!track.file || track.file.startsWith('/music/')) {
      if (ai < available.length) {
        track.file = available[ai].url;
        console.log(`→ Assigned fallback ${track.title} -> ${available[ai].key}`);
        ai++;
      }
    }
  }
}

// Debug: log which tracks have unresolved files
albums.forEach((album) => {
  album.tracks.forEach((track) => {
    if (!track.file || (typeof track.file === 'string' && track.file.startsWith('/music/'))) {
      console.warn(`⚠️  Track not resolved: ${album.title} - ${track.title}`, track.file);
    }
  });
});

const MusicSection = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([30]);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const lastProgressEmitTimeRef = useRef<number>(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const openPlayer = (album: AlbumType) => {
    setSelectedAlbum(album);
    setCurrentTrack(0);
    setIsPlaying(false);
    setProgress([0]);
  };

  const closePlayer = () => {
    setSelectedAlbum(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
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

  const formatTime = (s: number) => {
    if (!s || s <= 0) return '0:00';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // Sync audio element when track/album/playing/volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const track = selectedAlbum?.tracks[currentTrack];
    if (track?.file && audio.src !== track.file) {
      console.log(`🎵 Loading: ${selectedAlbum?.title} - ${track.file}`);
      audio.src = track.file;
      audio.load();
      setProgress([0]);
      setDuration(0);
    }

    // don't set audio.volume here to avoid re-running this effect on volume change

    const onLoaded = () => {
      console.log(`✅ Loaded: duration ${audio.duration}s`);
      setDuration(Math.round(audio.duration || 0));
    };

    const onTime = () => {
      if (!audio.duration) return;
      // Throttle: only update progress every 500ms to avoid excessive updates
      const now = Date.now();
      if (now - lastProgressEmitTimeRef.current > 500) {
        const newProgress = Math.round((audio.currentTime / audio.duration) * 100);
        setProgress([newProgress]);
        lastProgressEmitTimeRef.current = now;
      }
    };

    const onEnded = () => {
      console.log(`⏭️  Track ended, next track`);
      nextTrack();
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);

    if (isPlaying) {
      console.log(`▶️  Playing`);
      audio.play().catch((err) => console.error('Play error:', err));
    } else {
      console.log(`⏸️  Paused`);
      audio.pause();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
    };
  }, [selectedAlbum, currentTrack, isPlaying]);

  // Apply volume changes to audio element without re-running the main audio effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = (volume[0] ?? 70) / 100;
  }, [volume]);

  // Seeking is disabled: progress slider is a read-only indicator of playback position.
  // If you want to enable seeking later, reintroduce logic to set audio.currentTime here.

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
  };

  const handleVolumeChange = (val: number[]) => {
    setVolume(val);
    const v = (val?.[0] ?? 70) / 100;
    if (audioRef.current) audioRef.current.volume = v;
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

              {/* Hidden audio element bound to tracks */}
              <audio ref={audioRef} />

              {/* Current Track */}
              <div className="text-center mb-4">
                <span className="text-sm text-foreground font-medium">
                  {currentTrack + 1}. {selectedAlbum.tracks[currentTrack]?.file?.split('/').pop()?.replace(/\.[^/.]+$/, '')}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={progress}
                  // Seeking disabled: slider is read-only indicator
                  onValueChange={() => {}}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{formatTime(Math.round((progress[0] / 100) * duration))}</span>
                  <span>{formatTime(duration)}</span>
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
                  onValueChange={handleVolumeChange}
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
