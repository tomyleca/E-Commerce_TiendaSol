import { z } from "zod"
import { Usuario } from "./usuario.js";
import dayjs from "dayjs";


export class Notificacion {

    constructor(id, usuarioDestino, mensaje) {
        z.object({
            id: z.string(),
            usuarioDestino: z.instanceof(Usuario),
            mensaje: z.string(),
			leida : z.boolean(),
			fechaLeida : z.date().nullable(),
            fecha : z.date()
            
        })

        this.id = id;
        this.usuarioDestino = usuarioDestino;
        this.mensaje = mensaje;
        this.fechaAlta = dayjs().toDate();
        this.leida = false;
        this.fechaLeida = null;
    }

    marcarComoLeida() {

        this.leida = true
        this.fechaLeida = dayjs().toDate();
    }

}
