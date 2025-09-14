import { z } from "zod"

export class PedidosController {
	constructor(pedidosService) {
		this.pedidosService = pedidosService
	}


	buscarTodos(req, res) {
		const pedidos = this.pedidosService.buscarTodos()
		res.json(pedidos)
	}

	crear(req,res){

		const BodyPedido=req.body
		const resultBodyPedido=pedidosSchema.safeParse(BodyPedido)
		if(resultBodyPedido.error) {
            res.status(400).json(resultBody.error.issues)
            return

			//otra vez el manejo de errores.
        }

		const nuevoPedido = new Pedido(
            pedidoJSON.usuario,
            pedidoJSON.items,
            pedidoJSON.total,
			pedidoJSON.moneda,
			pedidoJSON.direccion,
			pedidoJSON.estado,
			pedidoJSON.fechaCreacion,
			pedidoJSON.historialEstados,

		);
		const PedidoGuardado = this.pedidosService.crear(nuevoAlojamiento)

        res.status(201).json(nuevaAlojamiento);
	}
	
}

const pedidosSchema = z.object({
   //A definir 
})