import { z } from "zod";
import { Usuario } from "./usuario.js";
import { CambioDeEstadoPedido } from "./cambioEstadoPedido.js";
import { EstadoPedido } from "./estadoPedido.js";

export class Pedido {
	
	constructor(comprador,items,total,moneda,direccionEntrega,estado,fecha,historial )
	{


		this.comprador = comprador
		this.itemPedidos=items;
		this.total= total;
		this.moneda=moneda;
		this.direccionEntrega=direccionEntrega;
		
		if (!Object.values(EstadoPedido).includes(estado)) {
     	 throw new Error(`Estado inválido: ${estado}`);
    	}
		//Ver si hacerlo de esta manera los errores o hacerlo como en la clase 5 de los sabados
		this.estado=estado;
		this.fechaDeCreacion=fecha;
		this.historialDeEstados=historial;

	}

	getUsuario(){
		return this.usuario;
	}

	calcularTotal(){

		return itemPedidos.reduce((acumulador,item)=> { return acumulador + item.subTotal()},0)
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