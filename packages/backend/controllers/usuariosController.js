import { z } from "zod"
import { FormatoZodError } from "../errors/formatoZodError.js"
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js"

export class UsuariosController {
	constructor(usuariosService) {
		this.usuariosService = usuariosService
	}

	buscarTodos(req, res) {
		const usuarios = this.usuariosService.buscarTodos()
		res.json(usuarios)
	}

	crear(req, res) {
		const body = req.body
		const resultBody = usuarioSchema.safeParse(body)

			if (!resultBody.success) {
				throw new FormatoZodError(resultBody.error)
			}
			const usuarioCreado = this.usuariosService.crear(resultBody.data)
			
			res.status(201).json(usuarioCreado)

	}

	buscarHistorialDePedidos(req,res){
		const id=req.params.id
		
		const idUsuario= idTransform.safeParse(id)
		if(idUsuario.error) {
			throw new FormatoInvalidoDeId(id) 
		}
		
		const historialPedidos = this.usuariosService.buscarHistorialDePedidos(idUsuario.data)
		res.status(200).json(historialPedidos)
	}

	getNotificaciones(req,res){
		const id=req.params.id
		const idUsuario= idTransform.safeParse(id)

		if(idUsuario.error) {
			throw new FormatoInvalidoDeId(id) 
		}

		const queryParams = queryNotificacionSchema.safeParse(req.query)

		if (!queryParams.success) {
			throw new FormatoZodError(queryParams.error)
		}

		const notificaciones = this.usuariosService.getNotificaciones(idUsuario.data, queryParams.data.leidas)
		
		res.status(200).json(notificaciones)
	}

	leerNotificacion(req,res){
		const id=req.params.id
		const idUsuario= idTransform.safeParse(id)
		
		if(idUsuario.error) {
			throw new FormatoInvalidoDeId(id) 
		}

		const notificacionId=req.params.notificacionId
		const idNotificacion= idTransform.safeParse(notificacionId)

		if(idNotificacion.error) {
			throw new FormatoInvalidoDeId(notificacionId)
		}

		const notificacion = this.usuariosService.leerNotificacion(idUsuario.data, idNotificacion.data)
		res.status(200).json(notificacion)
	}

}

	


const usuarioSchema = z.object({
		nombre: z.string().min(1, "El nombre es obligatorio"),
		email: z.string().min(1, "El email es obligatorio"),
		telefono: z.number().min(1, "El teléfono es obligatorio"),
		tipo: z.string().min(1, "El tipo de usuario es obligatorio")

		});
	


//Ojo que por esto hay que llamarlo con .data despues
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

//PARA VALIDAD QUE SEA UN BOOLEAN Y QUE SE COMPORTE COMO TAL
const queryNotificacionSchema = z.object({
  leidas: z.enum(['true', 'false']).transform(val => val === 'true')
});

