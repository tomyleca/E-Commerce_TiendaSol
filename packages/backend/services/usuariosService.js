import { Usuario } from "../models/entities/usuario.js"
import { Email } from "../models/entities/email.js"

export class UsuariosService {
	constructor(usuariosRepository,pedidosService) {
		this.usuariosRepository = usuariosRepository
		this.pedidosService = pedidosService
	}		

	buscarTodos() {
		return this.usuariosRepository.buscarTodos()
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

	buscarHistorialDePedidos(idUsuario){
		return this.pedidosService().buscarPedidosDeUsuario(idUsuario);
	}



}
