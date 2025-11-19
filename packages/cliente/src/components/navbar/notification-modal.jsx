import "./notification-modal.css";
import React from "react";
import { useNotification } from "../../context/NotificacionContext.jsx";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function iconFor(tipo) {
  switch (tipo) {
    case "envio":
      return <LocalShippingIcon fontSize="medium" />;
    case "compra":
      return <ShoppingBagIcon fontSize="medium" />;
    case "cancelacion envio":
      return (
        <LocalShippingIcon fontSize="medium" style={{ color: "#bc280e" }} />
      );
    default:
      return <ShoppingBagIcon fontSize="medium" />;
  }
}

export default function NotificationModal() {
  const {
    isOpenNotificaciones,
    toggleNotificaciones,
    notificaciones,
    loading,
  } = useNotification();
  const navigate = useNavigate();

  if (!isOpenNotificaciones) return null;

  const notificacionesRecientes = notificaciones.slice(0, 5);

  return (
    <div className="modal-overlay" onClick={toggleNotificaciones}>
      <div
        className="notification-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 id="notification-title" className="notification-title">
          {notificaciones.length > 0 ? "Notificaciones" : "Sin notificaciones"}
        </h4>

        <div className="notification-list">
          {loading && <p className="loading-text">Cargando...</p>}

          {!loading && notificaciones.length === 0 && (
            <p className="empty-text">No tienes notificaciones por ahora</p>
          )}

          {!loading &&
            notificacionesRecientes.map((n) => (
              <div
                key={n.id}
                className={`notification ${n.leida ? "leida" : ""}`}
              >
                {iconFor(n.tipo)}
                <p>{n.mensaje}</p>
              </div>
            ))}
        </div>

        <button
          className="notification-footer"
          type="button"
          aria-label="Ver todas las notificaciones"
          onClick={() => {
            toggleNotificaciones();
            navigate("/notificaciones");
          }}
        >
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
}
