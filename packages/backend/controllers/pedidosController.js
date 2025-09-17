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

	crear(req, res) {

		const BodyPedido = req.body
		const resultBodyPedido = pedidosSchema.safeParse(BodyPedido)

		if (!resultBodyPedido.success) {
			throw new FormatoZodError()
		}
		const pedidoGuardado = this.pedidosService.crear(resultBodyPedido.data)

		res.status(201).json(pedidoGuardado);
	}

	cancelar(idPedido, res) {
		this.pedidosService.cancelar(idPedido);
		res.status(200).json("Pedido cancelado exitosamente");
	}

	enviar(idPedido, res) {
		this.pedidosService.enviar(idPedido);
		res.status(200).json("Pedido enviado exitosamente");
	}
}



const ItemPedidoSchema = z.object({
  productoId: z.string().or(z.number()),
  cantidad: z.number().positive(),
  precioUnitario: z.number().nonnegative().optional()
});

const pedidosSchema = z.object({
  compradorId: z.number(),
  items: z.array(ItemPedidoSchema),
  total: z.number().nonnegative(),
  moneda: z.string(),
  direccionEntrega: z.string()
});