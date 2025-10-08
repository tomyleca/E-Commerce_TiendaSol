export class NotificacionesRepository {
	    constructor() {
        this.notificaciones = [];
        this.nextId = 0;
    }



	buscarTodos(idUsuario, leidas) {
		return this.notificaciones
		.
		
		
		filter(n => n.usuarioDestino.id === idUsuario && n.leida === leidas)
	}

	buscar(idUsuario, idNotificacion) {
		return this.notificaciones
		.find(n => n.id === idNotificacion && n.usuarioDestino.id === idUsuario)
	}
	
	
	crear(nuevaNoti) {
        nuevaNoti.id = this.nextId++;
        this.notificaciones.push(nuevaNoti)
        return nuevaNoti
    }


}
