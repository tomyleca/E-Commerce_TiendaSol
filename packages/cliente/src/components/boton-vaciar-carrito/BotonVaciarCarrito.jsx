import React from "react";
import { useCarrito } from "../../context/CarritoContext.jsx";
import "./BotonVaciarCarrito.css";

const BotonVaciarCarrito = ({ className = "" }) => {
  const { vaciarCarrito, itemsCarrito, precioTotalCarrito } = useCarrito();

  const deshabilitado =
    !itemsCarrito || itemsCarrito.length === 0 || precioTotalCarrito < 0;

  const handleVaciar = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      vaciarCarrito();
    }
  };

  return (
    <button
      className={`boton-vaciar ${className}`}
      onClick={handleVaciar}
      disabled={deshabilitado}
      title={deshabilitado ? "No hay productos para vaciar" : undefined}
    >
      Vaciar
    </button>
  );
};

export default BotonVaciarCarrito;
