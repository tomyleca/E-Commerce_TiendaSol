import { createContext, useContext, useEffect, useMemo, useState } from "react";

//almacenamiento en el navegador para guardar datos del usuario
const STORAGE_KEY = "carrito:items";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const agregar = (producto, cantidad = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === producto.id);
      if (i > -1) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + cantidad };
        return copy;
      }
      return [...prev, { ...producto, qty: cantidad }];
    });
  };

  const quitar = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const vaciar = () => setItems([]);
  const abrir = () => setIsOpen(true);
  const cerrar = () => setIsOpen(false);
  const alternar = () => setIsOpen((v) => !v);

  const cantidadTotal = items.reduce((acc, it) => acc + it.qty, 0);
  const precioTotal = items.reduce(
    (acc, it) => acc + it.qty * (it.price ?? 0),
    0,
  );

  const value = useMemo(
    () => ({
      items,
      agregar,
      quitar,
      vaciar,
      isOpen,
      abrir,
      cerrar,
      alternar,
      cantidadTotal,
      precioTotal,
    }),
    [items, isOpen],
  );

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito must be used within CarritoProvider");
  return ctx;
}
