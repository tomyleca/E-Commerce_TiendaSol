import { z } from "zod"

export class PedidosController {
	constructor(pedidosService) {
		this.pedidosService = pedidosService
	}

	buscarTodos(req, res) {
		const pedidos = this.pedidosService.buscarTodos()
		res.json(pedidos)
	}


}