import React from "react";
import "./modal-carrito.css";
import { FaTrashCan } from "react-icons/fa6";

import { useCarrito } from "../../context/CarritoContext";
// ...
const ModalCarrito = () => {
  const {
    isOpenCarrito,
    cerrarCarrito,
    itemsCarrito,
    precioTotalCarrito,
    quitarCarrito,
    vaciarCarrito,
  } = useCarrito();
  if (!isOpenCarrito) return null;
  const deshabilitado =
    !itemsCarrito || itemsCarrito.length === 0 || precioTotalCarrito < 0;
  return (
    <div className="modal-overlay" onClick={cerrarCarrito}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="carrito-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="carrito-titulo" className="carrito-titulo">
          Carrito
        </h2>
        {itemsCarrito.map((it) => (
          <div key={it.id}>
            {it.title} x{it.qty} — ${it.price}
            <button
              type="button"
              className="icono-eliminar-carrito-btn"
              aria-label={`Quitar ${it.title} del carrito`}
              onClick={() => quitarCarrito(it.id)}
            >
              <FaTrashCan
                className="icono-eliminar-carrito"
                aria-hidden="true"
              />
            </button>
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
