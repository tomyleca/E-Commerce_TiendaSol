export class NotificacionesRepository {
	    constructor() {
        this.notificaciones = [];
        this.nextId = 0;
    }

	buscarTodos() {
		return this.notificaciones;
	}
	
	
	crear(nuevaNoti) {
        nuevaNoti.id = this.nextId++;
        this.notificaciones.push(nuevaNoti)
        return nuevaNoti
    }


}
