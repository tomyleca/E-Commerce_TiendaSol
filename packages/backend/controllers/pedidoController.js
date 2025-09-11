import { z } from "zod"

export class PedidoController {
	constructor(pedidoService) {
		this.pedidoService = pedidoService
	}

	buscarTodos(req, res) {
		const pedidos = this.pedidoService.buscarTodos()
		res.json(pedidos)
	}


}