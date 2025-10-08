import { Notificacion } from "../models/entities/notificacion.js";
import { NotFound } from "../errors/notFound.js";

export class NotificacionesService {
  constructor(notificacionesRepository) {
    this.notificacionesRepository = notificacionesRepository;
  }


  async enviar(notificacion) {  //Por ahora enviar la noti es solo guardarla en un repositorio
    return await this.notificacionesRepository.crear(notificacion);
  }

  async getNotificaciones(idUsuario, leidas) {
  return await this.repo.buscarPorUsuarioYLeida(idUsuario, leida);
  }
	

  async getNotificacion(idUsuario,idNotificacion){
    const notificacion = await this.notificacionesRepository.buscar(idUsuario,idNotificacion)
	if(notificacion == null)
		throw new NotFound(Notificacion.name, idNotificacion)

	return notificacion
}

  async leerNotificacion(idUsuario, idNotificacion) {
	return await this.getNotificacion(idUsuario, idNotificacion).marcarComoLeida();
  }
}