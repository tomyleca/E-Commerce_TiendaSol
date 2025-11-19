import React, { useEffect, useState } from "react";
import {
  enviarPedido,
  cancelarPedido,
  getPedidosVendedor,
} from "../../services/pedidosService";
import "./PedidoVendedor.css";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { pedidosMock } from "../../mockData/Pedidos";

const PedidosVendedor = () => {
  const { idTienda } = useParams();
  const { usuario, isAutenticated } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "", mostrar: false });

   const mostrarMensaje = (texto, tipo = "exito") => {
    setMensaje({ texto, tipo, mostrar: true });
    setTimeout(() => {
      setMensaje({ texto: "", tipo: "", mostrar: false });
    }, 3000); // El mensaje se oculta después de 3 segundos
  };

  // Función para formatear números
  const formatNumero = (numero) => {
    return numero.toLocaleString('es-AR');
  };

  useEffect(() => {
    const cargarVentas = async () => {
      try {
       const data = await getPedidosVendedor(idTienda);
        setPedidos(data);
       // setPedidos(pedidosMock);
      } catch (err) {
        console.error("Error cargando pedidos", err);
      }
    };

    cargarVentas();
  }, [idTienda]);


    const enviar = async (id) => {
        try {
        await enviarPedido(id);
        // Recargar pedidos después de enviar
        const data = await getPedidosVendedor(idTienda);
        setPedidos(data);
        mostrarMensaje("¡Has realizado el envío del pedido correctamente!", "exito");
        } catch (err) {
        console.error("Error al enviar pedido", err);
        mostrarMensaje("Error al enviar el pedido. Intenta nuevamente.", "error");
        }
    };

    const cancelar = async (id) => {
        try {
        await cancelarPedido(id);
        // Recargar pedidos después de cancelar
        const data = await getPedidosVendedor(idTienda);
        setPedidos(data);
        mostrarMensaje("Pedido cancelado correctamente", "exito");
        } catch (err) {
        console.error("Error al cancelar pedido", err);
        mostrarMensaje("Error al cancelar el pedido. Intenta nuevamente.", "error");
        }
    };

    const renderBotones = (pedido) => {
        if (pedido.estado === "PENDIENTE" || pedido.estado === "EN_PREPARACION") {
        return (
            <div className="acciones">
            <button className="avanzar" onClick={() => enviar(pedido._id)}>
                Enviar pedido
            </button>
            <button className="cancelar" onClick={() => cancelar(pedido._id)}>
                Cancelar
            </button>
            </div>
        );
        }

    if (pedido.estado === "ENVIADO") {
      return <p className="estado enviado">Enviado</p>;
    }

    if (pedido.estado === "CANCELADO") {
      return <p className="estado cancelado">Cancelado</p>;
    }

    return null;
  };

  // Filtrar pedidos por estado
  const pedidosEnCurso = pedidos.filter(pedido => 
    pedido.estado === "PENDIENTE" || pedido.estado === "EN_PREPARACION"
  );
  const pedidosEnviados = pedidos.filter(pedido => pedido.estado === "ENVIADO");
  const pedidosCancelados = pedidos.filter(pedido => pedido.estado === "CANCELADO");

  const renderPedidoCard = (pedido) => (
    <div key={pedido._id} className="pedido-card">
      <div className="pedido-header">
        <div className="pedido-info">
          <h3>Pedido #{pedido._id.slice(-6)}</h3>
          <span className={`estado ${pedido.estado.toLowerCase().replace('_', '-')}`}>
            {pedido.estado.replace('_', ' ')}
          </span>
        </div>

        <div className="pedido-fecha">
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(pedido.fechaDeCreacion).toLocaleDateString()}
          </p>
          <p>
            <strong>Cliente:</strong> {pedido.comprador?.nombre}
          </p>
          <p>
            <strong>Dirección:</strong> {pedido.direccionEntrega}
          </p>
        </div>
      </div>

      <div className="pedido-productos">
        <h4>Productos:</h4>
        <div className="productos-lista">
          {pedido.itemsPedido.map((item, index) => (
            <div key={index} className="producto-item">
              <div className="producto-info">
                <h5>{item.producto.titulo}</h5>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${formatNumero(item.precioUnitario)}</p>
              </div>
              <div className="producto-subtotal">
                <p>${formatNumero(item.precioUnitario * item.cantidad)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pedido-total">
        <strong>
          Total: $
          {formatNumero(
            pedido.itemsPedido.reduce(
              (total, item) => total + item.precioUnitario * item.cantidad,
              0
            )
          )}
        </strong>
      </div>

      {renderBotones(pedido)}
    </div>
  );

  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="sin-pedidos">
        <p>No tienes solicitudes de compra realizados</p>
      </div>
    );
  } else {



    return (
      <div className="pedidos-vendedor">

        {/* Mensaje de confirmación */}
        {mensaje.mostrar && (
          <div className={`mensaje-confirmacion ${mensaje.tipo}`}>
            <div className="mensaje-contenido">
              <span className="mensaje-icono">
                {mensaje.tipo === "exito" ? "✓" : "⚠"}
              </span>
              <p>{mensaje.texto}</p>
            </div>
          </div>
        )}

        <h2>Pedidos del Vendedor</h2>

        {/* ventas en curso*/}
        {pedidosEnCurso.length > 0 && (
          <>
            <h3 className="subtitulo-en-curso">Pedidos en Curso</h3>
            <div className="lista-pedidos">
              {pedidosEnCurso.map(renderPedidoCard)}
            </div>
          </>
        )}

        {/* enviados */}
        {pedidosEnviados.length > 0 && (
          <>
            <h3 className="subtitulo-enviados">Pedidos Enviados</h3>
            <div className="lista-pedidos">
              {pedidosEnviados.map(renderPedidoCard)}
            </div>
          </>
        )}

        {/* ventas cancelada */}
        {pedidosCancelados.length > 0 && (
          <>
            <h3 className="subtitulo-cancelados">Pedidos Cancelados</h3>
            <div className="lista-pedidos">
              {pedidosCancelados.map(renderPedidoCard)}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default PedidosVendedor;