import { Producto } from "../models/entities/producto.js"

export class ProductosService {
	constructor(productosRepository,usuariosService) {
		this.productosRepository = productosRepository,
		this.usuariosService = usuariosService
	}		

	buscarTodos() {
		return this.productosRepository.buscarTodos()
	}

	buscarPorId(id){
		return this.productosRepository.buscarPorId(id)
	}

	crear(productoJson) {
		const vendedor = this.usuariosService.buscarPorId(productoJson.vendedorId)
		const nuevoProducto = new Producto(
			vendedor,
			productoJson.titulo,
			productoJson.descripcion,
			productoJson.categorias,
			productoJson.precio,
			productoJson.moneda,
			productoJson.stock,
			productoJson.fotos,
			productoJson.activo
		)


		return this.productosRepository.crear(nuevoProducto)
		
	}


}