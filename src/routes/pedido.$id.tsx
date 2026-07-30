import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { formatARS } from "@/lib/cart";
import { ORDER_STEPS, useStore } from "@/lib/store";
import { CheckCircle2, Truck, Store, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pedido/$id")({
  head: () => ({
    meta: [
      { title: "¡Pedido confirmado! — Papita's" },
      { name: "description", content: "Tu pedido de Papita's fue confirmado. Seguí el estado en tiempo real." },
      { property: "og:title", content: "Pedido confirmado — Papita's" },
      { property: "og:description", content: "Seguí el estado de tu pedido de Papita's." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PedidoPage,
});

function PedidoPage() {
  const { id } = Route.useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <SiteLayout>
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🔎</div>
          <h1 className="text-3xl font-black font-display">No encontramos ese pedido</h1>
          <Link to="/seguimiento" className="btn-fun mt-6 inline-flex">Buscar otro pedido</Link>
        </section>
      </SiteLayout>
    );
  }

  const stepIdx = ORDER_STEPS.findIndex((s) => s.key === order.status);

  return (
    <SiteLayout>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="card-fun p-6 sm:p-8 text-center">
          <div className="text-6xl mb-2 animate-float-y">🎉</div>
          <h1 className="text-3xl sm:text-4xl font-black font-display gradient-text">¡Pago acreditado!</h1>
          <p className="text-muted-foreground mt-2">
            Tu pedido <span className="font-black text-foreground">{order.id}</span> fue confirmado con Mercado Pago.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-display font-bold text-secondary-foreground">
            {order.mode === "envio" ? <Truck className="h-4 w-4" /> : <Store className="h-4 w-4" />}
            {order.mode === "envio" ? `Envío el ${order.date} · ${order.time}` : `Retiro el ${order.date} · ${order.time}`}
          </div>
        </div>

        <div className="card-fun p-6 mt-5">
          <h2 className="font-display font-black text-xl mb-4">Seguimiento del pedido</h2>
          <ol className="space-y-4">
            {ORDER_STEPS.map((s, i) => {
              const done = i <= stepIdx;
              return (
                <li key={s.key} className="flex items-start gap-3">
                  <div className={`h-8 w-8 shrink-0 rounded-full grid place-items-center border-2 ${done ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-black">{i + 1}</span>}
                  </div>
                  <div>
                    <div className={`font-display font-bold ${done ? "" : "text-muted-foreground"}`}>{s.label}</div>
                    {i === stepIdx && <div className="text-sm text-primary font-semibold">Estado actual</div>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="card-fun p-6 mt-5">
          <h2 className="font-display font-black text-xl mb-3">Detalle</h2>
          <div className="space-y-2">
            {order.items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 text-sm">
                <img src={it.image} alt={it.name} className="h-12 w-12 rounded-xl object-cover" />
                <span className="flex-1 min-w-0 truncate font-semibold">{it.qty}× {it.name}</span>
                <span className="font-bold">{formatARS(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3 flex justify-between items-baseline">
            <span className="font-display font-bold">Total pagado</span>
            <span className="font-display font-black text-2xl gradient-text">{formatARS(order.total)}</span>
          </div>
          {order.mode === "envio" && (
            <p className="text-sm text-muted-foreground mt-2">Enviamos a: {order.address}, {order.city}</p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link to="/tienda" className="btn-fun">Seguir comprando <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/seguimiento" className="btn-sunny">Ver seguimiento</Link>
        </div>
      </section>
    </SiteLayout>
  );
}