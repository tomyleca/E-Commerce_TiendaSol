import { Pedido } from "../models/entities/pedido.js"
import {FactoryNotificacion} from "../models/entities/factoryNotificacion.js"
export class PedidosService {
	constructor(pedidosRepository) {
		this.pedidosRepository = pedidosRepository
}

	buscarTodos() {
		return this.pedidosRepository.buscarTodos()
	}

	crear(nuevoPedido) {
		
		if(!nuevoPedido.validarStock()){
			throw new Error("Mail inválido");
		} // Aqui se valida si el stock esta disponible.


	 	const pedido=this.alojamientoRepository.crear(nuevoPedido)
		
		/// A DEFINIR SI HACER OTRO SERVICIO PARA LA NOFICAION SEGURAMENTE QUE SI.

        return pedido
	}

}
