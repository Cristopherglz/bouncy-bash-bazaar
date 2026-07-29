import papitas from "/images/papitas-logo.png?url";

export function JumpingLogoLoader({ label = "Preparando la fiesta..." }: { label?: string }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => {
          const colors = ["#ef4444", "#f59e0b", "#facc15", "#fb923c", "#ec4899"];
          const left = (i * 5.7) % 100;
          const delay = (i % 6) * 0.3;
          const dur = 3 + (i % 4);
          const bg = colors[i % colors.length];
          const w = 8 + (i % 3) * 4;
          return (
            <span
              key={i}
              className="absolute top-[-20px] block rounded-sm"
              style={{
                left: `${left}%`,
                width: w,
                height: w * 1.5,
                background: bg,
                animation: `confetti-spin ${dur}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>
      <div className="relative flex items-end justify-center h-40">
        <img
          src={papitas}
          alt="Papita's"
          className="h-28 sm:h-32 w-auto object-contain animate-logo-jump drop-shadow-[0_20px_20px_rgba(220,38,38,0.35)]"
        />
      </div>
      <div className="h-3 w-24 rounded-full bg-primary/25 blur-md -mt-4" />
      <p className="font-display text-lg sm:text-xl font-bold text-primary animate-wiggle">{label}</p>
    </div>
  );
}