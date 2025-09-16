import { z } from "zod"
import { Usuario } from "./usuario.js";


export class Notificacion {

    constructor(id, usuarioDestino, mensaje, fecha, leida, fechaLeida) {
        z.object({
            id: z.string(),
            usuarioDestino: z.instanceof(Usuario),
            mensaje: z.string(),
            fechaAlta: z.string().datetime(),
            leida: z.boolean(),
            fechaLeida: z.string().datetime()
        })

        this.id = id;
        this.usuarioDestino = usuarioDestino;
        this.mensaje = mensaje;
        this.fechaAlta = fecha;
        this.leida = leida;
        this.fechaLeida = fechaLeida;
    }

    marcarComoLeida() {

        this.leida = true
        this.fechaLeida = new Date();
    }

}
