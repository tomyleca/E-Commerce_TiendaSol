import "./notification-modal.css";
import React from "react";
import { useNotification } from "../../context/NotificacionContext.jsx";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function iconFor(tipo) {
  switch (tipo) {
    case "envio":
      return <LocalShippingIcon fontSize="small" />;
    case "compra":
      return <ShoppingBagIcon fontSize="small" />;
    case "cancelacion envio":
      return <LocalShippingIcon fontSize="small" style={{ color: "var(--error)" }} />;
    default:
      return <ShoppingBagIcon fontSize="small" />;
  }
}

export default function NotificationModal() {
  const { isOpenNotificaciones, toggleNotificaciones, notificaciones, loading } =
    useNotification();
  const navigate = useNavigate();

  if (!isOpenNotificaciones) return null;

  const notificacionesRecientes = notificaciones.slice(0, 5);

  return (
    <div
      className="notif-overlay"
      onClick={toggleNotificaciones}
      role="presentation"
    >
      <div
        className="notif-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notif-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="notif-header">
          <NotificationsNoneIcon fontSize="small" className="notif-header-icon" />
          <h4 id="notif-title" className="notif-title">
            Notificaciones
          </h4>
          {notificaciones.length > 0 && (
            <span className="notif-count">{notificaciones.length}</span>
          )}
        </div>

        {/* Lista */}
        <div className="notif-list">
          {loading && (
            <div className="notif-loading">
              <CircularProgress size={24} sx={{ color: "var(--brand-color)" }} />
            </div>
          )}

          {!loading && notificaciones.length === 0 && (
            <div className="notif-empty">
              <NotificationsNoneIcon fontSize="large" className="notif-empty-icon" />
              <p>Sin notificaciones por ahora</p>
            </div>
          )}

          {!loading &&
            notificacionesRecientes.map((n) => (
              <div
                key={n.id}
                className={`notif-item ${n.leida ? "notif-item--leida" : ""}`}
              >
                <span className={`notif-icon-wrap ${n.leida ? "" : "notif-icon-wrap--unread"}`}>
                  {iconFor(n.tipo)}
                </span>
                <p className="notif-message">{n.mensaje}</p>
                {!n.leida && <span className="notif-dot" aria-hidden="true" />}
              </div>
            ))}
        </div>

        {/* Footer */}
        <button
          className="notif-footer-btn"
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
