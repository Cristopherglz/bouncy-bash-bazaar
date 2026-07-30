import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { useStore } from "@/lib/store";
import { Search } from "lucide-react";

export const Route = createFileRoute("/seguimiento")({
  head: () => ({
    meta: [
      { title: "Seguimiento de pedido — Papita's" },
      { name: "description", content: "Ingresá tu código de pedido y seguí el estado de tu compra en Papita's." },
      { property: "og:title", content: "Seguimiento de pedido — Papita's" },
      { property: "og:description", content: "Seguí el estado de tu compra paso a paso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Seguimiento,
});

function Seguimiento() {
  const { orders } = useStore();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <SiteLayout>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-black font-display">
          Seguí tu <span className="gradient-text">pedido</span> 📦
        </h1>
        <p className="text-muted-foreground">Ingresá el código que te dimos al finalizar la compra.</p>
        <div className="mt-6 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="PAP-XXXXX"
            className="flex-1 h-12 px-4 rounded-full bg-card border-2 border-border focus:border-primary outline-none font-black font-display tracking-wider"
          />
          <button
            className="btn-fun"
            onClick={() => {
              const o = orders.find((x) => x.id === code.trim());
              if (!o) return setError("No encontramos un pedido con ese código.");
              navigate({ to: "/pedido/$id", params: { id: o.id } });
            }}
          >
            <Search className="h-4 w-4" /> Buscar
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-destructive font-bold">{error}</p>}

        {orders.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display font-black text-xl mb-3">Tus últimos pedidos</h2>
            <div className="space-y-2">
              {orders.slice(0, 5).map((o) => (
                <button
                  key={o.id}
                  onClick={() => navigate({ to: "/pedido/$id", params: { id: o.id } })}
                  className="w-full card-fun p-4 text-left hover-pop flex items-center justify-between gap-3"
                >
                  <span className="font-black font-display">{o.id}</span>
                  <span className="text-sm text-muted-foreground">{o.date} · {o.time}</span>
                  <span className="text-sm font-bold text-primary capitalize">{o.status.replace("_", " ")}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}