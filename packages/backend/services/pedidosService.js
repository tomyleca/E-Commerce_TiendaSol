import { Pedido } from "../models/entities/pedido.js"
import { FactoryNotificacion } from "../models/entities/factoryNotificacion.js"
import { NoHayStock } from "../errors/noHayStock.js"
import { EstadoPedido } from "../models/entities/estadoPedido.js";
import { NotFound } from "../errors/notFound.js";
import {IntentoDeCancelarEnviadoError} from "../errors/intentoDeCancelarEnviadoError.js"

export class PedidosService {
	constructor(pedidosRepository, factoryNotificacion, notificacionesService) {
		this.pedidosRepository = pedidosRepository
		this.factoryNotificacion = factoryNotificacion	
		this.notificacionesService = notificacionesService
	}

	buscarTodos() {
		return this.pedidosRepository.buscarTodos()
	}

	crear(nuevoPedidoJson) {

		const nuevoPedido = new Pedido(
			nuevoPedidoJson.comprador,
			nuevoPedidoJson.items,
			nuevoPedidoJson.direccionEntrega,
		)



		if (!nuevoPedido.validarStock()) {
			throw new NoHayStock();
		} // Aqui se valida si el stock esta disponible.

		/// A DEFINIR SI HACER OTRO SERVICIO PARA LA NOFICAION SEGURAMENTE QUE SI.
		//  Creo la notificación según el pedido
		const notificacion = this.factoryNotificacion.crearSegunEstadoPedido(
		nuevoPedido
		);

		//  Envío/guardo la notificación con el servicio adecuado
		this.notificacionesService.enviar(notificacion);

		return this.pedidosRepository.crear(nuevoPedido)
	}
	cancelar(idPedido) {
		const pedido = this.pedidosRepository.buscarPorId(idPedido);

    if (!pedido) {
        throw new NotFound(Pedido, idPedido);
    }

		if (pedido.estado === EstadoPedido.ENVIADO) {
			throw new IntentoDeCancelarEnviadoError();
		}

		pedido.actualizarEstado(EstadoPedido.CANCELADO);

		// Crear la notificación usando el pedido actualizado
		const notificacion = this.factoryNotificacion.crearSegunPedido(pedido);
		this.notificacionesService.enviar(notificacion);

		return pedido;
	}

	buscarPedidosDeUsuario(idUsuario) {
		return this.pedidosRepository.buscarPorUsuario(idUsuario)
	}

	// Marcado de un pedido como enviado por parte del vendedor
	enviar(idPedido, usuario) {
		const pedido = this.pedidosRepository.buscarPorId(idPedido);

		if (!pedido) {
			throw new Error('Pedido no encontrado');
		}

		pedido.actualizarEstado(EstadoPedido.ENVIADO);

		// Crear la notificación usando el pedido actualizado
		const notificacion = this.factoryNotificacion.crearSegunPedido(pedido);
		this.notificacionesService.enviar(notificacion);

		return pedido;
	}
}
