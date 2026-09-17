"use client";

import React, { useState, useEffect } from "react";

export default function HourglassTimer() {
  const [secondsSpent, setSecondsSpent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTilting, setIsTilting] = useState<boolean>(false);

  // 1 hour = 3600 seconds
  const ONE_HOUR = 3600;
  const tiltCount = Math.floor(secondsSpent / ONE_HOUR);

  // Calculate progress within the current hour (0 to 1)
  const currentHourProgress = (secondsSpent % ONE_HOUR) / ONE_HOUR;

  // Timer interval loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isPaused) {
      interval = setInterval(() => {
        setSecondsSpent((prev) => {
          const nextTime = prev + 1;
          if (nextTime > 0 && nextTime % ONE_HOUR === 0) {
            triggerTilt();
          }
          return nextTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused]);

  const triggerTilt = () => {
    setIsTilting(true);
    setTimeout(() => {
      setIsTilting(false);
    }, 1200);
  };

  const handleReset = () => {
    setSecondsSpent(0);
    setIsPaused(false);
  };

  // Format seconds into HH:MM:SS
  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  // Calculate dynamic heights for sand animation
  const topSandHeight = Math.max(0, 40 * (1 - currentHourProgress));
  const bottomSandHeight = Math.min(40, 40 * currentHourProgress);

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 text-white flex flex-col items-center justify-between w-full shadow-lg">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-zinc-300 tracking-wide">
          Focus Timer
        </div>
        {/* Subtle, smaller, grayish restart button */}
        <button
          onClick={handleReset}
          title="Reset Timer"
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-0.5 rounded bg-zinc-800/40 hover:bg-zinc-800"
        >
          Reset
        </button>
      </div>

      {/* Hourglass Container (Clean without sparkles) */}
      <div className="relative my-3 flex items-center justify-center w-36 h-36">
        <div
          className={`transition-transform duration-1000 ease-in-out ${
            isTilting ? "rotate-180 scale-105" : "rotate-0 scale-100"
          }`}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]"
          >
            {/* Top Cap */}
            <rect x="20" y="10" width="60" height="12" rx="2" fill="#ffffff" />
            <rect x="25" y="14" width="50" height="4" fill="#09090b" />

            {/* Bottom Cap */}
            <rect x="20" y="78" width="60" height="12" rx="2" fill="#ffffff" />
            <rect x="25" y="82" width="50" height="4" fill="#09090b" />

            {/* Side Support Pillars */}
            <rect x="22" y="22" width="6" height="56" fill="#ffffff" />
            <rect x="72" y="22" width="6" height="56" fill="#ffffff" />

            {/* Glass Bulbs */}
            <path
              d="M30 22 L70 22 L52 46 L52 54 L70 78 L30 78 L48 54 L48 46 Z"
              fill="#18181b"
              stroke="#ffffff"
              strokeWidth="3"
            />

            {/* Top Bulb Sand */}
            <g>
              <clipPath id="topBulbClip">
                <path d="M32 24 L68 24 L51 45 L49 45 Z" />
              </clipPath>
              <rect
                x="20"
                y={64 - topSandHeight}
                width="60"
                height={topSandHeight}
                fill="#ffffff"
                clipPath="url(#topBulbClip)"
              />
            </g>

            {/* Bottom Bulb Sand */}
            <g>
              <clipPath id="bottomBulbClip">
                <path d="M51 55 L49 55 L32 76 L68 76 Z" />
              </clipPath>
              <rect
                x="20"
                y={76 - bottomSandHeight}
                width="60"
                height={bottomSandHeight}
                fill="#ffffff"
                clipPath="url(#bottomBulbClip)"
              />
            </g>

            {/* Falling Sand Stream */}
            {!isPaused && currentHourProgress < 1 && (
              <line
                x1="50"
                y1="47"
                x2="50"
                y2="53"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="2 2"
                className="animate-pulse"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full flex flex-col items-center gap-1 my-2">
        <div className="text-3xl font-mono font-bold tracking-wider text-white">
          {formatTime(secondsSpent)}
        </div>
        <div className="text-xs text-zinc-400 font-medium tracking-wide">
          Tilts: <span className="text-white font-semibold">{tiltCount}</span>
        </div>
      </div>

      {/* Pause / Resume Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="mt-3 w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-md flex items-center justify-center gap-2"
      >
        {isPaused ? (
          <>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Resume
          </>
        ) : (
          <>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            Pause
          </>
        )}
      </button>
    </div>
  );
}