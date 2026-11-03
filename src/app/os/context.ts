import { createContext, useContext } from "react";
import type { ThemeState } from "./theme";

export interface OSApi {
  openApp: (appId: string, props?: Record<string, unknown>) => void;
  closeApp: (appId: string) => void;
  theme: ThemeState;
  setTheme: (patch: Partial<ThemeState>) => void;
  binEmpty: boolean;
  emptyBin: () => void;
  shutdown: (mode: "shutdown" | "restart" | "logoff") => void;
  isMobile: boolean;
}

export const OSContext = createContext<OSApi | null>(null);

export function useOS() {
  const os = useContext(OSContext);
  if (!os) throw new Error("useOS must be used inside the desktop");
  return os;
}

/* Props handed to every app rendered inside a window */
export interface AppProps {
  windowId: string;
  props?: Record<string, unknown>;
  close: () => void;
  setTitle: (title: string) => void;
}
