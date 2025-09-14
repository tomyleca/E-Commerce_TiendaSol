import { z } from "zod"
import { Usuario } from "./usuario";


export class Producto {
	
	constructor(vendedor,titulo,descripcion,categorias,precio,moneda,stock,fotos,activo)
	{  
        this.vendedor=vendedor ;
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.categorias=categorias;
        this.precio=precio;
        this.modena=moneda;
        this.stock=stock;
        this.fotos=fotos;
        this.activo;activo;
    }
    //faltan hacer verificaciones que las podemos hacer con middlewares
    //o icnluso con Zod 

    estaDisponible(unaCantidad){
        return this.stock>unaCantidad;
    }

    reducirStock(unaCantidad){
        this.stock-=unaCantidad;
    }

    acumentarStock(unaCantidad){
        this.stock+=unaCantidad;
    }
}