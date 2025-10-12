import { Producto } from "../models/entities/producto.js"

export class ProductosService {
	constructor(productosRepository,usuariosService) {
		this.productosRepository = productosRepository,
		this.usuariosService = usuariosService
	}		

	async buscarTodosPaginado(pagina,cantidadPorPagina,filtros) {

		const comienzo=(pagina-1)*cantidadPorPagina;
		const final= comienzo + cantidadPorPagina;

		//Definición de Filtros 

		let query = {};
        if(filtros.nombre) query.nombre= filtros.nombre;
        if(filtros.descripcion) query.descripcion=filtros.descripcion;
        if(filtros.categoria) query.categoria;

		//Definición de Ordenamiento
		const ordenamiento={}
		if(filtros.sort){
			ordenamiento ={
									precio_asc : {precio:'asc'},
									precio_desc:{precio:'desc'},
									masVendido:{ventas:'desc'}
									};
		}
		const productos = await this.productosRepository.buscarTodos(filtros, ordenamiento);
		const total = this.productosRepository.count();
        const totalPaginas = Math.ceil(total / cantidadPorPagina)
        
        return {
            page:pagina,
            perPage: cantidadPorPagina,
            total: total, 
            totalPaginas: totalPaginas,
            data: productos
        }
		
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
	async buscarPorVendedor(vendedorId, filtros) {
	const vendedor =await this.usuariosService.buscarPorId(vendedorId);
    if (!vendedor) throw new Error("Debe especificar un vendedor");

    // Validación de precios
    if (filtros.precioMin && isNaN(filtros.precioMin))
      //throw new Error("deben ser numeros");
    if (filtros.precioMax && isNaN(filtros.precioMax))
      throw new Error("deben ser numeros "); // generar un error especifico

	}

	async agregarVentasDeProducto(idProducto, cantidad) {
		const producto = await this.productosRepository.agregarVentas(idProducto,cantidad);

	}
}