import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useReveal } from '@/hooks/use-reveal';

import album1 from '@/assets/BulimPenis.webp';
import album2 from '@/assets/album-2.webp';
import album3 from '@/assets/gtabulib.webp';
import album4 from '@/assets/1.webp';
// Album 5 cover is animated — keep the MP4 for the loop and the webp as a poster.
import album5Mp4 from '@/assets/Echo95.mp4';
import album5Webm from '@/assets/Echo95.webm';
import album5Poster from '@/assets/Echo95.webp';

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
];

// --- MP3 asset resolution -----------------------------------------------------
// Map every bundled mp3 to its Vite-hashed URL so the player can resolve files
// declared as "/music/Album5/Track.mp3" in the data above. Several key variants
// are stored per file so lookups by basename, folder+basename, or title succeed.
const modules = import.meta.glob('../assets/music/*/*.{mp3,MP3}', { eager: true }) as Record<string, { default?: string } | string>;
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

// --- Component ----------------------------------------------------------------

/**
 * Music section — "FREQ.95 PLAYER". Album grid on top, a modal Winamp-style
 * player with terminal-chrome + a CSS equalizer visualizer.
 *
 * The data + asset-resolution block above is unchanged; this rewrite is purely
 * visual (and removes all framer-motion usage).
 */
