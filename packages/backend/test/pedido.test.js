import { Producto } from "../models/entities/producto.js";
import { Usuario} from "../models/entities/usuario.js";
import {Email} from "../models/entities/email.js"
import {TipoUsuario} from "../models/entities/tipoUsuario.js"
import {Moneda} from "../models/entities/moneda.js"
import {Pedido} from "../models/entities/pedido.js"
import { ItemPedido } from "../models/entities/itemPedido.js";
import { DireccionEntrega } from "../models/entities/direccionEntrega.js";
import { MonedaInconsistenteItems } from "../errors/monedaInconsistenteItems.js";
import { NoHayStock } from "../errors/noHayStock.js";
import { PedidosService } from "../services/pedidosService.js";
import {PedidosRepository} from "../models/repositories/pedidosRepository.js"
import { EstadoPedido } from "../models/entities/estadoPedido.js";
import { FactoryNotificacion } from "../models/entities/factoryNotificacion.js";
import { IntentoDeCancelarEnviadoError } from "../errors/IntentoDeCancelarEnviadoError.js";
import {NotificacionesRepository} from "../models/repositories/notificacionesRepository.js"
import {NotificacionesService} from "../services/notificacionService.js"



describe('Validar usuario',() => {
	let comprador
	let direccion
	let producto
	let productoEnDolares
	let pedidosService

	beforeEach(() => {
	const email = new Email("mail@gmail.com")
	const vendedor = new Usuario(
		"Juan Perez",
		email,
		"1112341234",
		TipoUsuario.VENDEDOR)

    producto = new Producto(vendedor,
		"Producto de Prueba",
		"Este es un producto de prueba",
		"Prueba",
		1000,
		Moneda.PESO_ARG,
		1000)

	productoEnDolares = new Producto(vendedor,
		"Producto de Prueba en dolares",
		"Este es un producto de prueba en dolares",
		"Prueba",
		1000,
		Moneda.DOLAR_USA,
		1000)
	
		const emailComprador = new Email("mailComprador@gmail.com")
		comprador = new Usuario(
		"John Doe",
		emailComprador,
		"1111112222",
		TipoUsuario.COMPRADOR)	

		direccion = new DireccionEntrega("calle falsa",123)

		const notificacionesRepository = new NotificacionesRepository()
		const notificacionesService = new NotificacionesService(notificacionesRepository)
		
		const factoryNotificacion = new FactoryNotificacion()

		const pedidosRepository = new PedidosRepository()
		pedidosService = new PedidosService(pedidosRepository, factoryNotificacion,notificacionesService)
	

  		});

	test("crear pedido válido", () => {
		const pedido = new Pedido(
			comprador,
			[new ItemPedido(producto,1)],
			direccion
		) 

		expect(pedido).toBeInstanceOf(Pedido)
	
	})



	test("No me deja hacer un pedido si no hay stock", () => {

	let item = new ItemPedido(producto,1000000)
	const nuevoPedidoJson = {
		comprador: comprador,
		items: [item],
		direccionEntrega: direccion
	};


	expect(() => pedidosService.crear(nuevoPedidoJson)).toThrow(NoHayStock);
	
	})

	test("No me deja cancelar un pedido enviado", () => {

	let item = new ItemPedido(producto,1)
	const nuevoPedidoJson = {
		comprador: comprador,
		items: [item],
		direccionEntrega: direccion
	};

	let pedido = pedidosService.crear(nuevoPedidoJson)

	pedido.actualizarEstado(EstadoPedido.ENVIADO)

	expect(() => pedidosService.cancelar(pedido.id)).toThrow(IntentoDeCancelarEnviadoError);
	})
})
