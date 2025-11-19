import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPedidosCliente } from "../../services/pedidosService";
import { Card, CardContent, List, ListItem, ListItemText, Divider } from "@mui/material";
import "./PedidosCliente.css"
import {pedidosMock} from "../../mockData/Pedidos"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PedidosCliente = () => {
  const { id } = useParams(); 
  const {usuario , isAutenticated} = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [mostrarFinalizados, setMostrarFinalizados] = useState(false);
  const navegar = useNavigate();

  const formatNumero = (numero) => {
    return numero.toLocaleString('es-AR');
  };

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await getPedidosCliente(id);
        setPedidos(data);
      
        //setPedidos(pedidosMock);
     
      } catch (error) {
        console.error("Error cargando pedidos", error);
      }
    };

    cargarPedidos();
  }, [id]);

   if (
    (!pedidos || pedidos.length === 0) ||
    usuario._id === id &&
    isAutenticated
  ) {
    if (usuario._id !== id && isAutenticated == false) {
      navegar(`/login`)
    } else { 
      return (
        <div className="sin-pedidos">
          <p>No tienes pedidos realizados</p>
        </div>
      );
    }
  }else{
    

  const pedidosEnCurso = pedidos.filter(
    (p) => p.estado === "PENDIENTE" || p.estado === "EN_PREPARACION"
  );

  const pedidosFinalizados = pedidos.filter(
    (p) => p.estado === "COMPLETADO" || p.estado === "CANCELADO"
  );

  const renderPedido = (pedido, esEnCurso) => (
    <div
      key={pedido._id}
      className={`pedido-card ${esEnCurso ? "en-curso" : ""}`}
    >
      {/* Encabezado */}
      <div className="pedido-header">
        <div className="pedido-info">
          <h3>Pedido #{pedido._id.slice(-6)}</h3>
          <span className={`estado ${pedido.estado.toLowerCase()}`}>
            {pedido.estado}
          </span>
        </div>

        <div className="pedido-fecha">
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(pedido.fechaDeCreacion).toLocaleDateString()}
          </p>
          <p>
            <strong>Dirección:</strong> {pedido.direccionEntrega}
          </p>
        </div>
      </div>

      {/* Productos */}
      <div className="pedido-productos">
        <h4>Productos:</h4>
        <div className="productos-lista">
          {pedido.itemsPedido.map((item, index) => (
            <div key={index} className="producto-item">
              <div className="producto-info">
                <h5>{item.producto.titulo}</h5>
                <p>Cantidad: {item.cantidad}</p>
                <p>
                  Precio unitario: ${formatNumero(item.precioUnitario)}
                </p>
              </div>

              <div className="producto-subtotal">
                <p>
                  ${formatNumero(item.precioUnitario * item.cantidad)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="pedido-total">
        <strong>
          Total: $
          {formatNumero(
            pedido.itemsPedido.reduce(
              (total, item) =>
                total + item.precioUnitario * item.cantidad,
              0
            )
          )}
        </strong>
      </div>
    </div>
  );

  return (
    <div className="pedidos-cliente">
      <h2 className="pedidos-titulo">Mis Pedidos</h2>

      {/* --- SECCIÓN EN CURSO --- */}
      {pedidosEnCurso.length > 0 && (
        <>
          <h3 className="subtitulo-curso">En curso</h3>
          <div className="lista-pedidos">
            {pedidosEnCurso.map((p) => renderPedido(p, true))}
          </div>
        </>
      )}

      {/* --- SECCIÓN FINALIZADOS --- */}
      {pedidosFinalizados.length > 0 && (
        <>
          <h3 className="subtitulo-finalizados">Finalizados</h3>
          <div className="lista-pedidos">
            {pedidosFinalizados.map((p) => renderPedido(p, false))}
          </div>
        </>
      )}
    </div>
  );
  }
};

export default PedidosCliente;
