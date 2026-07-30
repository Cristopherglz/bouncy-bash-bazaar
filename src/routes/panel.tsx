import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { formatARS } from "@/lib/cart";
import { INITIAL_PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { ORDER_STEPS, useStore, type OrderStatus } from "@/lib/store";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Bike,
  BarChart3,
  LogOut,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel de control — Papita's" },
      { name: "description", content: "Panel de administración, empleados y repartidores de Papita's: pedidos, stock, ventas y entregas." },
      { property: "og:title", content: "Panel de control — Papita's" },
      { property: "og:description", content: "Gestión de pedidos, stock, ventas y entregas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Panel,
});

type SectionKey = "resumen" | "pedidos" | "productos" | "clientes" | "entregas" | "reportes";

const ALL_SECTIONS: { key: SectionKey; label: string; icon: typeof Package }[] = [
  { key: "resumen", label: "Resumen", icon: LayoutDashboard },
  { key: "pedidos", label: "Pedidos", icon: ShoppingCart },
  { key: "productos", label: "Productos y stock", icon: Package },
  { key: "clientes", label: "Clientes mayoristas", icon: Users },
  { key: "entregas", label: "Entregas", icon: Bike },
  { key: "reportes", label: "Reportes", icon: BarChart3 },
];

const BY_ROLE: Record<string, SectionKey[]> = {
  admin: ["resumen", "pedidos", "productos", "clientes", "entregas", "reportes"],
  empleado: ["resumen", "pedidos", "productos"],
  repartidor: ["entregas"],
  mayorista: ["resumen", "pedidos"],
  cliente: ["pedidos"],
};

