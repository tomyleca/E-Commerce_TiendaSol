import { Pedido } from "../models/entities/pedido.js"

export class PedidoService {
	constructor(pedidoRepository) {
		this.pedidoRepository = pedidoRepository
}

	buscarTodos() {
		return this.pedidoRepository.buscarTodos()
}


}
