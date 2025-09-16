import { z } from "zod"
import { Usuario } from "./usuario.js";


export class Notificacion {
	
	constructor(usuario,mensaje,fecha,leida , fechaLeida)
	{  
        this.usuario=usuario;
        this.mensaje=mensaje;
        this.fechaAlta=fecha;
        this.leida=leida;
        this.fechaLeida=fechaLeida;
    }

    marcarComoLeida(){

        this.leida=true
        this.fechaLeida = new Date();
    }

}
