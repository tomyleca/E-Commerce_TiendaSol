export class UsuariosRepository {
	    constructor() {
        this.usuarios = [];
        this.nextId = 0;
    }

	buscarTodos() {
		return this.usuarios;
	}

	crear(usuario) {
		usuario.id = this.nextId++;
		this.usuarios.push(usuario);
	}


}
