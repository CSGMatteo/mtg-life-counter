import { useState, useEffect, useRef } from "react";
import PlayerPanel from "./components/PlayerPanel";
import SettingsModal from "./components/SettingsModal";


export default function App() {

  const ROUND_TIME = 90 * 60;
  const OVERTIME_TIME = 20 * 60;

  const [seconds, setSeconds] = useState(ROUND_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          // Main timer finished
          if (prev <= 1 && !isOvertime) {
            setIsOvertime(true);
            return OVERTIME_TIME;
          }

          // Overtime finished
          if (prev <= 1 && isOvertime) {
            setIsRunning(false);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [isRunning, isOvertime]);

  useEffect (() => {
    let wakeLock = null;

    const enableWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
      } catch (err) {
        console.log("Wake lock failed", err);
      }
    };

    enableWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);

  const formatTime = (totalSeconds) => {

    const minutes = String(
      Math.floor(totalSeconds / 60)
    ).padStart(2, "0");

    const secs = String(
      totalSeconds % 60
    ).padStart(2, "0");

    return `${minutes}:${secs}`;
  };

  return (
    <div className="relative h-svh w-screen">
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full overflow-hidden">

        <PlayerPanel
          color="bg-blue-700"
          rotated
        />

        <PlayerPanel
          color="bg-emerald-700"
          rotated
        />

        <PlayerPanel
          color="bg-rose-700"
        />

        <PlayerPanel
          color="bg-violet-700"
        />
      </div>

      {/* Timer */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="
        grid 
        grid-cols-[auto_auto_auto]
        justify-items-center
        items-center 
        gap-2
        rounded-3xl
        bg-black/70
        px-4
        py-3
        shadow-2xl
        backdrop-blur
        "
      >

        {/* Reset */}
        <button
          onClick={() => {
            setSeconds(ROUND_TIME);
            setIsRunning(false);
            setIsOvertime(false);
          }}  
          className="
            rounded-2xl
            px-2
            py-4
            text-4xl
            text-white
            active:scale-95
          "
        >
          ⏹
        </button>

        {/* Timers */}
        <div className="flex flex-col items-center gap-3">

          {/* Top Timer */}
          <h1
            className={`
              rotate-180
              text-5xl
              font-bold
              tracking-wider
              ${isOvertime ? "text-red-500" : "text-white"}
            `}
          >
            {formatTime(seconds)}
          </h1>

          {/* Bottom Timer */}
        <h1 className={`
            text-5xl
            font-bold 
            tracking-wider 
            ${isOvertime ? "text-red-500" : "text-white"}
            `}
          >
            {formatTime(seconds)}
        </h1>
      </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="
            rounded-2xl
            px-2
            py-4
            text-4xl
            text-white
            active:scale-95
          "
        >
          {isRunning ? "⏸" : "▶"}
        </button>

        </div>
      </div>

      {/* Settings */}
        <button
          onClick={() => setShowSettings(true)}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          z-30
          rounded-full
          bg-black/50
          p-3
          text-2xl
          text-white
          backdrop-blur
        "
        >
          ⚙
        </button>

      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </div>
  );
}