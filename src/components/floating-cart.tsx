import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function FloatingCart() {
  const { count, lastAdded } = useCart();
  const navigate = useNavigate();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [bump, setBump] = useState(false);
  const drag = useRef({ active: false, moved: false, dx: 0, dy: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPos({ x: window.innerWidth - 92, y: window.innerHeight - 160 });
  }, []);

  useEffect(() => {
    if (!lastAdded) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 600);
    return () => clearTimeout(t);
  }, [lastAdded]);

  if (count === 0 || !pos) return null;

  const clamp = (x: number, y: number) => ({
    x: Math.min(Math.max(8, x), window.innerWidth - 76),
    y: Math.min(Math.max(8, y), window.innerHeight - 76),
  });

  return (
    <button
      aria-label={`Ir a la caja, ${count} productos`}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        drag.current = { active: true, moved: false, dx: e.clientX - pos.x, dy: e.clientY - pos.y };
      }}
      onPointerMove={(e) => {
        if (!drag.current.active) return;
        drag.current.moved = true;
        setPos(clamp(e.clientX - drag.current.dx, e.clientY - drag.current.dy));
      }}
      onPointerUp={() => {
        const moved = drag.current.moved;
        drag.current.active = false;
        if (!moved) navigate({ to: "/caja" });
      }}
      style={{
        left: pos.x,
        top: pos.y,
        touchAction: "none",
        animation: bump ? "pop-in .5s cubic-bezier(.34,1.56,.64,1)" : undefined,
      }}
      className="fixed z-50 h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-[var(--shadow-pop)] cursor-grab active:cursor-grabbing select-none"
    >
      <ShoppingBag className="h-7 w-7 pointer-events-none" />
      <span className="pointer-events-none absolute -top-1.5 -right-1.5 min-w-[24px] h-6 px-1 rounded-full bg-secondary text-secondary-foreground text-xs font-black grid place-items-center border-2 border-background">
        {count}
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-4 ring-secondary/40 animate-ping" />
    </button>
  );
}