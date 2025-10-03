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

	buscarTodos() {
		return this.usuariosRepository.buscarTodos()
	}

	buscarPorId(id){
		return this.usuariosRepository.buscarPorId(id)
	}

	crear(nuevoUsuarioJson) {
		const emailUsuario = new Email(nuevoUsuarioJson.email)

		const nuevoUsuario = new Usuario(
			nuevoUsuarioJson.nombre,
			emailUsuario,
			nuevoUsuarioJson.telefono,
			nuevoUsuarioJson.tipo
		)
		return this.usuariosRepository.crear(nuevoUsuario)
		
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