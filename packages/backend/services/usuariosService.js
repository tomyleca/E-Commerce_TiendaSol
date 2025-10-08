import { Usuario } from "../models/entities/usuario.js"
import { Email } from "../models/entities/email.js"

export class UsuariosService {
	constructor(usuariosRepository, notificacionesService) {
		this.usuariosRepository = usuariosRepository
		this.pedidosService = null
		this.notificacionesService = notificacionesService
	}		

	setPedidosService(pedidosService) {
		this.pedidosService = pedidosService
	}

	async buscarTodos() {
		return await this.usuariosRepository.buscarTodos()
	}

	async buscarPorId(id){
		return await this.usuariosRepository.buscarPorId(id)
	}

	async crear(nuevoUsuarioJson) {
		const emailUsuario = new Email(nuevoUsuarioJson.email)

		const nuevoUsuario = new Usuario(
			nuevoUsuarioJson.nombre,
			emailUsuario,
			nuevoUsuarioJson.telefono,
			nuevoUsuarioJson.tipo
		)
		return await this.usuariosRepository.crear(nuevoUsuario)
		
	}

	buscarHistorialDePedidos(id){
		return this.pedidosService.buscarPedidosDeUsuario(id);
	}

	
	getNotificaciones(id, leidas) {
	return this.notificacionesService.getNotificaciones(id, leidas)
	}

	getNotificacion(idUsuario, idNotificacion) {
		return this.notificacionesService.getNotificacion(idUsuario, idNotificacion)
	}

	leerNotificacion(idUsuario, idNotificacion) {
		return this.notificacionesService.leerNotificacion(idUsuario, idNotificacion)

}
}