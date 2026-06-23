import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

const ADMIN_EMAIL = "qubitedge@gmail.com";
const ADMIN_PASSWORD = "qubitedge@2026";
const AUTH_KEY = "qubitedge.admin.auth";

type AdminContextType = {
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const Ctx = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(AUTH_KEY) === "1";
  });

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(AUTH_KEY, "1");
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(AUTH_KEY);
    setIsAdmin(false);
  }, []);

  return (
    <Ctx.Provider value={{ isAdmin, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAdmin() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdmin must be used within AdminProvider");
  return v;
}
