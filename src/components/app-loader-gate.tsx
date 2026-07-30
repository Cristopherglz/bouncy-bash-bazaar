import { useEffect, useState, type ReactNode } from "react";
import { PapitasLoader } from "./papitas-loader";

export function AppLoaderGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return <PapitasLoader />;
  return <>{children}</>;
}