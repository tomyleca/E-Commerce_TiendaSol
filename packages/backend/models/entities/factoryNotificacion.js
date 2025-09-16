import { z } from "zod"
import { EstadoPedido } from "./estadoPedido.js";
import { Pedido } from "./pedido.js";

export class FactoryNotificacion{
	
	crearSegunEstadoPedido(estado){

        if (!Object.values(EstadoPedido).includes(estado)) {
     	 throw new Error(`Estado inválido: ${estado}`);
    	}
        //Crear errores especificos , por ahora se quedan asi.
        const estadoString = estado.toString();
        return estadoString
    
    }

    crearSegunPedido(pedido){
        //TODO
    }
}