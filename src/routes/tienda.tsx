import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, INITIAL_PRODUCTS } from "@/lib/mock-data";
import { Search, SlidersHorizontal } from "lucide-react";

const searchSchema = z.object({
  cat: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/tienda")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Tienda — Papita's" },
      { name: "description", content: "Explorá todos los productos de Papita's: cotillón, snacks, golosinas, globos y kits temáticos." },
      { property: "og:title", content: "Tienda Papita's" },
      { property: "og:description", content: "Cotillón, snacks y kits temáticos para tu fiesta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tienda,
});

function Tienda() {
  const { cat, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");

  const filtered = useMemo(() => {
    let list = INITIAL_PRODUCTS.filter((p) => p.publishedOnline);
    if (cat) list = list.filter((p) => p.category === cat);
    if (query.trim()) {
      const t = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t));
    }
    return list;
  }, [cat, query]);

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Tienda</span>
        </div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-black font-display">
          Todos los <span className="gradient-text">productos</span>
        </h1>
        <p className="text-muted-foreground">Filtrá por categoría o buscá lo que necesites.</p>

        <div className="mt-6 flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar globos, kits, golosinas..."
              className="w-full h-12 pl-11 pr-4 rounded-full bg-card border-2 border-border focus:border-primary outline-none font-semibold shadow-[var(--shadow-fun)]"
            />
          </div>
          {cat && (
            <button
              onClick={() => navigate({ search: { q: query || undefined } })}
              className="btn-sunny !py-2 !px-4 text-sm"
            >
              <SlidersHorizontal className="h-4 w-4" /> Quitar filtro
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="mt-5 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 pb-2 w-max">
            <button
              onClick={() => navigate({ search: { q: query || undefined } })}
              className={`px-4 py-2 rounded-full font-display font-bold text-sm whitespace-nowrap border-2 transition ${
                !cat ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-pop)]" : "bg-card border-border hover:border-primary"
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => navigate({ search: { cat: c.id, q: query || undefined } })}
                  className={`px-4 py-2 rounded-full font-display font-bold text-sm whitespace-nowrap border-2 transition inline-flex items-center gap-2 ${
                    active ? "text-white border-transparent shadow-[var(--shadow-pop)]" : "bg-card border-border hover:border-primary"
                  }`}
                  style={active ? { background: c.color } : {}}
                >
                  <c.icon className="h-4 w-4" />
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {filtered.length === 0 ? (
          <div className="card-fun p-10 text-center">
            <div className="text-6xl mb-3">🎈</div>
            <p className="font-display text-xl font-bold">No encontramos productos con ese filtro.</p>
            <p className="text-muted-foreground">Probá con otra búsqueda o categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}