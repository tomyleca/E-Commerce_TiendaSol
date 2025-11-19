import React from "react";
import "./modal-carrito.css";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import BotonVaciarCarrito from "../boton-vaciar-carrito/BotonVaciarCarrito.jsx";
// ...
const ModalCarrito = () => {
  const navigate = useNavigate();
  const {
    isOpenCarrito,
    cerrarCarrito,
    itemsCarrito,
    precioTotalCarrito,
    quitarCarrito,
  } = useCarrito();

  const irACarrito = () => {
    cerrarCarrito();
    navigate("/carrito");
  };

  if (!isOpenCarrito) return null;
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
        <div className="total-carrito">
          Total: ${precioTotalCarrito}
          <BotonVaciarCarrito className="boton-vaciar-modal" />
        </div>
        <button className="boton-ver-carrito" onClick={irACarrito}>
          Ver carrito completo
        </button>
      </div>
    </div>
  );
};

export default ModalCarrito;
