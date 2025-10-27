import React from "react";
import "./modal-carrito.css";
import { FaTrashCan } from "react-icons/fa6";

import { useCarrito } from "../../context/CarritoContext";
// ...
const ModalCarrito = () => {
  const { isOpen, cerrar, items, precioTotal, quitar, vaciar } = useCarrito();
  if (!isOpen) return null;
  const deshabilitado = !items || items.length === 0 || precioTotal <= 0;
  return (
    <div className="modal-overlay" onClick={cerrar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="carrito-titulo">Carrito</h2>
        {items.map((it) => (
          <div key={it.id}>
            {it.title} x{it.qty} — ${it.price}
            <FaTrashCan className="icono-eliminar-carrito" onClick={() => quitar(it.id)} />
          </div>
        ))}
        <div className="total-carrito">Total: ${precioTotal}</div>
		<button
          className="boton-comprar"
          onClick={vaciar}
          disabled={deshabilitado}
          title={deshabilitado ? "No hay productos en el carrito" : undefined}
        >
          Comprar
        </button>
        <button
          className="boton-vaciar"
          onClick={vaciar}
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
