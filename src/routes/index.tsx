import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { CATEGORIES, INITIAL_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, PartyPopper, Truck, ShieldCheck, Sparkles } from "lucide-react";
import papitas from "/images/papitas-logo.png?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papita's — Copetín & Cotillón para fiestas" },
      { name: "description", content: "Todo para tu fiesta en Posadas: globos, kits temáticos, piñatas, snacks y golosinas. Envíos a domicilio y retiro en el local." },
      { property: "og:title", content: "Papita's — Copetín & Cotillón" },
      { property: "og:description", content: "Todo para tu fiesta: globos, kits temáticos, piñatas, snacks y golosinas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = INITIAL_PRODUCTS.filter((p) => p.discountPct > 0).slice(0, 8);
  const topCats = CATEGORIES.slice(0, 8);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-secondary/80 text-secondary-foreground rounded-full px-3 py-1 text-xs font-bold font-display animate-pop-in">
              <Sparkles className="h-3.5 w-3.5" /> ¡La fiesta empieza acá!
            </div>
            <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-black font-display leading-[0.95]">
              Copetín, cotillón <br />
              y <span className="gradient-text">mucha diversión</span> 🎉
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Papita's es tu tienda favorita para armar la mejor fiesta: globos, kits temáticos, piñatas, snacks salados y golosinas. Todo en un solo lugar.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link to="/tienda" className="btn-fun">
                Ver la tienda <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#categorias" className="btn-sunny">
                Explorar categorías
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Truck, t: "Envíos" },
                { icon: ShieldCheck, t: "Pago seguro" },
                { icon: PartyPopper, t: "+500 productos" },
              ].map((f) => (
                <div key={f.t} className="card-fun px-3 py-2.5 flex items-center gap-2 text-sm font-semibold">
                  <f.icon className="h-4 w-4 text-primary" />
                  {f.t}
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual: floating logo + orbiting emojis */}
          <div className="relative h-[380px] sm:h-[460px]">
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-secondary/70 via-accent/40 to-primary/40 rotate-2 shadow-[var(--shadow-fun)]" />
            <div className="absolute inset-0 grid place-items-center">
              <img
                src={papitas}
                alt="Papita's"
                className="max-w-[80%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(220,38,38,0.35)] animate-float-y"
              />
            </div>
            {[
              { e: "🎈", top: "8%", left: "10%", d: "0s" },
              { e: "🎉", top: "20%", right: "8%", d: "0.4s" },
              { e: "🍿", bottom: "18%", left: "6%", d: "0.8s" },
              { e: "🎂", bottom: "10%", right: "12%", d: "0.2s" },
              { e: "🍭", top: "50%", left: "-2%", d: "0.6s" },
              { e: "🎁", top: "40%", right: "-2%", d: "1s" },
            ].map((s, i) => (
              <span
                key={i}
                className="absolute text-4xl sm:text-5xl"
                style={{
                  top: (s as any).top,
                  left: (s as any).left,
                  right: (s as any).right,
                  bottom: (s as any).bottom,
                  animation: `float-y 4s ease-in-out ${s.d} infinite`,
                }}
              >
                {s.e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black font-display">Elegí tu vibe 🎈</h2>
            <p className="text-muted-foreground">Encontrá todo lo que tu fiesta necesita por categoría.</p>
          </div>
          <Link to="/tienda" className="text-primary font-bold font-display inline-flex items-center gap-1 hover:gap-2 transition-all">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {topCats.map((c, i) => (
            <Link
              key={c.id}
              to="/tienda"
              search={{ cat: c.id }}
              className="group card-fun p-4 flex items-center gap-3 hover-pop"
              style={{ animation: `pop-in .4s cubic-bezier(.34,1.56,.64,1) ${i * 0.05}s both` }}
            >
              <span
                className="h-12 w-12 rounded-2xl grid place-items-center text-white shrink-0 group-hover:animate-wiggle"
                style={{ background: c.color }}
              >
                <c.icon className="h-6 w-6" />
              </span>
              <span className="font-display font-bold leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black font-display">Ofertas 🔥</h2>
            <p className="text-muted-foreground">Los favoritos de esta semana, con descuento.</p>
          </div>
          <Link to="/tienda" className="btn-sunny !py-2 !px-4 text-sm">Ver más ofertas</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <div className="absolute -right-8 -top-8 text-[10rem] opacity-20 select-none">🎉</div>
          <div className="absolute -left-6 -bottom-10 text-[8rem] opacity-20 select-none">🎈</div>
          <div className="relative">
            <h3 className="text-3xl sm:text-5xl font-black font-display max-w-2xl">
              Armamos tu kit temático a medida ✨
            </h3>
            <p className="mt-3 max-w-xl opacity-90">
              Contanos tu idea y armamos el combo perfecto para tu cumple, casamiento, egresados o evento.
            </p>
            <div className="mt-6">
              <Link to="/tienda" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-5 py-3 font-black font-display shadow hover:scale-105 transition-transform">
                Empezar ahora <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
