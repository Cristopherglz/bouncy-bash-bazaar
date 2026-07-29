import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { INITIAL_PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { formatARS, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/product-card";
import { ArrowLeft, Minus, Plus, ShoppingBag, Truck, ShieldCheck, PartyPopper } from "lucide-react";

export const Route = createFileRoute("/producto/$id")({
  head: ({ params }) => {
    const p = INITIAL_PRODUCTS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.name} — Papita's` : "Producto — Papita's" },
        { name: "description", content: p?.description ?? "Producto de Papita's Copetín & Cotillón" },
        { property: "og:title", content: p ? `${p.name} — Papita's` : "Producto Papita's" },
        { property: "og:description", content: p?.description ?? "Producto de Papita's" },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: ({ params }) => {
    const product = INITIAL_PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductoPage,
});

function ProductoPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const { add } = useCart();
  const category = CATEGORIES.find((c) => c.id === product.category);
  const discounted = product.discountPct > 0;
  const finalPrice = discounted ? product.price * (1 - product.discountPct / 100) : product.price;
  const related = INITIAL_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <Link to="/tienda" className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Volver a la tienda
        </Link>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 pb-10">
        <div>
          <div className="card-fun p-3 relative overflow-hidden">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover animate-pop-in" key={imgIdx} />
            </div>
            {discounted && (
              <div className="absolute top-6 left-6 rotate-[-8deg] bg-secondary text-secondary-foreground font-black font-display text-sm px-3 py-1.5 rounded-full shadow-md border-2 border-background animate-wiggle">
                -{product.discountPct}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-20 w-20 rounded-2xl overflow-hidden border-2 transition ${i === imgIdx ? "border-primary shadow-[var(--shadow-pop)]" : "border-border"}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {category && (
            <Link to="/tienda" search={{ cat: category.id }} className="inline-flex items-center gap-2 text-sm font-bold font-display px-3 py-1 rounded-full text-white" style={{ background: category.color }}>
              <category.icon className="h-3.5 w-3.5" /> {category.name}
            </Link>
          )}
          <h1 className="mt-3 text-3xl sm:text-4xl font-black font-display leading-tight">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-end gap-3">
            {discounted && <span className="text-lg text-muted-foreground line-through">{formatARS(product.price)}</span>}
            <span className="text-4xl sm:text-5xl font-black font-display gradient-text">{formatARS(finalPrice)}</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-1 card-fun !rounded-full !border-2 p-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 rounded-full grid place-items-center hover:bg-muted"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-black font-display text-lg">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 rounded-full grid place-items-center hover:bg-muted"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(product.id, qty)} className="btn-fun flex-1 sm:flex-none">
              <ShoppingBag className="h-4 w-4" /> Agregar al carrito
            </button>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Truck, t: "Envío a domicilio", s: "Posadas y alrededores" },
              { icon: ShieldCheck, t: "Pago seguro", s: "Mercado Pago o efectivo" },
              { icon: PartyPopper, t: "Stock listo", s: `${product.stock} disponibles` },
            ].map((f) => (
              <div key={f.t} className="card-fun p-3 flex items-start gap-2 text-sm">
                <f.icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-bold font-display">{f.t}</div>
                  <div className="text-muted-foreground text-xs">{f.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-2xl sm:text-3xl font-black font-display mb-5">También te va a gustar 🎁</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}