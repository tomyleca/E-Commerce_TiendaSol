import { Pedido } from "../models/entities/pedido.js"
import {FactoryNotificacion} from "../models/entities/factoryNotificacion.js"
import { NoHayStock } from "../errors/noHayStock.js"
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

        return this.pedidosRepository.crear(nuevoPedido)
	}

}
