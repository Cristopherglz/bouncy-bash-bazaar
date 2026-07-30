import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { useStore } from "@/lib/store";
import { BadgePercent, PackageCheck, HandCoins, UserPlus } from "lucide-react";

export const Route = createFileRoute("/mayorista")({
  head: () => ({
    meta: [
      { title: "Cuenta mayorista — Papita's Copetín & Cotillón" },
      { name: "description", content: "Creá tu cuenta mayorista en Papita's y accedé a precios especiales por volumen en cotillón y copetín." },
      { property: "og:title", content: "Cuenta mayorista — Papita's" },
      { property: "og:description", content: "Precios especiales por volumen para kioscos, salones y organizadores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mayorista,
});

function Mayorista() {
  const { registerWholesale } = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", business: "", cuit: "", email: "", password: "" });
  const [error, setError] = useState("");
  const input = "w-full h-12 px-4 rounded-2xl bg-card border-2 border-border focus:border-primary outline-none font-semibold";
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((s) => ({ ...s, [k]: e.target.value }));

  return (
    <SiteLayout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <span className="inline-block rounded-full bg-secondary px-4 py-1 font-display font-bold text-secondary-foreground text-sm">
            Mayoristas
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black font-display">
            Comprá por <span className="gradient-text">mayor</span> y ganá más
          </h1>
          <p className="mt-2 text-muted-foreground">
            Para kioscos, salones, organizadores de eventos y revendedores de Posadas y la región.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { i: BadgePercent, t: "Hasta 25% de descuento", d: "Precios mayoristas en todo el catálogo." },
              { i: PackageCheck, t: "Stock reservado", d: "Te avisamos antes de que se agote lo que más vendés." },
              { i: HandCoins, t: "Cuenta corriente", d: "Pagá con Mercado Pago en cuotas o por transferencia." },
            ].map((b) => (
              <div key={b.t} className="card-fun p-4 flex gap-3 items-start hover-pop">
                <b.i className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <div className="font-display font-black">{b.t}</div>
                  <div className="text-sm text-muted-foreground">{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-fun p-6">
          <h2 className="font-display font-black text-2xl">Crear cuenta mayorista</h2>
          <div className="mt-4 space-y-3">
            <input className={input} placeholder="Nombre y apellido" value={f.name} onChange={set("name")} />
            <input className={input} placeholder="Nombre del comercio" value={f.business} onChange={set("business")} />
            <input className={input} placeholder="CUIT" value={f.cuit} onChange={set("cuit")} />
            <input className={input} placeholder="Email" type="email" value={f.email} onChange={set("email")} />
            <input className={input} placeholder="Contraseña" type="password" value={f.password} onChange={set("password")} />
            {error && <p className="text-sm text-destructive font-bold">{error}</p>}
            <button
              className="btn-fun w-full"
              onClick={() => {
                if (!f.name || !f.business || !f.email || !f.password) return setError("Completá todos los campos.");
                const r = registerWholesale(f);
                if (!r.ok) return setError(r.error!);
                navigate({ to: "/panel" });
              }}
            >
              <UserPlus className="h-4 w-4" /> Crear cuenta
            </button>
            <p className="text-sm text-center">
              ¿Ya tenés cuenta? <Link to="/ingresar" className="text-primary font-black hover:underline">Ingresá</Link>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}