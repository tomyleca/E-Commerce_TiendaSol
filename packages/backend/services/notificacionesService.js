import { Notificacion } from "../models/entities/notificacion.js";
import { NotFound } from "../errors/notFound.js";

export class NotificacionesService {
  constructor(notificacionesRepository) {
    this.notificacionesRepository = notificacionesRepository;
  }


  async enviar(notificacion) {  //Por ahora enviar la noti es solo guardarla en un repositorio
    return this.notificacionesRepository.crear(notificacion);
  }

  getNotificaciones(idUsuario, leidas) {
	return this.notificacionesRepository.buscarTodos(idUsuario, leidas);
  }

  getNotificacion(idUsuario,idNotificacion){
    const notificacion = this.notificacionesRepository.buscar(idUsuario,idNotificacion)
	if(notificacion == null)
		throw new NotFound(Notificacion.name, idNotificacion)

	return notificacion
}

  leerNotificacion(idUsuario, idNotificacion) {
	return this
	.getNotificacion(idUsuario, idNotificacion)
	.marcarComoLeida();
  }
}