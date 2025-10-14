import { z } from "zod";
import dayjs from "dayjs";
import { Usuario } from "./usuario.js";
import { CambioDeEstadoPedido } from "./cambioEstadoPedido.js";
import { EstadoPedido } from "./estadoPedido.js";
import { ValorNoCumpleConEnum } from "../../errors/valorNoCumpleConEnum.js"
import { Moneda } from "./moneda.js"
import { ItemPedido } from "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { MonedaInconsistenteItems } from "../../errors/monedaInconsistenteItems.js"

export class Pedido {

	constructor(comprador, items, direccionEntrega) {
		z.object({
			comprador: z.instanceof(Usuario),
			items: z.array(z.instanceof(ItemPedido)).min(1),
			direccionEntrega: z.instanceof(DireccionEntrega),
		})
		this.id =null;
		this.comprador = comprador
		this.itemsPedido = items;
		this.vendedor = items[0].producto.vendedor; // Asumiendo que todos los productos son del mismo vendedor
		this.total;
		
		this.moneda = items[0].producto.moneda; // Asumiendo que todos los productos son del mismo vendedor
		this.direccionEntrega = direccionEntrega;

		/*
		if (!Object.values(EstadoPedido).includes(estado)) {
				throw new ValorNoCumpleConEnum("EstadoPedido",estado);
		}
			*/ //Pasar a donde vaya

		this.estado = EstadoPedido.PENDIENTE;
		this.fechaDeCreacion = dayjs().toDate(); // le pongo la fecha de hoy
		this.historialDeEstados = [this.estado];

		//Valido que sean todos de la misma moneda
		let monedaEsperada = items[0].producto.moneda
		if(!items.every(item => item.producto.moneda === monedaEsperada ))
			throw new MonedaInconsistenteItems()


	}

	getUsuario() {
		return this.usuario;
	}


	calcularTotal() {

		return this.itemsPedido.reduce((acumulador, item) => { return acumulador + item.subTotal() }, 0)
	}

	actualizarEstado(nuevoEstado) {
		if (this.estado === EstadoPedido.ENTREGADO && nuevoEstado === EstadoPedido.PENDIENTE) {
			throw new Error("No se puede volver a Pendiente una vez Entregado");
		}
		this.estado = nuevoEstado;
		this.historialDeEstados.push(nuevoEstado);
	}

	validarStock() {
		return this.itemsPedido.every(item => item.stockEstaDisponible())
	}



}