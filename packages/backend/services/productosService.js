import { Producto } from "../models/entities/producto.js"
import { Categoria } from "../models/entities/categoria.js";

export class ProductosService {
	constructor(productosRepository,usuariosService,categoriasService) {
		this.productosRepository = productosRepository,
		this.usuariosService = usuariosService,
		this.categoriasService=categoriasService
	}		

	async buscarTodosPaginado(pagina,cantidadPorPagina,querys) {

		const comienzo=(pagina-1)*cantidadPorPagina;
		const final= comienzo + cantidadPorPagina;

		const filtros=this.generarQueryFiltros(querys);
		const ordenamiento=this.generarQueryOrdenamiento(querys)

		const productos = await this.productosRepository.buscarTodos(filtros, ordenamiento);
		const total = this.productosRepository.count();
		let totalPaginas=1;
		if(!total==0){
        	totalPaginas = Math.ceil(total / cantidadPorPagina);
		}
        return {
            page:pagina,
            perPage: cantidadPorPagina,
            total: total, 
            totalPaginas: totalPaginas,
            data: productos
        }
		
	}

	generarQueryFiltros (filtros){
		//Definición de Filtros 
		let query = {};
        if(filtros.nombre) query.titulo= filtros.nombre;
        if(filtros.descripcion) query.descripcion=filtros.descripcion;
		if (filtros.categoria){
			query.categorias =filtros.categoria;
		}
		// Filtros de rango de precio
		if (filtros.precioMin || filtros.precioMax) {
		query.precio = {};
		if (filtros.precioMin) query.precio.$gte = filtros.precioMin;
		if (filtros.precioMax) query.precio.$lte = filtros.precioMax;
		}

		return query;
	}

	generarQueryOrdenamiento(ordenamientos){
		//Ordenamiento
		let ordenamiento={}
		if(ordenamientos.sort){
			ordenamiento ={
							precio_asc : {precio:'asc'},
							precio_desc:{precio:'desc'},
							masVendido:{ventas:'desc'}
									};
		}
		return ordenamiento
	}

	async buscarPorId(id){
		return await this.productosRepository.buscarPorId(id)
	}

	async crear(productoJson) {
		const vendedor = await this.usuariosService.buscarPorId(productoJson.vendedor);
		const categorias = await Promise.all(productoJson.categorias.map(async (categoriaId) => 
			{ const categoria= await this.categoriasService.buscarPorId(categoriaId);
			  return categoria._id; }));

		const nuevoProducto = new Producto(
			vendedor,
			productoJson.titulo,
			productoJson.descripcion,
			categorias,
			productoJson.precio,
			productoJson.moneda,
			productoJson.stock,
			productoJson.fotos,
			productoJson.activo
		)


		return await this.productosRepository.crear(nuevoProducto)
		
	}
	async buscarPorVendedor(pagina,limite,vendedorId, filtros) {
	
	filtros.vendedor =vendedorId;
	const productos = await this.buscarTodosPaginado(pagina,limite,vendedorIdfiltros);

	}

	async agregarVentasDeProducto(idProducto, cantidad) {
		await this.productosRepository.agregarVentas(idProducto,cantidad);

	}
}