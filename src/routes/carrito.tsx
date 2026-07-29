import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { formatARS, useCart } from "@/lib/cart";
import { Minus, Plus, Trash2, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Tu carrito — Papita's" },
      { name: "description", content: "Revisá tu carrito y finalizá tu pedido en Papita's Copetín & Cotillón." },
      { property: "og:title", content: "Tu carrito — Papita's" },
      { property: "og:description", content: "Revisá y finalizá tu pedido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Carrito,
});

function Carrito() {
  const { cart, products, setQty, remove, subtotal, count, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal > 0 && subtotal < 20000 ? 2500 : 0;
  const total = subtotal + shipping;

  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      if (!p) return null;
      const price = p.discountPct > 0 ? p.price * (1 - p.discountPct / 100) : p.price;
      return { p, qty, price };
    })
    .filter(Boolean) as { p: (typeof products)[number]; qty: number; price: number }[];

  if (placed) {
    return (
      <SiteLayout>
        <section className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-7xl mb-4 animate-float-y">🎉</div>
          <h1 className="text-4xl font-black font-display gradient-text">¡Pedido recibido!</h1>
          <p className="mt-3 text-muted-foreground">
            Gracias por elegir Papita's. Te vamos a contactar por WhatsApp para coordinar el envío o retiro.
          </p>
          <Link to="/tienda" className="btn-fun mt-8 inline-flex">Seguir comprando <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Carrito</span>
        </div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-black font-display">
          Tu <span className="gradient-text">carrito</span> 🛍️
        </h1>

        {count === 0 ? (
          <div className="card-fun mt-8 p-10 text-center">
            <div className="text-7xl mb-3 animate-float-y">🎈</div>
            <p className="font-display text-2xl font-black">Todavía está vacío</p>
            <p className="text-muted-foreground">Sumá productos para armar tu fiesta.</p>
            <Link to="/tienda" className="btn-fun mt-6 inline-flex">Ir a la tienda <ArrowRight className="h-4 w-4" /></Link>
          </div>
        ) : (
          <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="space-y-3">
              {lines.map((l, i) => (
                <div
                  key={l.p.id}
                  className="card-fun p-3 sm:p-4 flex gap-3 items-center"
                  style={{ animation: `pop-in .4s cubic-bezier(.34,1.56,.64,1) ${i * 0.04}s both` }}
                >
                  <img src={l.p.image} alt={l.p.name} className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to="/producto/$id" params={{ id: l.p.id }} className="font-display font-bold hover:text-primary line-clamp-2">
                      {l.p.name}
                    </Link>
                    <div className="mt-1 text-sm text-muted-foreground">{formatARS(l.price)} c/u</div>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <div className="inline-flex items-center gap-1 rounded-full border-2 border-border p-0.5">
                        <button onClick={() => setQty(l.p.id, l.qty - 1)} className="h-8 w-8 rounded-full grid place-items-center hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center font-black font-display">{l.qty}</span>
                        <button onClick={() => setQty(l.p.id, l.qty + 1)} className="h-8 w-8 rounded-full grid place-items-center hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => remove(l.p.id)} className="text-destructive hover:bg-destructive/10 rounded-full h-8 px-3 text-sm inline-flex items-center gap-1">
                        <Trash2 className="h-3.5 w-3.5" /> Quitar
                      </button>
                    </div>
                  </div>
                  <div className="hidden sm:block font-black font-display text-lg text-right">
                    {formatARS(l.price * l.qty)}
                  </div>
                </div>
              ))}
              <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive underline underline-offset-4">
                Vaciar carrito
              </button>
            </div>

            <aside className="lg:sticky lg:top-32 self-start card-fun p-5 space-y-3">
              <h3 className="font-display font-black text-xl inline-flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Resumen
              </h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">{formatARS(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-bold">{shipping === 0 ? "Gratis 🎉" : formatARS(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">Envío gratis a partir de {formatARS(20000)}.</p>
              )}
              <div className="border-t border-border pt-3 flex justify-between items-baseline">
                <span className="font-display font-bold">Total</span>
                <span className="font-display font-black text-2xl gradient-text">{formatARS(total)}</span>
              </div>
              <button onClick={() => setPlaced(true)} className="btn-fun w-full mt-2">
                <ShoppingBag className="h-4 w-4" /> Finalizar pedido
              </button>
              <Link to="/tienda" className="block text-center text-sm text-primary font-bold hover:underline">
                Seguir comprando
              </Link>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}