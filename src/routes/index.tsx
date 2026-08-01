import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, INITIAL_PRODUCTS } from "@/lib/mock-data";
import { Search, Truck, Store, PartyPopper, ArrowRight, Sparkles } from "lucide-react";
import local from "/images/papitas-local.png?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papita's — Copetín & Cotillón para fiestas en Posadas" },
      { name: "description", content: "Snacks, golosinas, globos, kits temáticos y todo el cotillón para tu fiesta. Comprá online con envío en Posadas o retiro en el local." },
      { property: "og:title", content: "Papita's — Copetín & Cotillón" },
      { property: "og:description", content: "Todo para tu fiesta: copetín, golosinas, globos y cotillón. Envío en Posadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const ofertas = INITIAL_PRODUCTS.filter((p) => p.publishedOnline && p.discountPct > 0).slice(0, 8);
  const destacados = INITIAL_PRODUCTS.filter((p) => p.publishedOnline).slice(0, 8);

  const buscar = () => navigate({ to: "/tienda", search: q.trim() ? { q: q.trim() } : {} });

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 font-display font-bold text-secondary-foreground text-sm animate-pop-in">
              <Sparkles className="h-4 w-4" /> Copetín + Cotillón en Posadas
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl font-black font-display leading-[0.95]">
              Tu fiesta <span className="gradient-text">arranca</span> acá 🎉
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              Snacks, golosinas, globos, vajilla y kits temáticos. Elegí, pagá y recibilo en tu casa o retiralo por el local.
            </p>

            {/* Buscador */}
            <div className="mt-6 flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && buscar()}
                  placeholder="Buscar globos, chizitos, kits..."
                  className="w-full h-14 pl-12 pr-4 rounded-full bg-card border-2 border-border focus:border-primary outline-none font-semibold shadow-[var(--shadow-fun)]"
                  aria-label="Buscar productos"
                />
              </div>
              <button onClick={buscar} className="btn-fun !px-6">Buscar</button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["globos", "golosinas", "snacks", "tematicas"].map((id) => {
                const c = CATEGORIES.find((x) => x.id === id)!;
                return (
                  <Link
                    key={id}
                    to="/tienda"
                    search={{ cat: id }}
                    className="rounded-full border-2 border-border bg-card px-4 py-2 text-sm font-bold font-display hover:border-primary transition"
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Foto del local */}
          <div className="relative">
            <div className="card-fun overflow-hidden animate-float-y">
              <img
                src={local}
                alt="Local de Papita's Copetín & Cotillón en Posadas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-3 rotate-[-6deg] bg-primary text-primary-foreground font-display font-black px-4 py-2 rounded-2xl shadow-[var(--shadow-pop)]">
              ¡Te esperamos en el local!
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 grid sm:grid-cols-3 gap-3">
        {[
          { i: Truck, t: "Envíos en Posadas", d: "Coordinás fecha y horario" },
          { i: Store, t: "Retiro en el local", d: "Listo en 2 horas" },
          { i: PartyPopper, t: "Kits temáticos", d: "Todo resuelto para 12 personas" },
        ].map((b) => (
          <div key={b.t} className="card-fun p-5 flex items-start gap-3 hover-pop">
            <b.i className="h-6 w-6 text-primary shrink-0" />
            <div>
              <div className="font-display font-black">{b.t}</div>
              <div className="text-sm text-muted-foreground">{b.d}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="text-3xl sm:text-4xl font-black font-display">Categorías <span className="gradient-text">divertidas</span></h2>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.slice(0, 10).map((c, i) => (
            <Link
              key={c.id}
              to="/tienda"
              search={{ cat: c.id }}
              className="card-fun p-4 hover-pop text-center"
              style={{ animation: `pop-in .5s cubic-bezier(.34,1.56,.64,1) ${i * 0.04}s both` }}
            >
              <div className="mx-auto h-12 w-12 rounded-2xl grid place-items-center bg-secondary text-secondary-foreground">
                <c.icon className="h-6 w-6" />
              </div>
              <div className="mt-2 font-display font-bold text-sm leading-tight">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ofertas */}
      {ofertas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-3xl sm:text-4xl font-black font-display">Ofertas 🔥</h2>
            <Link to="/tienda" className="text-primary font-black hover:underline inline-flex items-center gap-1">
              Ver todo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {ofertas.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Destacados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="text-3xl sm:text-4xl font-black font-display">Los más <span className="gradient-text">pedidos</span></h2>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {destacados.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA mayorista */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="card-fun p-8 text-center bg-secondary/40">
          <h2 className="text-3xl font-black font-display">¿Comprás por cantidad?</h2>
          <p className="text-muted-foreground mt-2">Creá tu cuenta mayorista y accedé a precios especiales.</p>
          <Link to="/mayorista" className="btn-fun mt-5 inline-flex">Crear cuenta mayorista <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
