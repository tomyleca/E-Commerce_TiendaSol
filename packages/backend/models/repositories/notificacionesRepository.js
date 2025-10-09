import mongoose from 'mongoose';
import {NotificacionModel} from '../../schemas/notificacionSchema.js'
export class NotificacionesRepository {
	    constructor() {
        this.model = NotificacionModel;
    }


	async buscarPorUsuarioYLeida(idUsuario, leida) {
    // Convertimos idUsuario a ObjectId si viene como string
    
    const filtros = {
      usuarioDestino: idUsuario,  
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
	
	async crear(notificacion) {
 		//Si tiene id es update, si no es create
        const query = notificacion.id ? { _id: notificacion.id } : { _id: new this.model()._id };
        
        //Busca una notificacion con ese _id y la actualiza con los datos de notificacion.
        //Si no existe, la crea (por upsert: true).
        return await this.model.findOneAndUpdate(
            query,
            notificacion,
            { 
                new: true, 
                runValidators: true,
                upsert: true
            }
        );
    }

	async actualizar(notifiacion) {
			let notifiacionActualizada = await this.model
			.findByIdAndUpdate(notifiacion.id, notifiacion, { new: true });
			// el new true hace que devuelva el objeto actualizado
			
			
			//si no la encuentra, la crea
			if (!notifiacionActualizada) {
				notifiacionActualizada = await this.crear(notifiacion);
			}
	
			return notifiacionActualizada;
	
		}
    }





