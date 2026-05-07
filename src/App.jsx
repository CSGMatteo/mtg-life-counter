import { useState, useEffect } from "react";


export default function App() {

  const [player1Life, setPlayer1Life] = useState(40);
  const [player2Life, setPlayer2Life] = useState(40);
  const [player3Life, setPlayer3Life] = useState(40);
  const [player4Life, setPlayer4Life] = useState(40);

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
    <div className="relative h-svh w-screend">
      <div className="grid grid-cols-2 grid-rows-2 overflow-hidden">

        {/* Timer */}
        <div className="flex itesm-center gap-4 rounded-2xl bg-black/80 px-6 py-4 text-white shadow-xl backdrop-blur">

        {/* Rese */}
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

        {/* Player 1 */}
        <div className="relative bg-blue-600 flex items-center justify-center border overflow-hidden select-none touch-manipulation rotate-180">

          {/* Minus Side */}
          <button 
            onClick={() => setPlayer1Life(player1Life - 1)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button 
            onClick={() => setPlayer1Life(player1Life + 1)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>

          <h1 className="text-[clamp(3rem,10vw,8rem)]">
            {player1Life}
          </h1>
        </div>

        {/* Player 2 */}
        <div className="relative bg-green-600 flex items-center justify-center border overflow-hidden select-none touch-manipulation rotate-180">

          {/* Minus Side */}
          <button 
            onClick={() => setPlayer2Life(player2Life - 1)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-7xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button
            onClick={() => setPlayer2Life(player2Life + 1)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>
          <h1 className="text-[clamp(3rem,10vw,8rem)]">
            {player2Life}
          </h1>
        </div>

        {/* Player 3 */}
        <div className="relative bg-red-600 flex items-center justify-center border overflow-hidden select-none touch-manipulation">

          {/* Minus Side */}
          <button 
            onClick={() => setPlayer3Life(player3Life - 1)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button 
            onClick={() => setPlayer3Life(player3Life + 1)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>

          <h1 className="text-[clamp(3rem,10vw,8rem)]">
            {player3Life}
          </h1>
        </div>

        {/* Player 4 */}
        <div className="relative bg-purple-600 flex items-center justify-center border overflow-hidden select-none touch-manipulation">

          {/* Minus Side */}
          <button 
            onClick={() => setPlayer4Life(player4Life - 1)}
            className="absolute left-0 top-0 h-full w-1/2">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              -
            </span>
          </button>

          {/* Plus Side */}
          <button 
            onClick={() => setPlayer4Life(player4Life + 1)}
            className="absolute right-0 top-0 h-full w-1/2">
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
              +
            </span>
          </button>

          <h1 className="text-[clamp(3rem,10vw,8rem)]">
            {player4Life}
          </h1>
        </div>

      </div>
    </div>
  );
}