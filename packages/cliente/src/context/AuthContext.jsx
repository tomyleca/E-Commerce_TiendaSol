import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "usuario:session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    console.log(usuario);
  }, [usuario]);

  const login = (usuarioData) => {
    setUsuario(usuarioData);
  };

  const logout = () => {
    setUsuario(null);
  };

  const actualizarDatosUsuario = (datosActualizados) => {
    setUsuario((prev) => {
      if (!prev) return prev;
      return { ...prev, ...datosActualizados };
    });
  };

  const isVendedor =
    (usuario?.tipo || "").toString().toUpperCase() === "VENDEDOR";

  const isAuthenticated = Boolean(usuario);

  const value = {
    usuario,
    login,
    logout,
    actualizarDatosUsuario,
    isAuthenticated,
    isVendedor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
