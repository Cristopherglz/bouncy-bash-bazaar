import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Sparkles, Store, UserRound, LayoutDashboard } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useStore } from "@/lib/store";
import type { ReactNode } from "react";
import papitas from "/images/papitas-logo.png?url";
import { FloatingCart } from "./floating-cart";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { count } = useCart();
  const { user } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/tienda" as const, label: "Tienda", icon: Store },
    { to: "/mayorista" as const, label: "Mayorista", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-black/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center gap-3">
          <Link to="/" className="shrink-0 flex items-center gap-2 group" aria-label="Papita's">
            <img
              src={papitas}
              alt="Papita's"
              className="h-16 sm:h-[72px] w-auto object-contain transition-transform group-hover:animate-wiggle"
            />
          </Link>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              const active = path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-4 py-2 rounded-full text-sm font-bold font-display transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-pop)]"
                      : "text-black/80 hover:bg-secondary/60"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            {user ? (
              <Link
                to="/panel"
                className="px-4 py-2 rounded-full text-sm font-bold font-display text-black/80 hover:bg-secondary/60 inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" /> Panel
              </Link>
            ) : (
              <Link
                to="/ingresar"
                className="px-4 py-2 rounded-full text-sm font-bold font-display text-black/80 hover:bg-secondary/60 inline-flex items-center gap-2"
              >
                <UserRound className="h-4 w-4" /> Ingresar
              </Link>
            )}
          </nav>
          <Link
            to={user ? "/panel" : "/ingresar"}
            className="md:hidden h-11 w-11 rounded-full border-2 border-black/10 grid place-items-center text-black"
            aria-label={user ? "Panel" : "Ingresar"}
          >
            <UserRound className="h-5 w-5" />
          </Link>
          <Link
            to="/carrito"
            className="relative inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 font-display font-bold shadow-[var(--shadow-pop)] hover-pop"
            aria-label={`Carrito con ${count} productos`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span
                key={count}
                className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-secondary text-secondary-foreground text-xs font-black grid place-items-center animate-pop-in border-2 border-background"
              >
                {count}
              </span>
            )}
          </Link>
        </div>
        <div className="bg-primary text-primary-foreground overflow-hidden text-sm font-semibold border-t border-primary/50">
          <div className="whitespace-nowrap animate-marquee inline-flex gap-8 py-1.5 pr-8">
            {Array.from({ length: 2 }).map((_, r) => (
              <div key={r} className="inline-flex gap-8 pr-8">
                <span>🎉 Envíos a todo Posadas</span>
                <span>🎈 10% off en globos temáticos</span>
                <span>🍿 Copetín + Cotillón en un solo lugar</span>
                <span>🎁 Kits temáticos para 12 personas</span>
                <span>✨ Retiro gratis en el local</span>
                <span>🎂 Piñatas artesanales</span>
              </div>
            ))}
          </div>
        </div>
      </header>
      <div className="h-[104px]" />
      <main className="flex-1">{children}</main>
      <FloatingCart />
      <footer className="mt-24">
        <div className="bg-white text-black border-t border-black/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <img src={papitas} alt="Papita's" className="h-16 w-auto mb-4" />
              <p className="text-sm opacity-80">
                Copetín & Cotillón. Todo lo que tu fiesta necesita, en un solo lugar divertido.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg mb-3">Tienda</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/tienda">Ver catálogo</Link></li>
                <li><Link to="/carrito">Mi carrito</Link></li>
                <li><Link to="/seguimiento">Seguir mi pedido</Link></li>
                <li><Link to="/mayorista">Cuenta mayorista</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg mb-3">Contacto</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Posadas, Misiones 🇦🇷</li>
                <li>WhatsApp: +54 9 376 000 000</li>
                <li>hola@papitas.com.ar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg mb-3">Pagos</h4>
              <div className="flex flex-wrap gap-2">
                {["Mercado Pago", "Tarjeta de crédito", "Tarjeta de débito"].map((m) => (
                  <span key={m} className="text-xs bg-black/5 rounded-full px-3 py-1 font-semibold">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-black/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs opacity-70 flex flex-wrap gap-2 justify-between">
              <span>© {new Date().getFullYear()} Papita's — Copetín & Cotillón</span>
              <span className="inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> Desarrollado por Komuna Creativa&nbsp;</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}