import { z } from "zod"
import { FormatoZodError } from "../errors/formatoZodError.js"

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

		if (!resultBodyPedido.success) {
				throw new FormatoZodError()
		}
		const pedidoGuardado = this.pedidosService.crear(resultBodyPedido.data)

        res.status(201).json(pedidoGuardado);
	}
	
}

const ItemPedidoSchema = z.object({
  productoId: z.string().min(1, "El ID del producto es obligatorio"),
  cantidad: z.number().positive().min(1, "La cantidad debe ser al menos 1"),
  precioUnitario: z.number().nonnegative()
});


const pedidosSchema = z.object({
   comprador: z.string(),
   items: z.array(ItemPedidoSchema),
   total: z.number().nonnegative(),
   moneda: z.string(),
   direccionEntrega: z.string(),

})