import { useState, useEffect, useRef } from "react";


export default function App() {

  const [player1Life, setPlayer1Life] = useState(40);
  const [player2Life, setPlayer2Life] = useState(40);
  const [player3Life, setPlayer3Life] = useState(40);
  const [player4Life, setPlayer4Life] = useState(40);
  const [player1Delta, setPlayer1Delta] = useState(null);
  const [player2Delta, setPlayer2Delta] = useState(null);
  const [player3Delta, setPlayer3Delta] = useState(null);
  const [player4Delta, setPlayer4Delta] = useState(null);
  const player1Timeout = useRef(null);
  const player2Timeout = useRef(null);
  const player3Timeout = useRef(null);
  const player4Timeout = useRef(null);


  const updateLife = (setLife, setDelta, amount, timeoutRef) => {
    setLife(prev => prev + amount);

    setDelta(prev => {
      const next = (prev || 0) + amount;
      return next;
    });

    // reset fade-out timer
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDelta(null);
    }, 2000); // disappears after 2s of inactivity
  };


  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000); 
    }

    return () => clearInterval(interval);

  }, [isRunning]);

  const formatTime = (totalSeconds) => {

    const hours = String(
      Math.floor(totalSeconds / 3600)
    ).padStart(2, "0");

    const minutes = String(
      Math.floor((totalSeconds % 3600) / 60)
    ).padStart(2, "0");

    const secs = String(
      totalSeconds % 60
    ).padStart(2, "0");

    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="relative h-svh w-screen">
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full overflow-hidden">

        {/* Player 1 */}
        <div className="relative bg-blue-700 flex items-center justify-center border overflow-hidden select-none touch-manipulation rotate-180">

          {/* Minus Side */}
          <button 
            onClick={() => updateLife(setPlayer1Life, setPlayer1Delta, - 1, player1Timeout)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button 
            onClick={() => updateLife(setPlayer1Life, setPlayer1Delta, + 1, player1Timeout)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>

          <h1 className="text-[clamp(4rem,14vw,12rem)] font-bold">
            {player1Life}
          </h1>

          {player1Delta !== null && (
            <div className="absolute bottom-6 text-3xl opacity-60">
              {player1Delta > 0 ? `+${player1Delta}` : player1Delta}
            </div>
          )}
        </div>

        {/* Player 2 */}
        <div className="relative bg-emerald-700 flex items-center justify-center border overflow-hidden select-none touch-manipulation rotate-180">

          {/* Minus Side */}
          <button 
            onClick={() => updateLife(setPlayer2Life, setPlayer2Delta, - 1, player2Timeout)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-7xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button
            onClick={() => updateLife(setPlayer2Life, setPlayer2Delta, + 1, player2Timeout)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>
          <h1 className="text-[clamp(4rem,14vw,12rem)] font-bold">
            {player2Life}
          </h1>

          {player2Delta !== null && (
            <div className="absolute bottom-6 text-3xl opacity-60">
              {player2Delta > 0 ? `+${player2Delta}` : player2Delta}
            </div>
          )}
        </div>

        {/* Player 3 */}
        <div className="relative bg-rose-700 flex items-center justify-center border overflow-hidden select-none touch-manipulation">

          {/* Minus Side */}
          <button 
            onClick={() => updateLife(setPlayer3Life, setPlayer3Delta, - 1, player3Timeout)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button 
            onClick={() => updateLife(setPlayer3Life, setPlayer3Delta, + 1, player3Timeout)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>

          <h1 className="text-[clamp(4rem,14vw,12rem)] font-bold">
            {player3Life}
          </h1>

          {player3Delta !== null && (
            <div className="absolute bottom-6 text-3xl opacity-60">
              {player3Delta > 0 ? `+${player3Delta}` : player3Delta}
            </div>
          )}
        </div>

        {/* Player 4 */}
        <div className="relative bg-violet-700 flex items-center justify-center border overflow-hidden select-none touch-manipulation">

          {/* Minus Side */}
          <button 
            onClick={() => updateLife(setPlayer4Life, setPlayer4Delta, - 1, player4Timeout)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button 
            onClick={() => updateLife(setPlayer4Life, setPlayer4Delta, + 1, player4Timeout)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>

          <h1 className="text-[clamp(4rem,14vw,12rem)] font-bold">
            {player4Life}
          </h1>

          {player4Delta !== null && (
            <div className="absolute bottom-6 text-3xl opacity-60">
              {player4Delta > 0 ? `+${player4Delta}` : player4Delta}
            </div>
          )}
        </div>

      </div>

      {/* Timer */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="flex items-center gap-4 rounded-2xl bg-black/80 px-6 py-4 text-white shadow-xl backdrop-blur">

        {/* Reset */}
        <button
          onClick={() => {
            setSeconds(0);
            setIsRunning(false);
          }}
          className="text-2xl opacity-70 active:scale-95"
        >
          ⏹
        </button>

        {/* Timer */}
        <h1 className="text-3xl font-bold tracking-wider">
          {formatTime(seconds)}
        </h1>

        {/* Play/Pause */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="text-2xl opacity-70 active:scale-95"
        >
          {isRunning ? "⏸" : "▶"}
        </button>
        </div>
      </div>
    </div>
  );
}