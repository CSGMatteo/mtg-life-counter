export default function SettingsModal({
  showSettings,
  setShowSettings,
}) {

  if (!showSettings) return null;

  return (

    <div
      className="
        absolute
        inset-0
        z-40
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-[90%]
          max-w-md
          rounded-3xl
          bg-zinc-900
          p-6
          text-white
          shadow-2xl
        "
      >

        <div className="mb-6 flex items-center justify-between">

          <h1 className="text-2xl font-bold">
            Settings
          </h1>

          <button
            onClick={() => setShowSettings(false)}
            className="text-2xl opacity-70"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <div className="rounded-xl bg-zinc-800 p-4">
            Starting Life: 40
          </div>

          <div className="rounded-xl bg-zinc-800 p-4">
            Round Timer: 90 Minutes
          </div>

        </div>

      </div>

    </div>

  );
}