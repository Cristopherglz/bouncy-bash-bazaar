import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/mock-data";
import { formatARS, useCart } from "@/lib/cart";
import { Plus, Sparkles } from "lucide-react";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, lastAdded } = useCart();
  const discounted = product.discountPct > 0;
  const finalPrice = discounted ? product.price * (1 - product.discountPct / 100) : product.price;
  const flying = lastAdded === product.id;
  return (
    <div
      className="group relative card-fun overflow-hidden hover-pop"
      style={{ animation: `pop-in .5s cubic-bezier(.34,1.56,.64,1) ${index * 0.03}s both` }}
    >
      {discounted && (
        <div className="absolute z-10 top-3 left-3 rotate-[-8deg] bg-secondary text-secondary-foreground font-black font-display text-xs px-3 py-1 rounded-full shadow-md border-2 border-background">
          -{product.discountPct}%
        </div>
      )}
      <Link to="/producto/$id" params={{ id: product.id }} className="block">
        <div className="aspect-square bg-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
        </div>
      </Link>
      <div className="p-4 space-y-1.5">
        <Link to="/producto/$id" params={{ id: product.id }}>
          <h3 className="font-display font-bold text-base leading-tight line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-end justify-between gap-2 pt-1">
          <div>
            {discounted && (
              <div className="text-xs text-muted-foreground line-through">{formatARS(product.price)}</div>
            )}
            <div className="text-xl font-black font-display gradient-text">{formatARS(finalPrice)}</div>
          </div>
          <button
            onClick={() => add(product.id)}
            className="relative shrink-0 h-11 w-11 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-[var(--shadow-pop)] hover:scale-110 active:scale-95 transition-transform"
            aria-label={`Agregar ${product.name}`}
          >
            <Plus className="h-5 w-5" />
            {flying && (
              <span className="pointer-events-none absolute -top-2 -right-2 animate-pop-in">
                <Sparkles className="h-5 w-5 text-secondary" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}