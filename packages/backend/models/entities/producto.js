import { z } from "zod"
import { Usuario } from "./usuario.js";
import { Categoria } from "./categoria.js";
import { Moneda } from "./moneda.js";

export class Producto {

    constructor(vendedor, titulo, descripcion, categorias, precio, moneda, stock, fotos) {
        z.object({
            vendedor: z.instanceof(Usuario),
            titulo: z.string(),
            descripcion: z.string(),
            categorias: z.array(z.instanceof(Categoria)),
            precio: z.number(),
            moneda: z.instanceof(Moneda),
            stock: z.number().int(),
            fotos: z.array(z.string()),
            
        })

        this.id = null;
        this.vendedor = vendedor;
        this.titulo = titulo;
        this.descripcion = descripcion;
		if(!categorias)
        	this.categorias = [];
            this.precio = precio;
            this.moneda = moneda;
        this.stock = stock;
        this.fotos = fotos;
        this.activo = true;
		this.categorias = categorias;
    }


    estaDisponible(unaCantidad) {
        return this.stock > unaCantidad;
    }

    reducirStock(unaCantidad) {
        this.stock -= unaCantidad;
    }

    acumentarStock(unaCantidad) {
        this.stock += unaCantidad;
    }

	getPrecio(){
		return this.precio;
	}
}