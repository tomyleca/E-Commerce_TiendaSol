import React from "react";
import "./modal-carrito.css";
import { FaTrashCan } from "react-icons/fa6";

import { useCarrito } from "../../context/CarritoContext";
// ...
const ModalCarrito = () => {
  const { isOpenCarrito, cerrarCarrito, itemsCarrito, precioTotalCarrito, quitarCarrito, vaciarCarrito } = useCarrito();
  if (!isOpenCarrito) return null;
  const deshabilitado = !itemsCarrito || itemsCarrito.length === 0 || precioTotalCarrito < 0;
  return (
    <div className="modal-overlay" onClick={cerrarCarrito}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="carrito-titulo">Carrito</h2>
        {itemsCarrito.map((it) => (
          <div key={it.id}>
            {it.title} x{it.qty} — ${it.price}
            <FaTrashCan className="icono-eliminar-carrito" onClick={() => quitarCarrito(it.id)} />
          </div>
        ))}
        <div className="total-carrito">Total: ${precioTotalCarrito}</div>
		<button
          className="boton-comprar"
          onClick={vaciarCarrito}
          disabled={deshabilitado}
          title={deshabilitado ? "No hay productos en el carrito" : undefined}
        >
          Comprar
        </button>
        <button
          className="boton-vaciar"
          onClick={vaciarCarrito}
          disabled={deshabilitado}
          title={deshabilitado ? "No hay productos para vaciar" : undefined}
        >
          Vaciar
        </button>
      </div>
    </div>
  );
};

export default ModalCarrito;
