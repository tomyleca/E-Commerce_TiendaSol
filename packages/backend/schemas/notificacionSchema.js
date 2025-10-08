import mongoose from "mongoose";
import {Notificacion} from '../models/entities/notificacion'

const notificacionSchema = new mongoose.Schema({

    usuarioDestino:{ type:mongoose.Schema.Types.ObjectId,
                    ref:'Usuario',
                     required:true
    },
    mensaje: { type:String,
               required:true
    },
    fechaAlta: { type:Date,
                 required:true,
    },
    leida:{ type:Boolean,
            required: true
    },
    fechaLeida:{ type:Date,
                required:true
    }
    
})

notificacionSchema.loadClass(Notificacion);
export const NotificacionModel = mongoose.model('Notificacion',notificacionSchema);