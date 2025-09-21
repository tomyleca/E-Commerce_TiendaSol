import { v4 as uuidv4 } from "uuid";
import { EstadoPedido } from "./estadoPedido.js";
import { Notificacion } from "./notificacion.js";

export class FactoryNotificacion {

	constructor() {

	}

    crearSegunEstadoPedido(pedido) {
        let usuarioDestino;
        let mensaje;
        switch (pedido.estado) {
            case EstadoPedido.PENDIENTE: // Cuando se realiza un pedido
                usuarioDestino = pedido.vendedor;
                mensaje = `Nuevo pedido de ${pedido.comprador.nombre}. Productos: ${pedido.itemsPedido.map(p => p.nombre).join(", ")}. Total: $${pedido.total}. Entrega en: ${pedido.direccionEntrega.toString()}.`;
                break;

               case EstadoPedido.ENVIADO:
                usuarioDestino = pedido.comprador;
                mensaje = `Tu pedido ha sido enviado por ${pedido.vendedor.nombre}. Productos: ${pedido.itemsPedido.map(p => p.nombre).join(", ")}. Total: $${pedido.total}.`;
                break;
            case EstadoPedido.CANCELADO:
                usuarioDestino = pedido.vendedor;
                mensaje = `El pedido de ${pedido.comprador.nombre} ha sido cancelado. Productos: ${pedido.itemsPedido.map(p => p.nombre).join(", ")}.`;
                break;

            default:
                throw new Error(`Estado no manejado para notificación: ${pedido.estado}`);
        }

        return { usuarioDestino, mensaje };
    }

    crearSegunPedido(pedido) {
        const { usuarioDestino, mensaje } = this.crearSegunEstadoPedido(pedido);

        return new Notificacion(
            uuidv4(),
            usuarioDestino,
            mensaje,
            new Date().toISOString(),
            false,
            null
        );
    }
}