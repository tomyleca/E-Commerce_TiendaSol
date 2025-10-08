import { jest } from '@jest/globals'
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
import { IntentoDeCancelarEnviadoError } from "../errors/intentoDeCancelarEnviadoError.js";
import {NotificacionesRepository} from "../models/repositories/notificacionesRepository.js"
import {NotificacionesService} from "../services/notificacionesService.js"
import { UsuariosRepository } from "../models/repositories/usuariosRepository.js";
import { ProductosRepository } from "../models/repositories/productosRepository.js";



describe('Validar usuario',() => {
	let comprador
	let direccion
	let producto
	let productoEnDolares
	let pedidosService

	beforeEach(() => {
	const usuariosRepository = new UsuariosRepository()
	const productosRepository = new ProductosRepository()


	const email = new Email("mail@gmail.com")
	const vendedor = new Usuario(
		"Juan Perez",
		email,
		"1112341234",
		TipoUsuario.VENDEDOR)

		
		const _usuarios = []
		usuariosRepository.crear = jest.fn((u) => {
			u.id = _usuarios.length
			_usuarios.push(u)
			return [u]
		})
		usuariosRepository.buscarPorId = jest.fn((id) => _usuarios.find(u => u.id === id))

		const _productos = []
		productosRepository.crear = jest.fn((p) => {
			p.id = _productos.length
			_productos.push(p)
			return [p]
		})
		productosRepository.buscarPorId = jest.fn((id) => _productos.find(p => p.id === id))

		usuariosRepository.crear(vendedor)

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
		
		productosRepository.crear(producto)
		productosRepository.crear(productoEnDolares)

		const emailComprador = new Email("mailComprador@gmail.com")
		comprador = new Usuario(
		"John Doe",
		emailComprador,
		"1111112222",
		TipoUsuario.COMPRADOR)	

		usuariosRepository.crear(comprador)

		direccion = new DireccionEntrega("calle falsa",123)

		const notificacionesRepository = new NotificacionesRepository()
		const _notificaciones = []
		notificacionesRepository.crear = jest.fn((n) => {
			n.id = _notificaciones.length
			_notificaciones.push(n)
			return [n]
		})
		const notificacionesService = new NotificacionesService(notificacionesRepository)
		
		const factoryNotificacion = new FactoryNotificacion()
		factoryNotificacion.crearSegunPedido = jest.fn((pedido) => ({
			id: 'notif-1',
			usuarioDestino: pedido.comprador,
			leida: false,
			mensaje: 'mock'
		}))

		const pedidosRepository = new PedidosRepository()

		pedidosService = new PedidosService(pedidosRepository, factoryNotificacion,notificacionesService,productosRepository,usuariosRepository)
	

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

	
	const nuevoPedidoJson = {
		compradorId: 0,
		items: [{
			productoId : 0,
			cantidad :1000000000
		}],
		direccionEntrega: direccion
	};


	expect(() => pedidosService.crear(nuevoPedidoJson)).toThrow(NoHayStock);
	
	})

	test("No me deja cancelar un pedido enviado", () => {

	
	const nuevoPedidoJson = {
		compradorId: 0,
		items: [{
			productoId : 0,
			cantidad :1
		}],
		direccionEntrega: direccion
	};

	let pedido = pedidosService.crear(nuevoPedidoJson)

	pedido.actualizarEstado(EstadoPedido.ENVIADO)

	expect(() => pedidosService.cancelar(pedido.id)).toThrow(IntentoDeCancelarEnviadoError);
	})
})
