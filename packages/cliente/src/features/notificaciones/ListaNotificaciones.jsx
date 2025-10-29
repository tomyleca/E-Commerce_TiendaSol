import React, { useMemo, useState } from "react";
import "./ListaNotificaciones.css";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Navbar from "../../components/navbar/navbar.jsx";

function iconFor(tipo) {
  switch (tipo) {
    case "envio":
      return <LocalShippingIcon fontSize="medium" />;
    case "compra":
      return <ShoppingBagIcon fontSize="medium" />;
    case "cancelacion envio":
      return <LocalShippingIcon fontSize="medium" style={{ color: '#bc280e' }} />;
    default:
      return <ShoppingBagIcon fontSize="medium" />;
  }
}

export default function ListaNotificaciones() {
  //Lista hardcodeada 
  const iniciales = [
    { id: "n1", tipo: "cancelacion envio", mensaje: "¡Lo sentimos! El envío de tu pedido #1234 ha sido cancelado.", fecha: "2025-10-28T10:00:00Z", leida: false },
    { id: "n2", tipo: "envio", mensaje: "¡Enhorabuena! Tu pedido #1234 ha sido enviado.", fecha: "2025-10-27T16:30:00Z", leida: false },
    { id: "n3", tipo: "compra", mensaje: "El pedido #1234 ha sido procesado y será enviado pronto.", fecha: "2025-10-26T09:15:00Z", leida: false },
    { id: "n4", tipo: "envio", mensaje: "Tu pedido #1229 fue entregado con éxito.", fecha: "2025-10-24T13:05:00Z", leida: true },
    { id: "n5", tipo: "compra", mensaje: "Recibimos tu pago del pedido #1228.", fecha: "2025-10-23T18:40:00Z", leida: true },
    { id: "n6", tipo: "cancelacion envio", mensaje: "Se reprogramó el envío del pedido #1227.", fecha: "2025-10-22T08:20:00Z", leida: true },
    { id: "n7", tipo: "envio", mensaje: "Tu pedido #1236 ya está en camino.", fecha: "2025-10-28T14:22:00Z", leida: true },
    { id: "n8", tipo: "compra", mensaje: "Confirmamos tu compra del pedido #1237.", fecha: "2025-10-28T12:10:00Z", leida: true },
    { id: "n9", tipo: "cancelacion envio", mensaje: "Se canceló el envío del pedido #1233 por dirección inválida.", fecha: "2025-10-27T19:05:00Z", leida: true },
    { id: "n10", tipo: "compra", mensaje: "Tu pedido #1232 fue preparado para envío.", fecha: "2025-10-27T08:45:00Z", leida: true },
    { id: "n11", tipo: "envio", mensaje: "Actualización: el pedido #1231 llega hoy.", fecha: "2025-10-26T17:30:00Z", leida: true },
    { id: "n12", tipo: "compra", mensaje: "¡Gracias! Registramos tu pedido #1230.", fecha: "2025-10-25T11:55:00Z", leida: true },

  ];
  const [notificaciones, setNotificaciones] = useState(iniciales);

  const noLeidas = useMemo(() => notificaciones.filter(n => !n.leida).length, [notificaciones]);

  const marcarTodasLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
  };

  const onMarcarLeida = (id) => {
    setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));
  };

  return (
	<>
	<Navbar />
    <div className="notificaciones-page">
      <div className="notificaciones-header">
        <h2>Notificaciones<span style={{ color: '#09090aff' }}>({noLeidas})</span></h2>
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
          <li key={n.id} className={`item ${n.leida ? 'leida' : 'nueva'}`}>
            <div className="icono">{iconFor(n.tipo)}</div>
            <div className="contenido">
              <p className="mensaje">{n.mensaje}</p>
              {n.fecha && <small className="fecha">{new Date(n.fecha).toLocaleString()}</small>}
            </div>
            {!n.leida && (
              <button className="btn-link" onClick={() => onMarcarLeida(n.id)}>
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
