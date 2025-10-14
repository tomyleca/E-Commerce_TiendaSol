import { z } from "zod"
import { FormatoZodError } from "../errors/formatoZodError.js"
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js"
import { chequearID } from "./utilsControllers.js"

export class UsuariosController {
	constructor(usuariosService) {
		this.usuariosService = usuariosService
	}

	async buscarTodos(req, res) {
	
		const usuarios = await this.usuariosService.buscarTodos()
		res.json(usuarios)
	
	}

	async crear(req, res) {
		const body = req.body
		const resultBody = usuarioSchema.safeParse(body)

			if (!resultBody.success) {
				throw new FormatoZodError(resultBody.error)
			}
			const usuarioCreado = await this.usuariosService
				.crear(resultBody.data)
			
			res.status(201).json(usuarioCreado)

	}

	async buscarHistorialDePedidos(req,res){
		const id=req.params.id
		
		const idUsuario= chequearID(id)
		if(!idUsuario) {
			throw new FormatoInvalidoDeId(id)
		}
		
		const historialPedidos = await this.usuariosService
			.buscarHistorialDePedidos(idUsuario)

		res.status(200).json(historialPedidos)
	}

	async getNotificaciones(req,res){
		const id=req.params.id
		const idUsuario= chequearID(id)
		if(!idUsuario) {
			throw new FormatoInvalidoDeId(id)
		}
		

		const queryParams = queryNotificacionSchema.safeParse(req.query)

		if (!queryParams.success) {
			throw new FormatoZodError(queryParams.error)
		}

		const notificaciones = await this.usuariosService.getNotificaciones(idUsuario, queryParams.data.leidas)
		
		res.status(200).json(notificaciones)
	}

	async leerNotificacion(req,res){
		const id=req.params.id
		const idUsuario= chequearID(id)
		if(!idUsuario) {
			throw new FormatoInvalidoDeId(id)
		}
		

		let idNotificacion=req.params.notificacionId
		idNotificacion= chequearID(idNotificacion)
		if(!idNotificacion) {
			throw new FormatoInvalidoDeId(idNotificacion)
		}
		
		const notificacion = await this.usuariosService.leerNotificacion(idUsuario, idNotificacion)
		res.status(200).json(notificacion)
	}

}

	


const usuarioSchema = z.object({
		nombre: z.string().min(1, "El nombre es obligatorio"),
		email: z.string().min(1, "El email es obligatorio"),
		telefono: z.number().min(1, "El teléfono es obligatorio"),
		tipo: z.string().min(1, "El tipo de usuario es obligatorio")

		});
	




//PARA VALIDAD QUE SEA UN BOOLEAN Y QUE SE COMPORTE COMO TAL
const queryNotificacionSchema = z.object({
  leidas: z.enum(['true', 'false']).transform(val => val === 'true')
});

