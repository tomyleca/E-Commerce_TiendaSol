import { Pedido } from "../models/entities/pedido.js"

export class PedidosService {
	constructor(pedidosRepository) {
		this.pedidosRepository = pedidosRepository
}

	buscarTodos() {
		return this.pedidosRepository.buscarTodos()
}


}
