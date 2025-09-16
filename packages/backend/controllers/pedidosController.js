import { z } from "zod"

export class PedidosController {
	constructor(pedidosService) {
		this.pedidosService = pedidosService
	}

	buscarTodos(req, res) {
		const pedidos = this.pedidosService.buscarTodos()
		res.json(pedidos)
	}

	crear(req, res) {
		const body = req.body
		const resultBody = pedidoSchema.safeParse(body)

		if (!resultBody.success) {
			return res.status(400).json({
				error: "Datos faltantes o de formato incorrecto",
				details: resultBody.error.errors
			})
		}
		const pedidoCreado = this.pedidosService.crear(resultBody.data)

		res.status(201).json(pedidoCreado)

	}

	pedidoSchema = z.object({
		nombre: z.string().min(1, "El nombre es obligatorio"),
		email: z.string().min(1, "El email es obligatorio"),
		telefono: z.string().min(1, "El teléfono es obligatorio"),
		tipo: z.string().min(1, "El tipo de usuario es obligatorio"),

		id: z.string().min(1)
	})

}