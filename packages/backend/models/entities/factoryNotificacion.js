import { v4 as uuidv4 } from "uuid";
import { EstadoPedido } from "./estadoPedido.js";
import { Notificacion } from "./notificacion.js";

export class FactoryNotificacion {
  constructor() { }

  crearSegunEstadoPedido(pedido) {
    let usuarioDestino;
    let mensaje;
    switch (pedido.estado) {
      case EstadoPedido.PENDIENTE: // Cuando se realiza un pedido
        usuarioDestino = pedido.vendedor;
        mensaje = `Nuevo pedido de ${pedido.comprador.nombre}. Productos: ${pedido.itemsPedido.map((p) => p.nombre).join(", ")}. Total: $${pedido.total}. Entrega en: ${pedido.direccionEntrega.toString()}.`;
        break;
      case EstadoPedido.CONFIRMADO:
        usuarioDestino = pedido.comprador;
        mensaje = `Tu pedido ha sido confirmado por ${pedido.vendedor.nombre}. Productos: ${pedido.itemsPedido.map((p) => p.nombre).join(", ")}. Total: $${pedido.total}.`;
        break;
      case EstadoPedido.EN_PREPARACION:
        usuarioDestino = pedido.comprador;
        mensaje = `Tu pedido está en preparación.`;
        break;
      case EstadoPedido.ENVIADO:
        usuarioDestino = pedido.comprador;
        mensaje = `Tu pedido ha sido enviado por ${pedido.vendedor.nombre}.`;
        break;
      case EstadoPedido.ENTREGADO:
        usuarioDestino = pedido.vendedor;
        mensaje = `Tu pedido ha sido entregado.`;
        break;
      case EstadoPedido.ENTREGADO:
        usuarioDestino = pedido.comprador;
        mensaje = `Tu pedido ha sido entregado.`;
        break;
      case EstadoPedido.CANCELADO:
        usuarioDestino = pedido.vendedor;
        mensaje = `El pedido de ${pedido.comprador.nombre} ha sido cancelado.`;
        break;
      case EstadoPedido.CANCELADO:
        usuarioDestino = pedido.comprador;
        mensaje = `El pedido de ${pedido.comprador.nombre} ha sido cancelado.`;
        break;

      default:
        throw new Error(
          `Estado no manejado para notificación: ${pedido.estado}`,
        );
    }

    return { usuarioDestino, mensaje };
  }

  crearSegunPedido(pedido) {
    const { usuarioDestino, mensaje } = this.crearSegunEstadoPedido(pedido);

    return new Notificacion(usuarioDestino, mensaje);
  }
}
