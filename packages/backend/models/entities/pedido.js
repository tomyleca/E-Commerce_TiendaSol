import { z } from "zod"

export class Pedido {
	constructor(id, comprador, items, total, moneda, direccionEntrega, estado, fechaCreacion, historialEstados) {
		/*z.object({
			id: z.string().min(1),
			comprador: ,
			items: ,
			total: z.number().nonegative(),
			moneda: ,
			direccionEntrega: ,
			estado: ,
			fechaCreacion: z.string().datetime(),
			historialEstados: 
		})*/

		this.id = id;
		this.comprador = comprador;
		this.items = items;
		this.total = total;
		this.moneda = moneda;
		this.direccionEntrega = direccionEntrega;
		this.estado = estado;
		this.fechaCreacion = fechaCreacion;
		this.historialEstados = historialEstados;
	}

}