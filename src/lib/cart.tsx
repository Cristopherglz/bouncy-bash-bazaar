import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { INITIAL_PRODUCTS, type Product } from "./mock-data";

type CartMap = Record<string, number>;

type CartCtx = {
  products: Product[];
  cart: CartMap;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lastAdded: string | null;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "papitas.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const products = INITIAL_PRODUCTS;
  const [cart, setCart] = useState<CartMap>({});
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  const add: CartCtx["add"] = (id, qty = 1) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
    setLastAdded(id);
    setTimeout(() => setLastAdded((v) => (v === id ? null : v)), 900);
  };
  const remove: CartCtx["remove"] = (id) =>
    setCart((c) => {
      const n = { ...c };
      delete n[id];
      return n;
    });
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setCart((c) => {
      if (qty <= 0) {
        const n = { ...c };
        delete n[id];
        return n;
      }
      return { ...c, [id]: qty };
    });
  const clear = () => setCart({});

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const [id, qty] of Object.entries(cart)) {
      const p = products.find((x) => x.id === id);
      if (!p) continue;
      count += qty;
      const price = p.discountPct > 0 ? p.price * (1 - p.discountPct / 100) : p.price;
      subtotal += price * qty;
    }
    return { count, subtotal };
  }, [cart, products]);

  return (
    <Ctx.Provider value={{ products, cart, add, remove, setQty, clear, count, subtotal, lastAdded }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function formatARS(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}