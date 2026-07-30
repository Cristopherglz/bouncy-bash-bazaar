import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Role = "admin" | "empleado" | "repartidor" | "mayorista" | "cliente";

export type User = {
  email: string;
  name: string;
  role: Role;
  password: string;
  business?: string;
  cuit?: string;
  approved?: boolean;
};

export type OrderItem = { id: string; name: string; qty: number; price: number; image: string };

export type OrderStatus = "pendiente" | "preparando" | "en_camino" | "entregado";

export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; email: string };
  mode: "envio" | "retiro";
  address?: string;
  city?: string;
  notes?: string;
  date: string;
  time: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: "mercadopago";
  status: OrderStatus;
  courier?: string;
};

export const ORDER_STEPS: { key: OrderStatus; label: string }[] = [
  { key: "pendiente", label: "Pago acreditado" },
  { key: "preparando", label: "Preparando el pedido" },
  { key: "en_camino", label: "En camino / listo para retirar" },
  { key: "entregado", label: "Entregado" },
];

const SEED_USERS: User[] = [
  { email: "admin@papitas.com", name: "Cristopher (Admin)", role: "admin", password: "papitas" },
  { email: "empleado@papitas.com", name: "Sofía (Salón)", role: "empleado", password: "papitas" },
  { email: "repartidor@papitas.com", name: "Marcos (Delivery)", role: "repartidor", password: "papitas" },
  {
    email: "mayorista@papitas.com",
    name: "Kiosco La Esquina",
    role: "mayorista",
    password: "papitas",
    business: "Kiosco La Esquina",
    cuit: "30-11111111-9",
    approved: true,
  },
];

type Ctx = {
  user: User | null;
  users: User[];
  orders: Order[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  registerWholesale: (data: Omit<User, "role" | "approved">) => { ok: boolean; error?: string };
  logout: () => void;
  createOrder: (o: Omit<Order, "id" | "createdAt" | "status">) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  approveUser: (email: string) => void;
};

const C = createContext<Ctx | null>(null);
const UK = "papitas.users.v1";
const SK = "papitas.session.v1";
const OK_ = "papitas.orders.v1";

function load<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUsers(load(UK, SEED_USERS));
    setOrders(load(OK_, [] as Order[]));
    setUser(load(SK, null as User | null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(UK, JSON.stringify(users));
    localStorage.setItem(OK_, JSON.stringify(orders));
    if (user) localStorage.setItem(SK, JSON.stringify(user));
    else localStorage.removeItem(SK);
  }, [users, orders, user, hydrated]);

  const value: Ctx = useMemo(
    () => ({
      user,
      users,
      orders,
      login: (email, password) => {
        const u = users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
        if (!u || u.password !== password) return { ok: false, error: "Email o contraseña incorrectos." };
        setUser(u);
        return { ok: true };
      },
      registerWholesale: (data) => {
        if (users.some((x) => x.email.toLowerCase() === data.email.trim().toLowerCase()))
          return { ok: false, error: "Ya existe una cuenta con ese email." };
        const u: User = { ...data, email: data.email.trim(), role: "mayorista", approved: false };
        setUsers((s) => [...s, u]);
        setUser(u);
        return { ok: true };
      },
      logout: () => setUser(null),
      createOrder: (o) => {
        const id = `PAP-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        const order: Order = { ...o, id, createdAt: new Date().toISOString(), status: "pendiente" };
        setOrders((s) => [order, ...s]);
        return order;
      },
      setOrderStatus: (id, status) =>
        setOrders((s) => s.map((o) => (o.id === id ? { ...o, status } : o))),
      approveUser: (email) =>
        setUsers((s) => s.map((u) => (u.email === email ? { ...u, approved: true } : u))),
    }),
    [user, users, orders],
  );

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useStore() {
  const c = useContext(C);
  if (!c) throw new Error("useStore must be used inside AppStoreProvider");
  return c;
}