function Panel() {
  const { user, logout, orders, setOrderStatus, users, approveUser } = useStore();
  const allowed = user ? BY_ROLE[user.role] : [];
  const [section, setSection] = useState<SectionKey>(allowed[0] ?? "resumen");

  if (!user) {
    return (
      <SiteLayout>
        <section className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-3">🔐</div>
          <h1 className="text-3xl font-black font-display">Necesitás iniciar sesión</h1>
          <Link to="/ingresar" className="btn-fun mt-6 inline-flex">Ingresar</Link>
        </section>
      </SiteLayout>
    );
  }

  const sections = ALL_SECTIONS.filter((s) => allowed.includes(s.key));
  const active = allowed.includes(section) ? section : allowed[0];
  const ventas = orders.reduce((a, o) => a + o.total, 0);
  const lowStock = INITIAL_PRODUCTS.filter((p) => p.stock <= p.minStock);

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-3xl sm:text-4xl font-black font-display">
              Panel <span className="gradient-text capitalize">{user.role}</span>
            </h1>
            <p className="text-muted-foreground text-sm truncate">{user.name} · {user.email}</p>
          </div>
          <button onClick={logout} className="shrink-0 btn-sunny !py-2 !px-4 text-sm">
            <LogOut className="h-4 w-4" /> Salir
          </button>
        </header>

        <div className="mt-6 grid lg:grid-cols-[240px_1fr] gap-6">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className={`px-4 py-3 rounded-2xl font-display font-bold text-sm whitespace-nowrap inline-flex items-center gap-2 border-2 transition ${
                  active === s.key
                    ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-pop)]"
                    : "bg-card border-border hover:border-primary"
                }`}
              >
                <s.icon className="h-4 w-4" /> {s.label}
              </button>
            ))}
          </nav>

          <div className="min-w-0 space-y-4">
            {active === "resumen" && (
              <>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { t: "Pedidos", v: String(orders.length) },
                    { t: "Ventas", v: formatARS(ventas) },
                    { t: "Productos", v: String(INITIAL_PRODUCTS.length) },
                  ].map((k) => (
                    <div key={k.t} className="card-fun p-5 hover-pop">
                      <div className="text-sm text-muted-foreground font-bold">{k.t}</div>
                      <div className="text-3xl font-black font-display gradient-text">{k.v}</div>
                    </div>
                  ))}
                </div>
                <div className="card-fun p-5">
                  <h3 className="font-display font-black text-lg inline-flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" /> Stock bajo
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {lowStock.slice(0, 6).map((p) => (
                      <li key={p.id} className="flex justify-between gap-3">
                        <span className="truncate font-semibold">{p.name}</span>
                        <span className="font-black text-destructive shrink-0">{p.stock} u.</span>
                      </li>
                    ))}
                    {lowStock.length === 0 && <li className="text-muted-foreground">Todo con stock saludable 🎉</li>}
                  </ul>
                </div>
              </>
            )}

            {active === "pedidos" && (
              <div className="card-fun p-5">
                <h3 className="font-display font-black text-lg mb-3">Pedidos online</h3>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Todavía no hay pedidos registrados.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <div key={o.id} className="rounded-2xl border-2 border-border p-4">
                        <div className="flex flex-wrap gap-2 justify-between items-center">
                          <span className="font-black font-display">{o.id}</span>
                          <span className="text-sm text-muted-foreground">{o.customer.name} · {o.mode} · {o.date} {o.time}</span>
                          <span className="font-black">{formatARS(o.total)}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {ORDER_STEPS.map((s) => (
                            <button
                              key={s.key}
                              onClick={() => setOrderStatus(o.id, s.key as OrderStatus)}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
                                o.status === s.key ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {active === "productos" && (
              <div className="card-fun p-5 overflow-x-auto">
                <h3 className="font-display font-black text-lg mb-3">Productos y stock</h3>
                <table className="w-full text-sm min-w-[560px]">
                  <thead className="text-left text-muted-foreground">
                    <tr>
                      <th className="py-2">Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Mayorista</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INITIAL_PRODUCTS.slice(0, 40).map((p) => (
                      <tr key={p.id} className="border-t border-border">
                        <td className="py-2 pr-3 font-semibold">{p.name}</td>
                        <td className="pr-3">{CATEGORIES.find((c) => c.id === p.category)?.name}</td>
                        <td className="pr-3">{formatARS(p.price)}</td>
                        <td className="pr-3">{formatARS(p.wholesalePrice)}</td>
                        <td className={p.stock <= p.minStock ? "text-destructive font-black" : "font-bold"}>{p.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {active === "clientes" && (
              <div className="card-fun p-5">
                <h3 className="font-display font-black text-lg mb-3">Clientes mayoristas</h3>
                <div className="space-y-2">
                  {users.filter((u) => u.role === "mayorista").map((u) => (
                    <div key={u.email} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-border p-3">
                      <div className="min-w-0">
                        <div className="font-display font-bold truncate">{u.business ?? u.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{u.email} · CUIT {u.cuit ?? "—"}</div>
                      </div>
                      {u.approved ? (
                        <span className="text-xs font-bold text-primary inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Aprobado</span>
                      ) : (
                        <button onClick={() => approveUser(u.email)} className="btn-fun !py-1.5 !px-3 text-xs">Aprobar</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "entregas" && (
              <div className="card-fun p-5">
                <h3 className="font-display font-black text-lg mb-3">Hoja de ruta</h3>
                {orders.filter((o) => o.mode === "envio").length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hay envíos asignados por ahora.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.filter((o) => o.mode === "envio").map((o) => (
                      <div key={o.id} className="rounded-2xl border-2 border-border p-4">
                        <div className="font-black font-display">{o.id} · {o.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{o.address}, {o.city} · {o.date} {o.time}</div>
                        <div className="text-sm">Tel: {o.customer.phone}</div>
                        <div className="mt-2 flex gap-2">
                          <button onClick={() => setOrderStatus(o.id, "en_camino")} className="btn-sunny !py-1.5 !px-3 text-xs">Salí a entregar</button>
                          <button onClick={() => setOrderStatus(o.id, "entregado")} className="btn-fun !py-1.5 !px-3 text-xs">Entregado</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {active === "reportes" && (
              <div className="card-fun p-5">
                <h3 className="font-display font-black text-lg mb-3">Reportes</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-secondary/40 p-4">
                    <div className="text-sm font-bold">Ticket promedio</div>
                    <div className="text-2xl font-black font-display">
                      {formatARS(orders.length ? ventas / orders.length : 0)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-4">
                    <div className="text-sm font-bold">Pedidos entregados</div>
                    <div className="text-2xl font-black font-display">
                      {orders.filter((o) => o.status === "entregado").length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}