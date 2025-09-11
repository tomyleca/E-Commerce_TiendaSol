import { Usuario } from "../models/entities/usuario.js"
import { Email } from "../models/entities/email.js"

export class UsuariosService {
	constructor(usuariosRepository) {
		this.usuariosRepository = usuariosRepository
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
		this.usuariosRepository.crear(nuevoUsuario)
		return nuevoUsuario
	}



}
