import { z } from "zod"
import { TipoUsuario } from "../models/entities/tipoUsuario.js"

export class UsuariosController {
	constructor(usuarioservice) {
		this.usuarioservice = usuarioservice
	}

	buscarTodos(req, res) {
		const usuarios = this.usuarioservice.buscarTodos()
		res.json(usuarios)
	}

	crear(req, res) {
		
			const body = req.body
			const resultBody = this.usuarioSchema.safeParse(req.body)

			if (!resultBody.success) {
				return res.status(400).json({
					error: "Datos faltantes o de formato incorrecto",
					details: resultBody.error.errors
				})
			}
			const usuarioCreado = this.usuarioservice.crear(resultBody.data)
			
			res.status(201).json(usuarioCreado)

}

	usuarioSchema = z.object({
			nombre: z.string().min(1, "El nombre es obligatorio"),
			email: z.string().min(1,"El email es obligatorio"),
			telefono: z.string().min(1, "El teléfono es obligatorio"),
			tipo: z.string().min(1,"El tipo de usuario es obligatorio")

		})
}