import { z } from "zod";
import dayjs from "dayjs";
import { Usuario } from "./usuario.js";
import { CambioDeEstadoPedido } from "./cambioEstadoPedido.js";
import { EstadoPedido } from "./estadoPedido.js";
import {ValorNoCumpleConEnum} from "../../errors/valorNoCumpleConEnum.js"
import {Moneda} from "./moneda.js"

export class Pedido {
	
	constructor(comprador,items,total,moneda,direccionEntrega)
	{


		this.comprador = comprador
		this.itemPedidos=items;
		this.total= total;
		if (!Object.values(Moneda).includes(moneda)) {
     		throw new ValorNoCumpleConEnum("Moneda",moneda);
    	}
		this.moneda=moneda;
		this.direccionEntrega=direccionEntrega;
		
		/*
		if (!Object.values(EstadoPedido).includes(estado)) {
     		throw new ValorNoCumpleConEnum("EstadoPedido",estado);
    	}
			*/ //Pasar a donde vaya
		
		this.estado = EstadoPedido.PENDIENTE;
		this.fechaDeCreacion=dayjs().toDate(); // le pongo la fecha de hoy
		this.historialDeEstados=[this.estado]; 

	}

	getUsuario(){
		return this.usuario;
	}

	calcularTotal(){

		return this.itemPedidos.reduce((acumulador,item)=> { return acumulador + item.subTotal()},0)
	}

	actualizarEstado(nuevoEstado,quien,motivo){
		if (this.estado ===EstadoPedido.ENTREGADO && nuevoEstado === EstadoPedido.PENDIENTE) {
      		throw new Error("No se puede volver a Pendiente una vez Entregado");
		}
		this.estado=nuevoEstado;
		this.historialDeEstados.push(nuevoEstado);
		//FALTA LLEVAR EL MANEJO DE ERRORES
		//PODRIA AHCERSE DE OTRA MANERA
		//Se deberia crear aqui la notificaion eos tiene sentido ?
	}

	validarStock(){
		
		return this.itemPedidos.every(item=> item.stockEstadisponible())
	}



}