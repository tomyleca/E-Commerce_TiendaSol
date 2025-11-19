import React, { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "./ListaNotificaciones.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Navbar from "../../components/navbar/navbar.jsx";
import { getNotificaciones } from "../../services/usuarioService.js";

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
  const { usuario } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);
  useEffect(() => {
    const userId = usuario?._id || usuario?.id;
    if (!userId) {
      // si no hay usuario, limpiar la lista
      setNotificaciones([]);
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const data = await getNotificaciones(userId);
        // Mapear por si el backend devuelve _id en lugar de id
        const normalized = (data || []).map((n) => ({
          ...n,
          id: n.id || n._id || `${n.tipo}-${n.fecha}`, // fallback para key si hace falta
          leida: n.leida ?? false,
        }));
        if (mounted) setNotificaciones(normalized);
      } catch (err) {
        console.error("Error cargando notificaciones:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [usuario]);

  const noLeidas = useMemo(
    () => notificaciones.filter((n) => !n.leida).length,
    [notificaciones],
  );

  const marcarTodasLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  const onMarcarLeida = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n)),
    );
  };

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

        {(!notificaciones || notificaciones.length === 0) && (
          <div className="estado">No tenés notificaciones por ahora</div>
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
                  onClick={() => onMarcarLeida(n.id)}
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
