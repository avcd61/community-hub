import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Download,
  X,
  Loader2,
  Check,
  ArrowUpRight,
  Minus,
  Maximize2,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { useReveal } from '@/hooks/use-reveal';

import album1 from '@/assets/BulimPenis.webp';
import album2 from '@/assets/album-2.webp';
import album3 from '@/assets/gtabulib.webp';
import album4 from '@/assets/1.webp';
import album5Mp4 from '@/assets/Echo95.mp4';
import album5Webm from '@/assets/Echo95.webm';
import album5Poster from '@/assets/Echo95.webp';
import album6 from '@/assets/16years.webp';
import nigorEggSound from '@/assets/nigor-egg.mp3';
import nigorEggCover from '@/assets/nigor-egg-cover.jpg';

type Track = { title: string; file?: string };

interface AlbumType {
  id: number;
  title: string;
  artist: string;
  cover: string;
  coverVideo?: { mp4: string; webm: string };
  description?: string;
  tracks: Track[];
  basePath?: string;
  folder?: string;
}

const createAlbum = (
  id: number,
  title: string,
  artist: string,
  description: string | undefined,
  cover: string,
  rawTracks: Array<string | { title: string; file?: string }>,
  basePath = '/music/',
  folder?: string,
  coverVideo?: { mp4: string; webm: string }
): AlbumType => {
  const normalize = (entry: string | { title: string; file?: string }): Track => {
    if (typeof entry === 'string') {
      const folderPath = folder ? `${folder}/` : '';
      return { title: entry, file: `${basePath}${folderPath}${entry}.mp3` };
    }
    return { title: entry.title, file: entry.file };
  };
  return {
    id,
    title,
    artist,
    description,
    cover,
    coverVideo,
    tracks: rawTracks.map(normalize),
    basePath,
    folder,
  };
};

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
      'BulimPenis part 3',
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
      { title: 'Булимпэнис и Андрей БО СИН', file: '/music/Булимпэнис и Андрей БО СИН.mp3' },
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
      { title: 'Кто тут главный!', file: '/music/Кто тут главный!.mp3' },
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
      { title: 'Бандосы Тюльпановы (feat. Walter White, Мориарти)', file: '/music/Album4/Бандосы Тюльпановы (feat. Walter White, Мориарти).mp3' },
    ],
    '/music/',
    'Album4'
  ),
  createAlbum(
    5,
    'Эхо 95-го',
    '2026',
    'История альбома начинается с кассет, записанных в ЗАТО Кривой Рог - 95, закрытом городе, где в 90-е годы реальность смешивалась с тенями.',
    album5Poster,
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
      { title: 'звуки последних мёртвых кассет', file: '/music/Album5/звуки последних мёртвых кассет.MP3' },
    ],
    '/music/',
    'Album5',
    { mp4: album5Mp4, webm: album5Webm }
  ),
  createAlbum(
    6,
    '16 лет',
    '95legend59',
    'Юбилейный завоз: три новых трека от 95legend59 — про сторублёвую Кропоткинскую, бабулю с лазерами и двухстволку Булимпэниса.',
    album6,
    [
      { title: 'Сто рублей', file: '/music/Album6/Сто рублей Кропоткино.mp3' },
      { title: 'Коко Рифф', file: '/music/Album6/Бабуля Коко Рифф.mp3' },
      { title: 'Двухстволка', file: '/music/Album6/Булимпенис Двухстволка.mp3' },
    ],
    '/music/',
    'Album6'
  ),
];

// --- MP3 asset resolution (unchanged from previous edition) ------------------
const modules = import.meta.glob('../assets/music/*/*.{mp3,MP3}', { eager: true }) as Record<
  string,
  { default?: string } | string
>;
const assetMap: Record<string, string> = {};
for (const p in modules) {
  const mod = modules[p];
  const url: string = typeof mod === 'string' ? mod : mod.default ?? '';
  const parts = p.split('/');
  const filename = parts[parts.length - 1];
  const nameNoExt = filename.replace(/\.[^/.]+$/, '');
  const folder = parts[parts.length - 2] || '';

  assetMap[filename] = url;
  assetMap[nameNoExt] = url;
  assetMap[encodeURIComponent(nameNoExt)] = url;

  if (folder) {
    assetMap[`${folder}/${filename}`] = url;
    assetMap[`${folder}/${nameNoExt}`] = url;
    assetMap[`/music/${folder}/${filename}`] = url;
    assetMap[`/music/${folder}/${nameNoExt}`] = url;
    assetMap[`music/${folder}/${filename}`] = url;
    assetMap[`music/${folder}/${nameNoExt}`] = url;
  }
}

