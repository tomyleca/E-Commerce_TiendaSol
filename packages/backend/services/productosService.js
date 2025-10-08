import { Producto } from "../models/entities/producto.js"

export class ProductosService {
	constructor(productosRepository,usuariosService) {
		this.productosRepository = productosRepository,
		this.usuariosService = usuariosService
	}		

	async buscarTodos() {
		return await this.productosRepository.buscarTodos()
	}

	async buscarPorId(id){
		return await this.productosRepository.buscarPorId(id)
	}

	async crear(productoJson) {
		const vendedor = await this.usuariosService.buscarPorId(productoJson.vendedorId)
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


		return await this.productosRepository.crear(nuevoProducto)
		
	}


}