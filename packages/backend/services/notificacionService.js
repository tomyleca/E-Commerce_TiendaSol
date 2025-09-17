import { Notificacion } from "../models/entities/notificacion.js";

export class NotificacionesService {
  constructor(notificacionesRepository) {
    this.notificacionesRepository = notificacionesRepository;
  }


  async enviar(notificacion) {  //Por ahora enviar la noti es solo guardarla en un repositorio
    return this.notificacionesRepository.crear(notificacion);
  }


}