for (const album of albums) {
  for (let i = 0; i < album.tracks.length; i++) {
    const track = album.tracks[i];
    if (!track.file) continue;

    const fullPath = track.file.replace(/^\//, '');
    if (assetMap[fullPath]) { track.file = assetMap[fullPath]; continue; }
    if (assetMap[track.file]) { track.file = assetMap[track.file]; continue; }

    const parts = track.file.split('/').filter(Boolean);
    const basename = parts[parts.length - 1];
    if (assetMap[basename]) { track.file = assetMap[basename]; continue; }
    const nameNoExt = basename.replace(/\.[^/.]+$/, '');
    if (assetMap[nameNoExt]) { track.file = assetMap[nameNoExt]; continue; }

    if (assetMap[track.title]) { track.file = assetMap[track.title]; continue; }

    if (album.folder) {
      const folder = album.folder;
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9а-яё0-9]+/gi, '');
      const titleNorm = norm(track.title || '');
      if (titleNorm) {
        const folderKeys = Object.keys(assetMap).filter((k) =>
          k.includes(`${folder}/`) || k.includes(`/music/${folder}/`) || k.startsWith(`${folder}/`)
        );
        for (const k of folderKeys) {
          const name = k.split('/').pop() || k;
          const nameNormK = norm(name.replace(/\.[^/.]+$/, ''));
          if (!nameNormK) continue;
          if (nameNormK.includes(titleNorm) || titleNorm.includes(nameNormK)) {
            track.file = assetMap[k];
            break;
          }
        }
      }
    }

    if (album.folder && (!track.file || track.file.startsWith('/music/'))) {
      const indexedKey = `${album.folder}/${i + 1}.mp3`;
      if (assetMap[indexedKey]) track.file = assetMap[indexedKey];
    }
  }
}

for (const album of albums) {
  if (!album.folder) continue;
  const folderKeys = Object.keys(assetMap).filter((k) =>
    (k.includes(`${album.folder}/`) || k.includes(`/music/${album.folder}/`) || k.startsWith(`${album.folder}/`)) &&
    /\.(mp3|MP3)$/.test(k)
  );
  const fileEntries = folderKeys.map((k) => ({ key: k, url: assetMap[k] }));
  const assigned = new Set(album.tracks.map((t) => t.file).filter(Boolean));
  const available = fileEntries.filter((e) => !assigned.has(e.url));
  let ai = 0;
  for (const track of album.tracks) {
    if (!track.file || track.file.startsWith('/music/')) {
      if (ai < available.length) {
        track.file = available[ai].url;
        ai++;
      }
    }
  }
}

// --- helpers -----------------------------------------------------------------

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s <= 0) return '0:00';
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

const safeFileName = (s: string) =>
  s.replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, ' ').trim();

// --- Visualizer --------------------------------------------------------------

/**
 * Canvas FFT bars synced to a shared AnalyserNode. The analyser is owned by
 * the Player component (one per audio element); this component just reads
 * frequency data and draws.
 */
