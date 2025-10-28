import "./notification-modal.css";
import React from "react";
import { useNotification } from "../../context/NotificacionContext.jsx";

export default function NotificationModal() {
  const { isOpenNotificaciones } = useNotification();
  if (!isOpenNotificaciones) return null;

  return (
    <div className="notification-modal">
      <p>No hay nuevas notificaciones</p>
    </div>
  );
}