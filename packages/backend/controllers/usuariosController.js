import { z } from "zod"
import { TipoUsuario } from "../models/entities/tipoUsuario.js"
import { FormatoZodError } from "../errors/formatoZodError.js"
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js"

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
				throw new FormatoZodError()
			}
			const usuarioCreado = this.usuarioservice.crear(resultBody.data)
			
			res.status(201).json(usuarioCreado)

	}

	buscarHistorialDePedidos(req,res){
		const id=req.params.id
		const idUsuario= idTransform.safeParse(id)
		if(idUsuario.error) {
			throw new FormatoInvalidoDeId(id) 
		}
		
		const historialPedidos = this.usuarioservice.buscarHistorialDePedidos(idUsuario)
		res.status(200).json(historialPedidos)
	}


	usuarioSchema = z.object({
			nombre: z.string().min(1, "El nombre es obligatorio"),
			email: z.string().min(1,"El email es obligatorio"),
			telefono: z.string().min(1, "El teléfono es obligatorio"),
			tipo: z.string().min(1,"El tipo de usuario es obligatorio")

		})


}

const idTransform = z.string().transform(((val, ctx)  => {
    const num = Number(val);
    if (isNaN(num)) {
        ctx.addIssue({
            code: "INVALID_ID",
            message: "id must be a number"
        });
        return z.NEVER;
    }
    return num;
}))