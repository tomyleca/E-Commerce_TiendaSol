import { z } from "zod"
import { Usuario } from "./usuario";
import { Pedido } from "./pedido";

export class CambioDeEstadoPedido {
	
	constructor(fecha,estadoPedido,pedido,usuario,motivo)
	{   const cambioSchema = z.object({
        fecha: z.instanceof(Date),
        estadoPedido: z.string(),
        pedido: z.instanceof(Pedido),
        usuario: z.instanceof(Usuario),
        motivo: z.string().optional()
        })

        const validacion = schema.parse({fecha,estadoPedido,pedido,usuario,motivo });

        this.fecha=validacion.fecha;
        this.estado=validacion.estadoPedido;
        this.pedido=validacion.pedido;
        this.usuario=validacion.usuario;
        this.motivo=validacion.motivo;
        //supongo que hay que ahcer validaciones tanto como para pedido,como para el usuario.
    }
    

}