const MusicSection = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([70]);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastEmitRef = useRef<number>(0);
  const ref = useReveal<HTMLDivElement>();

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
    if (!selectedAlbum) return;
    setCurrentTrack((prev) => (prev < selectedAlbum.tracks.length - 1 ? prev + 1 : 0));
    setProgress([0]);
  };

  const prevTrack = () => {
    if (!selectedAlbum) return;
    setCurrentTrack((prev) => (prev > 0 ? prev - 1 : selectedAlbum.tracks.length - 1));
    setProgress([0]);
  };

  const formatTime = (s: number) => {
    if (!s || s <= 0) return '0:00';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const track = selectedAlbum?.tracks[currentTrack];
    if (track?.file && audio.src !== track.file) {
      audio.src = track.file;
      audio.load();
      setProgress([0]);
      setDuration(0);
    }

    const onLoaded = () => setDuration(Math.round(audio.duration || 0));
    const onTime = () => {
      if (!audio.duration) return;
      const now = Date.now();
      if (now - lastEmitRef.current > 500) {
        setProgress([Math.round((audio.currentTime / audio.duration) * 100)]);
        lastEmitRef.current = now;
      }
    };
    const onEnded = () => nextTrack();

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);

    if (isPlaying) audio.play().catch(() => { /* user gesture may be required */ });
    else audio.pause();

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlbum, currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = (volume[0] ?? 70) / 100;
  }, [volume]);

  const handleVolumeChange = (val: number[]) => {
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = (val?.[0] ?? 70) / 100;
  };

  const currentTrackTitle = selectedAlbum?.tracks[currentTrack]?.title
    || selectedAlbum?.tracks[currentTrack]?.file?.split('/').pop()?.replace(/\.[^/.]+$/, '')
    || '';

  return (
    <section id="music" className="relative py-20 md:py-28 border-b border-border">
      <div className="section-container">
        <div className="flex items-baseline justify-between mb-6">
          <span className="eyebrow">№ 05 / FREQ.95 / АЛЬБОМЫ</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hidden md:inline">
            [{albums.length.toString().padStart(2, '0')}_RELEASES_LOADED]
          </span>
        </div>

        <div ref={ref} className="reveal">
          <h2 className="display-xl text-foreground mb-4">
            АЛЬБО<span className="text-primary">МЫ</span>
          </h2>
          <p className="max-w-2xl text-foreground/80 text-base md:text-lg mb-12">
            Музыка, созданная нашим сообществом с любовью и страстью. Нажми на обложку чтобы
            вызвать плеер.
          </p>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {albums.map((album, i) => (
              <li
                key={album.id}
                style={{
                  animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
                  animationDelay: `${i * 70}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => openPlayer(album)}
                  className="group w-full text-left"
                  aria-label={`Play ${album.title}`}
                >
                  <div className="relative aspect-square border border-border bg-background overflow-hidden">
                    {album.coverVideo ? (
                      <video
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="none"
                        poster={album.cover}
                        width={360}
                        height={360}
                        className="w-full h-full object-cover"
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
                        width={360}
                        height={360}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* ident overlay */}
                    <div className="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary bg-background/70 px-1.5 py-0.5 border border-primary/70">
                      REL.{String(album.id).padStart(2, '0')}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60">
                      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-primary border border-primary px-3 py-2">
                        <Play className="w-4 h-4 fill-primary" /> PLAY
                      </div>
                    </div>
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
                    <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-display font-black uppercase text-sm md:text-base leading-tight text-foreground">
                      {album.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                      {album.artist} / {album.tracks.length} TR.
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedAlbum && (
        <div
          onClick={closePlayer}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="window w-full max-w-md animate-fade-up"
          >
            <div className="window-title">
              <span>▓</span>
              <span>FREQ.95_PLAYER.EXE</span>
              <button
                onClick={closePlayer}
                className="ml-auto flex items-center justify-center w-5 h-5 text-primary-foreground hover:text-foreground hover:bg-background"
                aria-label="Close player"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="window-body pt-10 p-5 md:p-6">
              <div className="relative aspect-square border border-border overflow-hidden mb-5">
                {selectedAlbum.coverVideo ? (
                  <video
                    muted
                    loop
                    autoPlay
                    playsInline
                    poster={selectedAlbum.cover}
                    className="w-full h-full object-cover"
                  >
                    <source src={selectedAlbum.coverVideo.webm} type="video/webm" />
                    <source src={selectedAlbum.coverVideo.mp4} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedAlbum.cover}
                    alt={selectedAlbum.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* EQ visualizer */}
                <div className="absolute bottom-0 inset-x-0 flex items-end justify-center gap-1 py-2 bg-background/70">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className={`eq-bar ${!isPlaying ? 'opacity-30' : ''}`}
                      style={{
                        animationPlayState: isPlaying ? 'running' : 'paused',
                        animationDelay: `${(i % 6) * 80}ms`,
                        height: `${10 + (i % 5) * 5}px`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="font-display font-black uppercase text-xl md:text-2xl leading-tight text-foreground">
                  {selectedAlbum.title}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                  {selectedAlbum.artist} / TRACK {String(currentTrack + 1).padStart(2, '0')}/
                  {String(selectedAlbum.tracks.length).padStart(2, '0')}
                </div>
              </div>

              <audio ref={audioRef} preload="none" />

              <div className="mb-3 font-mono text-sm text-foreground truncate">
                <span className="text-primary">&gt; </span>
                {currentTrackTitle}
              </div>

              <div className="mb-5">
                <Slider value={progress} onValueChange={() => { /* read-only */ }} max={100} step={1} />
                <div className="flex justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  <span>{formatTime(Math.round((progress[0] / 100) * duration))}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 mb-5">
                <button
                  onClick={prevTrack}
                  className="w-10 h-10 flex items-center justify-center border border-border text-foreground hover:text-primary hover:border-primary"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying((v) => !v)}
                  className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground border border-primary hover:bg-foreground hover:text-background"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button
                  onClick={nextTrack}
                  className="w-10 h-10 flex items-center justify-center border border-border text-foreground hover:text-primary hover:border-primary"
                  aria-label="Next track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="flex-1" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground w-8 text-right">
                  {String(volume[0]).padStart(2, '0')}
                </span>
              </div>

              <Button
                variant="outline"
                className="w-full h-10 font-mono text-[11px] uppercase tracking-[0.25em] rounded-none border-border hover:border-primary hover:text-primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Скачать альбом
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MusicSection;
