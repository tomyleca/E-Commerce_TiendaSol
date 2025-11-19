import React from "react";
import "./ListaNotificaciones.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Navbar from "../../components/navbar/navbar.jsx";
import { useNotification } from "../../context/NotificacionContext.jsx";

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

export default function ListaNotificaciones() {
  const { 
    notificaciones, 
    loading, 
    marcarComoLeida, 
    marcarTodasLeidas 
  } = useNotification();

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  return (
    <>
      <Navbar />
      <div className="notificaciones-page">
        <div className="notificaciones-header">
          <h2>
            Notificaciones
            <span style={{ color: "#09090aff" }}>({noLeidas})</span>
          </h2>
          <div className="acciones">
            {noLeidas > 0 && (
              <button className="btn-primario" onClick={marcarTodasLeidas}>
                Marcar todas como leídas
              </button>
            )}
          </div>
        </div>

        {(!notificaciones || notificaciones.length === 0) && !loading && (
          <div className="estado">No tenés notificaciones por ahora</div>
        )}

        {loading && (
          <div className="estado">Cargando notificaciones...</div>
        )}

        <ul className="lista-notificaciones">
          {notificaciones?.map((n) => (
            <li key={n.id} className={`item ${n.leida ? "leida" : "nueva"}`}>
              <div className="icono">{iconFor(n.tipo)}</div>
              <div className="contenido">
                <p className="mensaje">{n.mensaje}</p>
                {n.fecha && (
                  <small className="fecha">
                    {new Date(n.fecha).toLocaleString()}
                  </small>
                )}
              </div>
              {!n.leida && (
                <button
                  className="btn-link"
                  onClick={() => marcarComoLeida(n.id)}
                >
                  Marcar leída
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