const Visualizer = ({
  analyser,
  playing,
}: {
  analyser: AnalyserNode | null;
  playing: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      let data: Uint8Array | null = null;
      if (analyser) {
        data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
      }

      const bars = 64;
      const gap = 2;
      const barW = Math.max(1, (w - gap * (bars - 1)) / bars);

      for (let i = 0; i < bars; i++) {
        // Logarithmic mapping so bass doesn't hog the left side.
        const idx = Math.floor(Math.pow(i / bars, 1.6) * ((data?.length ?? 0) - 1));
        const v = data ? data[idx] / 255 : playing ? 0.2 + Math.random() * 0.15 : 0.05;
        const barH = Math.max(2, v * h * 0.95);
        const x = i * (barW + gap);
        const y = h - barH;
        ctx.fillStyle = 'hsl(42 20% 94%)';
        ctx.fillRect(x, y, barW, barH);
      }

      // Center waveform strand — thinner, overlaid.
      if (analyser) {
        const time = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(time);
        ctx.beginPath();
        ctx.strokeStyle = 'hsl(42 20% 94% / 0.45)';
        ctx.lineWidth = 1;
        for (let i = 0; i < time.length; i++) {
          const x = (i / time.length) * w;
          const y = (time[i] / 255) * h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [analyser, playing]);

  return <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />;
};

// --- Main section ------------------------------------------------------------

const MusicSection = () => {
  const [nigorEggOpen, setNigorEggOpen] = useState(false);
  const nigorEggAudioRef = useRef<HTMLAudioElement | null>(null);

  const triggerNigorEgg = () => {
    setNigorEggOpen(true);
    if (!nigorEggAudioRef.current) {
      const a = new Audio(nigorEggSound);
      a.preload = 'auto';
      nigorEggAudioRef.current = a;
    }
    const a = nigorEggAudioRef.current;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  const closeNigorEgg = () => {
    setNigorEggOpen(false);
    const a = nigorEggAudioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!nigorEggOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNigorEgg();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nigorEggOpen]);

  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  /*
    Modal visibility is decoupled from whether an album is loaded so that
    closing the big player keeps playback alive (mini player takes over).
  */
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  const [downloadState, setDownloadState] = useState<'idle' | 'fetching' | 'packing' | 'done' | 'error'>('idle');
  const [downloadProgress, setDownloadProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const sectionRef = useReveal<HTMLDivElement>();

  const ensureAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioCtxRef.current) {
      const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      if (!Ctx) return;
      const ctx = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.78;
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    }
    if (audioCtxRef.current.state === 'suspended') {
      void audioCtxRef.current.resume();
    }
  }, []);

  // Sync audio volume/muted state.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  /*
    Load a new track into the shared audio element ONLY when the
    album+track selection actually changes. Comparing against
    `audio.src` is unreliable because the browser serialises it to an
    absolute URL, so toggling play/pause used to look like a "new
    track" and reload the element — which reset currentTime to 0.
  */
  const loadedTrackRef = useRef<string | null>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedAlbum) return;
    const track = selectedAlbum.tracks[currentTrack];
    if (!track?.file) return;
    const key = `${selectedAlbum.id}:${currentTrack}:${track.file}`;
    if (loadedTrackRef.current !== key) {
      loadedTrackRef.current = key;
      audio.src = track.file;
      audio.load();
      setCurrentTime(0);
      setDuration(0);
      setAudioReady(false);
      if (isPlaying) {
        ensureAudioGraph();
        audio.play().catch(() => setIsPlaying(false));
      }
    }
  }, [selectedAlbum, currentTrack, isPlaying, ensureAudioGraph]);

  // Audio event listeners.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setAudioReady(true);
    };
    const onEnded = () => {
      if (!selectedAlbum) return;
      setCurrentTrack((i) => (i < selectedAlbum.tracks.length - 1 ? i + 1 : 0));
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [selectedAlbum]);

  // Keyboard shortcuts while player open.
  useEffect(() => {
    if (!selectedAlbum) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === 'Escape') {
        if (modalOpen) minimizePlayer();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight' && e.altKey) {
        e.preventDefault();
        nextAlbum();
      } else if (e.key === 'ArrowLeft' && e.altKey) {
        e.preventDefault();
        prevAlbum();
      } else if (e.key === 'ArrowRight' && e.shiftKey) {
        nextTrack();
      } else if (e.key === 'ArrowLeft' && e.shiftKey) {
        prevTrack();
      } else if (e.key === 'ArrowRight') {
        const a = audioRef.current;
        if (a) a.currentTime = Math.min((a.duration || 0), a.currentTime + 5);
      } else if (e.key === 'ArrowLeft') {
        const a = audioRef.current;
        if (a) a.currentTime = Math.max(0, a.currentTime - 5);
      } else if (e.key === 'm' || e.key === 'M') {
        setMuted((m) => !m);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedAlbum, modalOpen]);

  const openPlayer = (album: AlbumType) => {
    const sameAlbum = selectedAlbum?.id === album.id;
    if (!sameAlbum) {
      setSelectedAlbum(album);
      setCurrentTrack(0);
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
    setModalOpen(true);
    setDownloadState('idle');
  };
  /*
    Minimise the modal but keep audio + analyser + selection alive so the
    mini-player can drive playback from the corner.
  */
  const minimizePlayer = () => {
    setModalOpen(false);
    setDownloadState('idle');
  };
  const expandPlayer = () => {
    if (selectedAlbum) setModalOpen(true);
  };
  /* Fully stop and unload the shared audio element. */
  const stopPlayer = () => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.removeAttribute('src');
    }
    loadedTrackRef.current = null;
    setSelectedAlbum(null);
    setModalOpen(false);
    setIsPlaying(false);
    setDownloadState('idle');
  };
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    ensureAudioGraph();
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };
  const nextTrack = () => {
    if (!selectedAlbum) return;
    setCurrentTrack((i) => (i < selectedAlbum.tracks.length - 1 ? i + 1 : 0));
  };
  const prevTrack = () => {
    if (!selectedAlbum) return;
    setCurrentTrack((i) => (i > 0 ? i - 1 : selectedAlbum.tracks.length - 1));
  };
  const switchAlbum = (delta: -1 | 1) => {
    if (!selectedAlbum) return;
    const idx = albums.findIndex((a) => a.id === selectedAlbum.id);
    if (idx < 0) return;
    const next = albums[(idx + delta + albums.length) % albums.length];
    setSelectedAlbum(next);
    setCurrentTrack(0);
    setCurrentTime(0);
    setDuration(0);
  };
  const nextAlbum = () => switchAlbum(1);
  const prevAlbum = () => switchAlbum(-1);
  const seek = (pct: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    a.currentTime = (pct / 100) * a.duration;
  };

  // --- ZIP download --------------------------------------------------------
  const downloadAlbum = async () => {
    if (!selectedAlbum || downloadState === 'fetching' || downloadState === 'packing') return;
    const album = selectedAlbum;
    const tracks = album.tracks.filter((t) => !!t.file);
    if (!tracks.length) return;

    setDownloadState('fetching');
    setDownloadProgress({ done: 0, total: tracks.length });
    try {
      const zip = new JSZip();
      const folder = zip.folder(safeFileName(album.title)) ?? zip;

      for (let i = 0; i < tracks.length; i++) {
        const t = tracks[i];
        if (!t.file) continue;
        const res = await fetch(t.file);
        if (!res.ok) throw new Error(`Не удалось получить ${t.title}`);
        const buf = await res.arrayBuffer();
        const pad = String(i + 1).padStart(2, '0');
        folder.file(`${pad} — ${safeFileName(t.title)}.mp3`, buf);
        setDownloadProgress({ done: i + 1, total: tracks.length });
      }

      setDownloadState('packing');
      const blob = await zip.generateAsync({
        type: 'blob',
        compression: 'STORE', // mp3 is already compressed; no point in DEFLATE
      });
      saveAs(blob, `${safeFileName(album.title)}.zip`);
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 2500);
    } catch (err) {
      console.error('[album-download]', err);
      setDownloadState('error');
      setTimeout(() => setDownloadState('idle'), 3500);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const nowPlaying = selectedAlbum?.tracks[currentTrack];

  return (
    <section id="music" className="relative section-shell py-24 md:py-32">
      <div className="section-container">
        <div className="chapter-meta mb-8">
          <span>№ IV</span>
          <span className="opacity-50">/</span>
          <span>АЛЬБОМЫ</span>
          <button
            type="button"
            onClick={triggerNigorEgg}
            className="ml-auto opacity-50 hover:opacity-100 transition-opacity hidden sm:inline bg-transparent border-0 p-0 m-0 cursor-pointer text-inherit font-inherit tracking-inherit"
          >
            [НИГОР]
          </button>
        </div>

        <div ref={sectionRef} className="reveal">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
            <h2 className="display-xl text-balance">
              ЗВУК <span className="font-serif-italic text-foreground/80" style={{ fontStyle: 'italic' }}>девяносто</span> ПЯТОГО
            </h2>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {albums.length} альбома · {albums.reduce((s, a) => s + a.tracks.length, 0)} треков
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {albums.map((album, idx) => (
              <li
                key={album.id}
                className="relative group"
                style={{
                  animation: 'fade-up 0.7s cubic-bezier(0.2,0.9,0.2,1) both',
                  animationDelay: `${idx * 80}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => openPlayer(album)}
                  className="block w-full text-left"
                  aria-label={`Открыть альбом ${album.title}`}
                >
                  <div className="relative aspect-square border border-border overflow-hidden bg-card">
                    {album.coverVideo ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={album.cover}
                        className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                      >
                        <source src={album.coverVideo.webm} type="video/webm" />
                        <source src={album.coverVideo.mp4} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={album.cover}
                        alt={album.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                      />
                    )}
                    {/* corner ticks */}
                    <span className="pointer-events-none absolute -top-px -left-px w-4 h-4 border-t border-l border-foreground/80" />
                    <span className="pointer-events-none absolute -top-px -right-px w-4 h-4 border-t border-r border-foreground/80" />
                    <span className="pointer-events-none absolute -bottom-px -left-px w-4 h-4 border-b border-l border-foreground/80" />
                    <span className="pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b border-r border-foreground/80" />
                    {/* play hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/45 transition-colors duration-300">
                      <span className="w-14 h-14 border border-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-5 h-5 fill-foreground text-foreground translate-x-[1px]" />
                      </span>
                    </div>
                    {/* bottom strip */}
                    <div className="absolute bottom-0 inset-x-0 flex items-center justify-between bg-background/70 backdrop-blur-[2px] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/80">
                      <span>LP.0{album.id}</span>
                      <span>{album.tracks.length} TRK</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      LP.0{album.id}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {album.artist}
                    </span>
                  </div>
                  <div className="mt-1 font-display uppercase text-xl md:text-2xl leading-none tracking-[-0.02em]">
                    {album.title}
                  </div>
                  {album.description && (
                    <div className="mt-2 text-sm text-foreground/65 line-clamp-2">
                      {album.description}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Shared audio element lives under the section even when player is closed. */}
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" />

      {/* --- Player overlay -------------------------------------------------- */}
      {selectedAlbum && modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Плеер — ${selectedAlbum.title}`}
          className="fixed inset-0 z-[80] flex items-end md:items-center justify-center bg-background/75 backdrop-blur-sm animate-fade-in p-0 md:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) minimizePlayer();
          }}
        >
          <div className="relative w-full md:max-w-[1100px] h-[92vh] md:h-auto md:max-h-[85vh] bg-card border-t border-border md:border overflow-hidden grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            {/* LEFT — cover + transport */}
            <div className="relative bg-background border-b md:border-b-0 md:border-r border-border flex flex-col">
              {/* cover */}
              <div className="relative aspect-square w-full border-b border-border">
                {selectedAlbum.coverVideo ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={selectedAlbum.cover}
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={selectedAlbum.coverVideo.webm} type="video/webm" />
                    <source src={selectedAlbum.coverVideo.mp4} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedAlbum.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Visualizer overlayed at bottom — bars only visible while playing. */}
                <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3 h-16 opacity-90">
                    <Visualizer analyser={analyserRef.current} playing={isPlaying} />
                  </div>
                </div>
              </div>

              {/* meta */}
              <div className="p-5 border-b border-border">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={prevAlbum}
                    disabled={albums.length < 2}
                    className="w-9 h-9 shrink-0 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
                    aria-label="Предыдущий альбом"
                    title="Предыдущий альбом (Alt+←)"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      LP.0{selectedAlbum.id} · {selectedAlbum.artist} · {selectedAlbum.tracks.length} TRK
                    </div>
                    <div className="mt-1 font-display uppercase text-2xl leading-none tracking-[-0.02em] truncate">
                      {selectedAlbum.title}
                    </div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground truncate">
                      {nowPlaying?.title ?? '—'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={nextAlbum}
                    disabled={albums.length < 2}
                    className="w-9 h-9 shrink-0 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
                    aria-label="Следующий альбом"
                    title="Следующий альбом (Alt+→)"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* transport */}
              <div className="p-5 border-b border-border">
                {/* seek */}
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="w-10 text-foreground">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    disabled={!audioReady}
                    className="seek-range flex-1"
                    aria-label="Позиция трека"
                    style={{ '--val': `${progress}%` } as React.CSSProperties}
                  />
                  <span className="w-10 text-right">{formatTime(duration)}</span>
                </div>

                {/* buttons */}
                <div className="mt-5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevTrack}
                    className="w-11 h-11 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                    aria-label="Предыдущий"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex-1 h-11 border border-foreground bg-foreground text-background flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-200 hover:bg-transparent hover:text-foreground"
                    aria-label={isPlaying ? 'Пауза' : 'Играть'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-[1px]" />}
                    <span>{isPlaying ? 'Пауза' : 'Играть'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextTrack}
                    className="w-11 h-11 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                    aria-label="Следующий"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* volume */}
                <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    className="w-7 h-7 flex items-center justify-center text-foreground"
                    aria-label={muted ? 'Включить звук' : 'Выключить звук'}
                  >
                    {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setVolume(v);
                      if (v > 0 && muted) setMuted(false);
                    }}
                    className="seek-range flex-1"
                    aria-label="Громкость"
                    style={{ '--val': `${(muted ? 0 : volume) * 100}%` } as React.CSSProperties}
                  />
                  <span className="w-10 text-right text-foreground">
                    {Math.round((muted ? 0 : volume) * 100)}
                  </span>
                </div>
              </div>

              {/* download + close */}
              <div className="p-5 flex items-center gap-2 mt-auto">
                <button
                  type="button"
                  onClick={downloadAlbum}
                  disabled={downloadState === 'fetching' || downloadState === 'packing'}
                  className="flex-1 h-11 border border-border flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-200 hover:bg-foreground hover:text-background disabled:opacity-70 disabled:pointer-events-none"
                >
                  {downloadState === 'fetching' || downloadState === 'packing' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {downloadState === 'fetching'
                          ? `Загрузка · ${downloadProgress.done}/${downloadProgress.total}`
                          : 'Пакую ZIP…'}
                      </span>
                    </>
                  ) : downloadState === 'done' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Готово</span>
                    </>
                  ) : downloadState === 'error' ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Ошибка — попробуй ещё</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Скачать альбом (.zip)</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={minimizePlayer}
                  className="w-11 h-11 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                  aria-label="Свернуть плеер"
                  title="Свернуть (плеер продолжит играть)"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={stopPlayer}
                  className="w-11 h-11 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                  aria-label="Остановить и закрыть"
                  title="Остановить и закрыть"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT — track list */}
            <div className="relative overflow-y-auto">
              <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-5 py-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>трек-лист · {selectedAlbum.tracks.length}</span>
                <span>
                  <ArrowUpRight className="inline w-3 h-3 mr-1" />
                  SPACE = play/pause · ←/→ ±5s · shift+←/→ = prev/next
                </span>
              </div>
              <ol className="divide-y divide-border">
                {selectedAlbum.tracks.map((t, i) => {
                  const active = i === currentTrack;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => {
                          if (active) togglePlay();
                          else {
                            setCurrentTrack(i);
                            setIsPlaying(true);
                          }
                        }}
                        className={`w-full text-left flex items-center gap-4 px-5 py-4 transition-colors duration-150 ${
                          active ? 'bg-foreground text-background' : 'hover:bg-foreground/5'
                        }`}
                      >
                        <span className={`w-8 font-mono text-[11px] tabular-nums ${active ? 'text-background/70' : 'text-muted-foreground'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 min-w-0 truncate text-sm md:text-base">
                          {t.title}
                        </span>
                        <span className="flex items-center gap-3">
                          {active && isPlaying ? (
                            <span className="flex items-end gap-[2px] h-4" aria-hidden="true">
                              {[0, 1, 2, 3].map((k) => (
                                <span
                                  key={k}
                                  className="eq-bar"
                                  style={{
                                    height: '100%',
                                    color: 'currentColor',
                                    animationDelay: `${k * 120}ms`,
                                  }}
                                />
                              ))}
                            </span>
                          ) : active ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-3.5 h-3.5 opacity-40" />
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* --- Mini player (persists when modal is minimised) ------------------ */}
      {selectedAlbum && !modalOpen && (
        <div
          role="region"
          aria-label={`Мини-плеер — ${selectedAlbum.title}`}
          className="fixed z-[70] bottom-4 right-4 w-[min(92vw,340px)] bg-card border border-border shadow-[0_12px_40px_-12px_hsl(0_0%_0%/0.6)] animate-fade-in"
        >
          {/* Progress bar at top — click to seek. */}
          <button
            type="button"
            aria-label="Перемотка"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              seek(Math.max(0, Math.min(100, pct)));
            }}
            className="block w-full h-1 bg-border/60 relative overflow-hidden"
          >
            <span
              className="absolute inset-y-0 left-0 bg-foreground"
              style={{ width: `${progress}%` }}
            />
          </button>

          <div className="flex items-stretch gap-3 p-3">
            {/* Cover */}
            <button
              type="button"
              onClick={expandPlayer}
              className="relative w-14 h-14 shrink-0 overflow-hidden border border-border group"
              aria-label="Развернуть плеер"
              title="Развернуть плеер"
            >
              {selectedAlbum.coverVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={selectedAlbum.cover}
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={selectedAlbum.coverVideo.webm} type="video/webm" />
                  <source src={selectedAlbum.coverVideo.mp4} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={selectedAlbum.cover}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              )}
              {/* EQ overlay while playing */}
              {isPlaying && (
                <span className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-background/85 to-transparent flex items-end justify-center gap-[2px] pb-[3px]" aria-hidden="true">
                  {[0, 1, 2, 3].map((k) => (
                    <span
                      key={k}
                      className="eq-bar"
                      style={{ height: '100%', animationDelay: `${k * 120}ms` }}
                    />
                  ))}
                </span>
              )}
            </button>

            {/* Meta */}
            <button
              type="button"
              onClick={expandPlayer}
              className="flex-1 min-w-0 text-left"
              aria-label="Развернуть плеер"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground truncate">
                LP.0{selectedAlbum.id} · {selectedAlbum.artist}
              </div>
              <div className="mt-0.5 text-sm font-medium truncate">
                {nowPlaying?.title ?? selectedAlbum.title}
              </div>
              <div className="mt-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
                {formatTime(currentTime)} · {formatTime(duration)}
              </div>
            </button>

            {/* Transport + controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={prevAlbum}
                disabled={albums.length < 2}
                className="w-7 h-9 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
                aria-label="Предыдущий альбом"
                title="Предыдущий альбом (Alt+←)"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={prevTrack}
                className="w-9 h-9 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                aria-label="Предыдущий трек"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 bg-foreground text-background flex items-center justify-center transition-colors duration-200 hover:bg-foreground/80"
                aria-label={isPlaying ? 'Пауза' : 'Играть'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-[1px]" />}
              </button>
              <button
                type="button"
                onClick={nextTrack}
                className="w-9 h-9 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background"
                aria-label="Следующий трек"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextAlbum}
                disabled={albums.length < 2}
                className="w-7 h-9 border border-border flex items-center justify-center transition-colors duration-200 hover:bg-foreground hover:text-background disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
                aria-label="Следующий альбом"
                title="Следующий альбом (Alt+→)"
              >
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer actions: expand / stop */}
          <div className="flex border-t border-border text-[10px] font-mono uppercase tracking-[0.28em]">
            <button
              type="button"
              onClick={expandPlayer}
              className="flex-1 h-8 flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-foreground hover:text-background"
              aria-label="Развернуть плеер"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Развернуть</span>
            </button>
            <button
              type="button"
              onClick={stopPlayer}
              className="w-10 h-8 flex items-center justify-center border-l border-border transition-colors duration-200 hover:bg-foreground hover:text-background"
              aria-label="Остановить и закрыть"
              title="Остановить и закрыть"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {nigorEggOpen && (
        <div
          role="dialog"
          aria-label="Секрет"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={closeNigorEgg}
          style={{ textTransform: 'none', letterSpacing: 0 }}
        >
          <div
            className="relative w-[min(92vw,420px)] bg-card border border-border shadow-[0_24px_80px_-12px_hsl(0_0%_0%/0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="pulse-dot" />
                SECRET · 06
              </span>
              <button
                type="button"
                onClick={closeNigorEgg}
                aria-label="Закрыть"
                className="w-6 h-6 flex items-center justify-center text-white hover:opacity-80"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src={nigorEggCover}
              alt="Нигор"
              className="block w-full h-auto bg-black"
              draggable={false}
            />
            <div className="px-4 py-3 border-t border-border font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80">
              НИГОР
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MusicSection;
