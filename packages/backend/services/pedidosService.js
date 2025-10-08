import { Pedido } from "../models/entities/pedido.js"
import { FactoryNotificacion } from "../models/entities/factoryNotificacion.js"
import { NoHayStock } from "../errors/noHayStock.js"
import { EstadoPedido } from "../models/entities/estadoPedido.js";
import { NotFound } from "../errors/notFound.js";
import {IntentoDeCancelarEnviadoError} from "../errors/intentoDeCancelarEnviadoError.js"
import { ItemPedido } from "../models/entities/itemPedido.js";
import mongoose from "mongoose";


export class PedidosService {
	constructor(pedidosRepository, factoryNotificacion, notificacionesService, productosService,usuariosService) {
		this.pedidosRepository = pedidosRepository
		this.factoryNotificacion = factoryNotificacion	
		this.notificacionesService = notificacionesService
		this.productosService = productosService
		this.usuariosService = usuariosService
	}



	buscarTodos() {
		return this.pedidosRepository.buscarTodos()
	}

	buscarPorId(id){
		return this.pedidosRepository.buscarPorId(id)
	}

	async crear(nuevoPedidoJson) {
		
		
		const comprador = await this.usuariosService.buscarPorId(nuevoPedidoJson.compradorId);
		const items = await Promise.all(nuevoPedidoJson.items.map(async item => new ItemPedido(await this.productosService.buscarPorId(item.productoId),item.cantidad,item.precioUnitario)));
		

		const nuevoPedido = new Pedido(
			comprador,
			items,
			nuevoPedidoJson.direccionEntrega,
		)



		if (!nuevoPedido.validarStock()) {
			throw new NoHayStock();
		} //Aca se valida si el stock esta disponible.


		//Creo la notificación según el pedido
		const notificacion = await this.factoryNotificacion.crearSegunPedido(
		nuevoPedido
		);

		
		this.notificacionesService.enviar(notificacion);

		return await this.pedidosRepository.crear(nuevoPedido)
	}
	cancelar(idPedido) {
		const pedido = this.pedidosRepository.buscarPorId(idPedido);

    if (!pedido) {
        throw new NotFound(Pedido, idPedido);
    }

    async buscarPorId(id) {
        const pedido = await this.pedidosRepository.buscarPorId(id);
        if (!pedido) throw new Error('Pedido no encontrado');
        return pedido;
    }

    async crear(nuevoPedidoJson) {
        const comprador = await this.usuariosService.buscarPorId(nuevoPedidoJson.compradorId);
        const items = await Promise.all(
            nuevoPedidoJson.items.map(async item => {
                const producto = await this.productosService.buscarPorId(item.productoId);
                return new ItemPedido(producto, item.cantidad, item.precioUnitario);
            })
        );

        const nuevoPedido = new Pedido(
            comprador,
            items,
            nuevoPedidoJson.direccionEntrega,
        );

        if (!nuevoPedido.validarStock()) {
            throw new NoHayStock();
        }

        const notificacion = this.factoryNotificacion.crearSegunPedido(nuevoPedido);
        this.notificacionesService.enviar(notificacion);

        return this.pedidosRepository.crear(nuevoPedido);
    }

    async cancelar(idPedido) {
        const pedido = await this.pedidosRepository.buscarPorId(idPedido);
        if (!pedido) throw new NotFound(Pedido, idPedido);

        if (pedido.estado === EstadoPedido.ENVIADO) {
            throw new IntentoDeCancelarEnviadoError();
        }

        const actualizado = await this.pedidosRepository.actualizarEstado(idPedido, EstadoPedido.CANCELADO);
        const notificacion = this.factoryNotificacion.crearSegunPedido(actualizado);
        this.notificacionesService.enviar(notificacion);

        return actualizado;
    }

    async buscarPedidosDeUsuario(idUsuario) {
        return this.pedidosRepository.buscarPorUsuario(idUsuario);
    }

    async enviar(idPedido) {
        const pedido = await this.pedidosRepository.buscarPorId(idPedido);
        if (!pedido) throw new Error('Pedido no encontrado');

        const actualizado = await this.pedidosRepository.actualizarEstado(idPedido, EstadoPedido.ENVIADO);
        const notificacion = this.factoryNotificacion.crearSegunPedido(actualizado);
        this.notificacionesService.enviar(notificacion);

        return actualizado;
    }

}