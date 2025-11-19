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

export default function NotificationModal() {
  const {
    isOpenNotificaciones,
    toggleNotificaciones,
    notificaciones,
    marcarComoLeida,
    loading,
  } = useNotification();
  const navigate = useNavigate();

  if (!isOpenNotificaciones) return null;

  const handleNotificationClick = (notificacion) => {
    if (!notificacion.leida) {
      marcarComoLeida(notificacion._id);
    }
  };

  const getIconByMessage = (mensaje) => {
    if (mensaje.toLowerCase().includes("enviado")) {
      return <LocalShippingIcon fontSize="medium" sx={{ color: "#131412ff" }} />;
    }
    if (mensaje.toLowerCase().includes("cancelado")) {
      return <CancelIcon fontSize="medium" sx={{ color: "#bc280eff" }} />;
    }
    if (mensaje.toLowerCase().includes("procesado") || mensaje.toLowerCase().includes("nuevo pedido")) {
      return <ShoppingBagIcon fontSize="medium" sx={{ color: "#131412ff" }} />;
    }
    return <NotificationsIcon fontSize="medium" sx={{ color: "#131412ff" }} />;
  };

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
          Notificaciones
        </h4>

        <div className="notification-list">
          {loading ? (
            <div className="notification-loading">
              <CircularProgress size={30} />
              <p>Cargando notificaciones...</p>
            </div>
          ) : notificaciones.length === 0 ? (
            <div className="notification-empty">
              <NotificationsIcon fontSize="large" sx={{ color: "#ccc" }} />
              <p>No tienes notificaciones</p>
            </div>
          ) : (
            notificaciones.slice(0, 5).map((notificacion) => (
              <div
                key={notificacion._id}
                className={`notification ${!notificacion.leida ? "notification-unread" : ""}`}
                onClick={() => handleNotificationClick(notificacion)}
              >
                <div className="notification-icon">
                  {getIconByMessage(notificacion.mensaje)}
                </div>
                <div className="notification-content">
                  <p className="notification-message">{notificacion.mensaje}</p>
                  <span className="notification-date">
                    {new Date(notificacion.fechaCreacion).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {!notificacion.leida && (
                  <CircleIcon
                    fontSize="small"
                    sx={{ color: "#1976d2", width: 10, height: 10 }}
                  />
                )}
              </div>
            ))
          )}
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
