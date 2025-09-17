import { z } from "zod";
import dayjs from "dayjs";
import { Usuario } from "./usuario.js";
import { CambioDeEstadoPedido } from "./cambioEstadoPedido.js";
import { EstadoPedido } from "./estadoPedido.js";
import { ValorNoCumpleConEnum } from "../../errors/valorNoCumpleConEnum.js"
import { Moneda } from "./moneda.js"
import { ItemPedido } from "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";

export class Pedido {

	constructor(id, comprador, items, total, moneda, direccionEntrega, estado, fechaCreacion, historialEstados) {
		z.object({
			id: z.string(),
			comprador: z.instanceof(Usuario),
			items: z.array(z.instanceof(ItemPedido)),
			total: z.number(),
			moneda: z.instanceof(Moneda),
			direccionEntrega: z.instanceof(DireccionEntrega),
			estado: z.instanceof(EstadoPedido),
			fechaCreacion: z.datetime(),
			historialEstados: z.array(z.instanceof(CambioDeEstadoPedido))
		})

		this.comprador = comprador
		this.itemPedidos = items;
		this.vendedor = items[0].producto.vendedor; // Asumiendo que todos los productos son del mismo vendedor
		this.total = total;
		if (!Object.values(Moneda).includes(moneda)) {
			throw new ValorNoCumpleConEnum("Moneda", moneda);
		}
		this.moneda = moneda;
		this.direccionEntrega = direccionEntrega;

		/*
		if (!Object.values(EstadoPedido).includes(estado)) {
				throw new ValorNoCumpleConEnum("EstadoPedido",estado);
		}
			*/ //Pasar a donde vaya

		this.estado = EstadoPedido.PENDIENTE;
		this.fechaDeCreacion = dayjs().toDate(); // le pongo la fecha de hoy
		this.historialDeEstados = [this.estado];

	}

	getUsuario() {
		return this.usuario;
	}

	calcularTotal() {

		return this.itemPedidos.reduce((acumulador, item) => { return acumulador + item.subTotal() }, 0)
	}

	actualizarEstado(nuevoEstado) {
		if (this.estado === EstadoPedido.ENTREGADO && nuevoEstado === EstadoPedido.PENDIENTE) {
			throw new Error("No se puede volver a Pendiente una vez Entregado");
		}
		this.estado = nuevoEstado;
		this.historialDeEstados.push(nuevoEstado);
	}

	validarStock() {
		return this.itemPedidos.every(item => item.stockEstadisponible())
	}



}