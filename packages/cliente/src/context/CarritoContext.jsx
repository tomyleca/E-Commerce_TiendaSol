import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearPedido } from "../services/pedidosService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext.jsx";

//almacenamiento en el navegador para guardar datos del usuario
const STORAGE_KEY = "carrito:items";



const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
	const {usuario, isAuthenticated} = useAuth();
  const navigate = useNavigate();
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




  const agregarCarrito = (producto, cantidad = 1) => {
    setItems((prev) => {
      const productId = producto.id || producto._id;
      const i = prev.findIndex((p) => p.id === productId);
      
      if (i > -1) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + cantidad };
        return copy;
      }

      //normalizo el item carrito
      const itemCarrito = {
        id: productId,
        title: producto.titulo || producto.nombre || producto.title,
        price: Number(producto.precio || producto.price) || 0,
        fotos: producto.fotos || [],
        descripcion: producto.descripcion || '',
        vendedorId: producto.vendedor || producto.vendedorId || producto.usuario,
        qty: cantidad
      };

      return [...prev, itemCarrito];
    });
  };

  const quitarCarrito = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));
  const vaciarCarrito = () => setItems([]);
  const abrirCarrito = () => setIsOpen(true);
  const cerrarCarrito = () => setIsOpen(false);
  const alternarCarrito = () => setIsOpen((v) => !v);

  const cantidadTotalCarrito = items.reduce((acc, it) => acc + it.qty, 0);
  const precioTotalCarrito = items.reduce(
    (acc, it) => acc + it.qty * (it.price ?? 0),
    0,
  );

  const comprarCarrito = async () => {
    try {
      if (!isAuthenticated) {
        toast.error("Debes iniciar sesión para comprar");
        navigate("/login");
        return;
      }

      if (items.length === 0) {
        toast.error("El carrito está vacío");
        return;
      }

      // Verificar que el usuario tenga dirección
      if (!usuario.direccion) {
        toast.error("Debes completar tu dirección de entrega");
        navigate("/direccion");
        return;
      }

	  //reduce es un fold
      const totalPedido = items.reduce(
		(acc, it) => acc + it.qty * (it.price ?? 0),
		0,
	  );
      
	  const itemsPedido = items.map((it) => ({
		producto: it.id,
		cantidad: it.qty,
		precioUnitario: it.price,
	  }));
	

        const pedidoData = {
          comprador: usuario._id,
          itemsPedido,
          total: totalPedido,
          moneda: "ARS",
          direccionEntrega: usuario.direccion         
        };
        const pedidoCreado = await crearPedido(pedidoData);
        
      

      vaciarCarrito();
      toast.success(`¡Compra realizada con éxito! `);
      navigate(`/clientes/${usuario._id}/pedidos`);
	}
     catch (error) {
      console.error("Error al comprar:", error);
      toast.error(error.message || "Error al procesar la compra");
    }
  ;
  }
  const value = useMemo(
    () => ({
      itemsCarrito: items,
      agregarCarrito,
      quitarCarrito,
      vaciarCarrito,
      isOpenCarrito: isOpen,
      abrirCarrito,
      cerrarCarrito,
      alternarCarrito,
      cantidadTotalCarrito,
      precioTotalCarrito,
      comprarCarrito,
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
