import { useEffect, useState, type ReactNode } from "react";
import { JumpingLogoLoader } from "./jumping-logo-loader";

export function AppLoaderGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return <JumpingLogoLoader />;
  return <>{children}</>;
}