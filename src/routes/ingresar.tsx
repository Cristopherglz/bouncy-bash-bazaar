import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { useStore } from "@/lib/store";
import { LogIn } from "lucide-react";

export const Route = createFileRoute("/ingresar")({
  head: () => ({
    meta: [
      { title: "Ingresar a tu cuenta — Papita's" },
      { name: "description", content: "Accedé a tu cuenta de Papita's: clientes mayoristas, empleados, repartidores y administración." },
      { property: "og:title", content: "Ingresar — Papita's" },
      { property: "og:description", content: "Accedé a tu cuenta de Papita's." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ingresar,
});

function Ingresar() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const input = "w-full h-12 px-4 rounded-2xl bg-card border-2 border-border focus:border-primary outline-none font-semibold";

  return (
    <SiteLayout>
      <section className="max-w-md mx-auto px-4 py-12">
        <div className="card-fun p-6 sm:p-8">
          <h1 className="text-3xl font-black font-display">
            Ingresá a <span className="gradient-text">Papita's</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Cuentas mayoristas y equipo del negocio.</p>
          <div className="mt-5 space-y-3">
            <input className={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={input} type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-sm text-destructive font-bold">{error}</p>}
            <button
              className="btn-fun w-full"
              onClick={() => {
                const r = login(email, password);
                if (!r.ok) return setError(r.error!);
                navigate({ to: "/panel" });
              }}
            >
              <LogIn className="h-4 w-4" /> Ingresar
            </button>
          </div>
          <p className="mt-4 text-sm text-center">
            ¿No tenés cuenta?{" "}
            <Link to="/mayorista" className="text-primary font-black hover:underline">Creá tu cuenta mayorista</Link>
          </p>
          <div className="mt-5 rounded-2xl bg-secondary/40 p-4 text-xs font-semibold space-y-1">
            <div>Accesos de prueba (contraseña: papitas)</div>
            <div>admin@papitas.com · empleado@papitas.com · repartidor@papitas.com · mayorista@papitas.com</div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}