import { Pedido } from "../models/entities/pedido.js"
import {FactoryNotificacion} from "../models/entities/factoryNotificacion.js"
import { NoHayStock } from "../errors/noHayStock.js"
import { EstadoPedido } from "../models/entities/estadoPedido.js";

export class PedidosService {
	constructor(pedidosRepository) {
		this.pedidosRepository = pedidosRepository
}

	buscarTodos() {
		return this.pedidosRepository.buscarTodos()
	}

	crear(nuevoPedidoJson) {

		const nuevoPedido = new Pedido(
			nuevoPedidoJson.comprador,
			nuevoPedidoJson.items,
			nuevoPedidoJson.total,
			nuevoPedidoJson.moneda,
			nuevoPedidoJson.direccionEntrega,
		)


		
		if(!nuevoPedido.validarStock()){
			throw new NoHayStock();
		} // Aqui se valida si el stock esta disponible.

		/// A DEFINIR SI HACER OTRO SERVICIO PARA LA NOFICAION SEGURAMENTE QUE SI.
		//  Creo la notificación según el pedido
		const notificacion = this.factoryNotificacion.crearSegunPedido(
		pedidoGuardado
		);

		//  Envío/guardo la notificación con el servicio adecuado
		this.notificacionesService.enviar(notificacion);

        return this.pedidosRepository.crear(nuevoPedido)
	}
 	cancelar(idPedido, motivo, usuario) {
    const pedido = this.pedidosRepository.buscarPorId(idPedido);

    if (!pedido) {
        throw new Error('Pedido no encontrado');
    }

    if (pedido.estado === EstadoPedido.ENVIADO) {
        throw new Error('No se puede cancelar un pedido que ya fue enviado');
    }

    pedido.actualizarEstado(EstadoPedido.CANCELADO, usuario, motivo);

    // Crear la notificación usando el pedido actualizado
    const notificacion = this.factoryNotificacion.crearSegunPedido(pedido);
    this.notificacionesService.enviar(notificacion);

    return pedido;
	}

	buscarPedidosDeUsuario(idUsuario){
		return this.pedidosRepository.buscarPorUsuario(idUsuario)
	}

}
