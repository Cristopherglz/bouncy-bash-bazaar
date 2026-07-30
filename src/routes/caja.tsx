import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { formatARS, useCart } from "@/lib/cart";
import { useStore } from "@/lib/store";
import { Truck, Store, CalendarDays, Clock, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/caja")({
  head: () => ({
    meta: [
      { title: "Caja — Finalizá tu pedido | Papita's" },
      { name: "description", content: "Elegí envío o retiro, fecha y horario, y pagá con Mercado Pago tu pedido de Papita's." },
      { property: "og:title", content: "Caja — Papita's" },
      { property: "og:description", content: "Envío o retiro, fecha, horario y pago con Mercado Pago." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Caja,
});

const TIMES = ["10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00"];

function Caja() {
  const { cart, products, subtotal, count, clear } = useCart();
  const { createOrder } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"envio" | "retiro">("envio");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Posadas",
    notes: "",
    date: "",
    time: TIMES[0],
  });
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  const shipping = mode === "retiro" ? 0 : subtotal > 0 && subtotal < 20000 ? 2500 : 0;
  const total = subtotal + shipping;

  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      if (!p) return null;
      const price = p.discountPct > 0 ? p.price * (1 - p.discountPct / 100) : p.price;
      return { p, qty, price };
    })
    .filter(Boolean) as { p: (typeof products)[number]; qty: number; price: number }[];

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const pay = () => {
    if (!form.name || !form.phone || !form.email || !form.date) {
      setError("Completá nombre, teléfono, email y fecha.");
      return;
    }
    if (mode === "envio" && !form.address) {
      setError("Ingresá la dirección de envío.");
      return;
    }
    setError("");
    setPaying(true);
    // Simulación del retorno de Mercado Pago
    setTimeout(() => {
      const order = createOrder({
        customer: { name: form.name, phone: form.phone, email: form.email },
        mode,
        address: mode === "envio" ? form.address : undefined,
        city: form.city,
        notes: form.notes,
        date: form.date,
        time: form.time,
        items: lines.map((l) => ({ id: l.p.id, name: l.p.name, qty: l.qty, price: l.price, image: l.p.image })),
        subtotal,
        shipping,
        total,
        payment: "mercadopago",
      });
      clear();
      navigate({ to: "/pedido/$id", params: { id: order.id } });
    }, 1400);
  };

  const input =
    "w-full h-12 px-4 rounded-2xl bg-card border-2 border-border focus:border-primary outline-none font-semibold";

  if (count === 0) {
    return (
      <SiteLayout>
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-7xl mb-4 animate-float-y">🛒</div>
          <h1 className="text-3xl font-black font-display">Tu carrito está vacío</h1>
          <Link to="/tienda" className="btn-fun mt-6 inline-flex">Ir a la tienda <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl sm:text-5xl font-black font-display">
          <span className="gradient-text">Caja</span> 🎁
        </h1>
        <p className="text-muted-foreground">Datos de entrega, fecha y pago seguro con Mercado Pago.</p>

        <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-5">
            <div className="card-fun p-5">
              <h2 className="font-display font-black text-xl mb-3">¿Cómo lo querés recibir?</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {([
                  { k: "envio", icon: Truck, t: "Envío a domicilio", d: "Posadas y alrededores" },
                  { k: "retiro", icon: Store, t: "Retiro en el local", d: "Sin costo, listo en 2 hs" },
                ] as const).map((o) => (
                  <button
                    key={o.k}
                    onClick={() => setMode(o.k)}
                    className={`text-left p-4 rounded-2xl border-2 transition ${
                      mode === o.k ? "border-primary bg-primary/5 shadow-[var(--shadow-pop)]" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <o.icon className="h-6 w-6 text-primary" />
                    <div className="font-display font-black mt-2">{o.t}</div>
                    <div className="text-sm text-muted-foreground">{o.d}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-fun p-5 space-y-3">
              <h2 className="font-display font-black text-xl">Tus datos</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input className={input} placeholder="Nombre y apellido" value={form.name} onChange={set("name")} />
                <input className={input} placeholder="Teléfono / WhatsApp" value={form.phone} onChange={set("phone")} />
                <input className={input} placeholder="Email" type="email" value={form.email} onChange={set("email")} />
                <input className={input} placeholder="Ciudad" value={form.city} onChange={set("city")} />
              </div>
              {mode === "envio" ? (
                <input className={input} placeholder="Dirección (calle, número, piso/depto)" value={form.address} onChange={set("address")} />
              ) : (
                <div className="rounded-2xl bg-secondary/40 p-4 text-sm font-semibold">
                  📍 Retirás en: Av. Uruguay 1234, Posadas, Misiones. Lunes a sábado de 9 a 20 hs.
                </div>
              )}
              <textarea
                className="w-full min-h-24 p-4 rounded-2xl bg-card border-2 border-border focus:border-primary outline-none font-semibold"
                placeholder="Notas para el pedido (opcional)"
                value={form.notes}
                onChange={set("notes")}
              />
            </div>

            <div className="card-fun p-5 space-y-3">
              <h2 className="font-display font-black text-xl">Fecha y horario</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-bold inline-flex items-center gap-1 mb-1"><CalendarDays className="h-4 w-4 text-primary" /> Fecha</span>
                  <input type="date" className={input} value={form.date} onChange={set("date")} min={new Date().toISOString().slice(0, 10)} />
                </label>
                <label className="block">
                  <span className="text-sm font-bold inline-flex items-center gap-1 mb-1"><Clock className="h-4 w-4 text-primary" /> Franja horaria</span>
                  <select className={input} value={form.time} onChange={set("time")}>
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="card-fun p-5">
              <h2 className="font-display font-black text-xl">Pago</h2>
              <div className="mt-3 p-4 rounded-2xl border-2 border-primary bg-primary/5 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[#009ee3] grid place-items-center text-white shrink-0">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-black">Mercado Pago</div>
                  <div className="text-sm text-muted-foreground">Tarjeta de crédito, débito o dinero en cuenta.</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Pago protegido y encriptado.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 self-start card-fun p-5 space-y-3">
            <h3 className="font-display font-black text-xl">Resumen</h3>
            <div className="space-y-2 max-h-64 overflow-auto no-scrollbar">
              {lines.map((l) => (
                <div key={l.p.id} className="flex items-center gap-2 text-sm">
                  <img src={l.p.image} alt={l.p.name} className="h-10 w-10 rounded-xl object-cover" />
                  <span className="flex-1 min-w-0 truncate font-semibold">{l.qty}× {l.p.name}</span>
                  <span className="font-bold">{formatARS(l.price * l.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">{formatARS(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span className="font-bold">{shipping === 0 ? "Gratis 🎉" : formatARS(shipping)}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-baseline">
              <span className="font-display font-bold">Total</span>
              <span className="font-display font-black text-2xl gradient-text">{formatARS(total)}</span>
            </div>
            {error && <p className="text-sm text-destructive font-bold">{error}</p>}
            <button onClick={pay} disabled={paying} className="btn-fun w-full disabled:opacity-70">
              {paying ? "Redirigiendo a Mercado Pago..." : "Pagar con Mercado Pago"}
            </button>
            <Link to="/carrito" className="block text-center text-sm text-primary font-bold hover:underline">
              Volver al carrito
            </Link>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}