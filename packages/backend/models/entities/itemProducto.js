import { z } from "zod"

export class ItemProducto {
	
	constructor(producto,cantidad,precioUnitario)
	{  
        this.producto=producto;
        this.cantidad=cantidad;
        this.precioUnitario=precioUnitario;
    }
    //FALTAN ATRPAR LOS ERRORES O VERIFICAR LOS DATOS EN SI

    subTotal(){

        return this.cantidad*this.precioUnitario;
    }

    stockEstaDisponible(){
        return this.producto.estaDisponible(this.cantidad)
    }
}