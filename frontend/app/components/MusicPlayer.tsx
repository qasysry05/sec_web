"use client";

import { useState, useRef } from "react";

interface Track {
  title: string;
  artist: string;
  src: string;
}

const PLAYLIST: Track[] = [
  { title: "Lo-Fi 1", artist: "Local Audio", src: "/music/lofi1.mp3" },
  { title: "Lo-Fi 2", artist: "Local Audio", src: "/music/lofi2.mp3" },
  { title: "Lo-Fi 3", artist: "Local Audio", src: "/music/lofi3.mp3" },
  { title: "Waltz 1", artist: "Local Audio", src: "/music/waltz.mp3" },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    // Give state time to update src before calling play
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 50);
  };

  return (
    <div className="w-full lg:w-80 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
      <h2 className="font-display text-xl text-black dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        Focus Music
      </h2>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={() => {
          // Play next track automatically on end
          const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
          handleTrackSelect(nextIndex);
        }}
      />

      {/* Now Playing Display */}
      <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
        <p className="text-sm font-semibold text-black dark:text-zinc-50">
          {currentTrack.title}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {currentTrack.artist}
        </p>

        <button
          onClick={togglePlay}
          className="mt-4 rounded-full bg-black dark:bg-white px-6 py-2 text-xs font-semibold text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      {/* Track List */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-zinc-400 mb-1">Playlist</span>
        {PLAYLIST.map((track, idx) => (
          <button
            key={idx}
            onClick={() => handleTrackSelect(idx)}
            className={`text-left text-xs p-2 rounded-lg transition-colors flex justify-between items-center ${
              currentTrackIndex === idx
                ? "bg-zinc-100 dark:bg-zinc-800 font-semibold text-black dark:text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <span>{track.title}</span>
            {currentTrackIndex === idx && isPlaying && (
              <span className="text-[10px] text-green-500 font-bold">PLAYING</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}