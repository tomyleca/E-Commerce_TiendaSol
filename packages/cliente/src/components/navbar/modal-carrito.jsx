import React from "react";
import "./modal-carrito.css";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import BotonVaciarCarrito from "../boton-vaciar-carrito/BotonVaciarCarrito.jsx";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
    <div className="mc-overlay" onClick={cerrarCarrito} role="presentation">
      <div
        className="mc-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mc-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mc-header">
          <ShoppingCartOutlinedIcon fontSize="small" className="mc-header-icon" />
          <h2 id="mc-title" className="mc-title">Mi Carrito</h2>
          {itemsCarrito.length > 0 && (
            <span className="mc-count">{itemsCarrito.length}</span>
          )}
        </div>

        {/* Lista */}
        <div className="mc-list">
          {itemsCarrito.length === 0 ? (
            <div className="mc-empty">
              <ShoppingCartOutlinedIcon className="mc-empty-icon" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            itemsCarrito.map((it) => (
              <div key={it.id} className="mc-item">
                {it.fotos?.[0] && (
                  <img src={it.fotos[0]} alt={it.titulo} className="mc-item-img" />
                )}
                <div className="mc-item-info">
                  <p className="mc-item-name">{it.titulo || it.title}</p>
                  <p className="mc-item-qty">
                    Cant: <strong>{it.qty}</strong> — ${(it.price || it.precio || 0).toLocaleString("es-AR")}
                  </p>
                </div>
                <button
                  type="button"
                  className="mc-item-remove"
                  aria-label={`Quitar ${it.titulo || it.title} del carrito`}
                  onClick={() => quitarCarrito(it.id)}
                >
                  <FaTrashCan size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {itemsCarrito.length > 0 && (
          <div className="mc-footer">
            <div className="mc-total-row">
              <span className="mc-total-label">Total</span>
              <span className="mc-total-price">
                ${precioTotalCarrito.toLocaleString("es-AR")}
              </span>
            </div>
            <button className="mc-btn-primary" onClick={irACarrito}>
              Ver carrito completo
            </button>
            <BotonVaciarCarrito className="mc-btn-secondary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCarrito;
