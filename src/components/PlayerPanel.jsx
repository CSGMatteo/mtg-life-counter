import { useState, useRef } from "react";

export default function PlayerPanel({
  color,
  rotated = false,
}) {

  const [life, setLife] = useState(40);
  const [delta, setDelta] = useState(null);

  const deltaTimeout = useRef(null);

  const holdTimeout = useRef(null);
  const holdInterval = useRef(null);
  const holdTriggered = useRef(false);

  const updateLife = (amount) => {

    setLife(prev => prev + amount);

    setDelta(prev => (prev || 0) + amount);

    clearTimeout(deltaTimeout.current);

    deltaTimeout.current = setTimeout(() => {
      setDelta(null);
    }, 2000);
  };

  const handlePointerDown = (amount) => {

    holdTriggered.current = false;

    holdTimeout.current = setTimeout(() => {

      holdTriggered.current = true;

      let speed = 500;

      updateLife(amount * 10);

      const runInterval = () => {

        holdInterval.current = setTimeout(() => {

          updateLife(amount * 10);

          speed = Math.max(200, speed - 10);

          runInterval();

        }, speed);
      };

      runInterval();

    }, 750);
  };

  const handlePointerUp = (amount) => {

    clearTimeout(holdTimeout.current);
    clearTimeout(holdInterval.current);

    if (!holdTriggered.current) {
      updateLife(amount);
    }
  };

  const stopHold = () => {
    clearTimeout(holdTimeout.current);
    clearTimeout(holdInterval.current);
  };

  return (
    <div
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "manipulation",
      }}
      className={`
        relative
        ${color}
        flex
        items-center
        justify-center
        border
        overflow-hidden
        select-none
        touch-manipulation
        ${rotated ? "rotate-180" : ""}
      `}
    >

      {/* Minus */}
      <button
        draggable="false"
        onPointerDown={() => handlePointerDown(-1)}
        onPointerUp={() => handlePointerUp(-1)}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
        className="absolute left-0 top-0 h-full w-1/2"
      >
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
          -
        </span>
      </button>

      {/* Plus */}
      <button
        draggable="false"
        onPointerDown={() => handlePointerDown(+1)}
        onPointerUp={() => handlePointerUp(+1)}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
        className="absolute right-0 top-0 h-full w-1/2"
      >
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl opacity-30">
          +
        </span>
      </button>

      <h1 className="text-[clamp(4rem,14vw,12rem)] font-bold">
        {life}
      </h1>

      {delta !== null && (
        <div className="absolute bottom-6 text-3xl opacity-60">
          {delta > 0 ? `+${delta}` : delta}
        </div>
      )}

    </div>
  );
}