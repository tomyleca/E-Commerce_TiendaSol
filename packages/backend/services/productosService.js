import { Producto } from "../models/entities/producto.js"

export class ProductosService {
	constructor(productosRepository) {
		this.productosRepository = productosRepository
	}		

	buscarTodos() {
		return this.productosRepository.buscarTodos()
	}

	crear(productoJson) {

		const nuevoProducto = new Producto(
			productoJson.vendedor,
			productoJson.titulo,
			productoJson.descripcion,
			productoJson.categorias,
			productoJson.precio,
			productoJson.moneda,
			productoJson.stock,
			productoJson.fotos,
			productoJson.activo
		)


		return this.usuariosRepository.crear(nuevoProducto)
		
	}

	buscarPorId(id)
	{
		return this.productosRepository.buscarPorId(id)
	}
}