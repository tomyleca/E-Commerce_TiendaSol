import { Producto } from "../models/entities/producto.js"

export class ProductosService {
	constructor(productosRepository,usuariosRepository) {
		this.productosRepository = productosRepository,
		this.usuariosRepository = usuariosRepository
	}		

	buscarTodos() {
		return this.productosRepository.buscarTodos()
	}

	crear(productoJson) {
		const vendedor = this.usuariosRepository.buscarPorId(productoJson.vendedorId)
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

	buscarPorId(id)
	{
		return this.productosRepository.buscarPorId(id)
	}
}