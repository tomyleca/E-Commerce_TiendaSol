import mongoose from 'mongoose';
import {NotificacionModel} from '../../schemas/notificacionSchema'
export class NotificacionesRepository {
	    constructor() {
        this.model = NotificacionModel;
    }


	async buscarPorUsuarioYLeida(idUsuario, leida) {
    // Convertimos idUsuario a ObjectId si viene como string
    const objectIdUsuario = mongoose.Types.ObjectId(idUsuario);
    const filtros = {
      usuarioDestino: objectIdUsuario,  
      leida: leida                       
    };

    return await this.model.find(filtros); 
	}

	async buscar(idUsuario, idNotificacion) {
	return await this.model.findOne({
            _id: idNotificacion,
            usuarioDestino: idUsuario
        });
    }
	
	async crear(nuevaNoti) {
        const nuevoNotificacion = new this.model(nuevaNoti);
        return await nuevoNotificacion.save();
    }


}
