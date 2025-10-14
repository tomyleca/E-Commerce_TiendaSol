import { Producto } from "../models/entities/producto.js"
import { Categoria } from "../models/entities/categoria.js";
import { NotFound } from "../errors/notFound.js";
import mongoose from 'mongoose';

export class ProductosService {
	constructor(productosRepository,usuariosService,categoriasService) {
		this.productosRepository = productosRepository,
		this.usuariosService = usuariosService,
		this.categoriasService=categoriasService
	}		

	async buscarTodosPaginado(pagina,cantidadPorPagina,querys) {

		const comienzo=(pagina-1)*cantidadPorPagina;
		

		const filtros=await this.generarQueryFiltros(querys);
		if(filtros instanceof Error) {
			return filtros;
		}	

		const ordenamiento=await this.generarQueryOrdenamiento(querys)

		const productos = await this.productosRepository.buscarTodos(filtros, ordenamiento,comienzo,cantidadPorPagina);
		const total = await this.productosRepository.count(filtros);
		let totalPaginas=1;
		if(!total==0){
        	totalPaginas = Math.ceil(total / cantidadPorPagina);
		}
        return {
            page:pagina,
            perPage: cantidadPorPagina,
            totalElementos: total, 
            totalPaginas: totalPaginas,
            data: productos
        }
		
	}

	async generarQueryFiltros (filtros){
		//Definición de Filtros 
		let query = {};
        if(filtros.nombre) query.titulo= filtros.nombre;
        if(filtros.descripcion) query.descripcion=filtros.descripcion;
		
		// Acepta 'categoria' o 'categorias' y normaliza a array de ObjectId válidos
		const catParam = filtros.categorias ?? filtros.categoria;
		if (catParam) {
			const categorias = Array.isArray(catParam)
				? catParam
				: String(catParam).split(',').map(s => s.trim()).filter(Boolean);
			for (const id of categorias) {
				if (!mongoose.Types.ObjectId.isValid(id)) {
					throw new NotFound("Categoria", id);
				}
			}
			query.categorias = { $in: categorias };
		}

		if (!mongoose.Types.ObjectId.isValid(filtros.vendedor) && filtros.vendedor) {
                throw new NotFound("Usuario", filtros.vendedor);
            }
		 if(filtros.vendedor) query.vendedor =filtros.vendedor;

		// Filtros de rango de precio
		if (filtros.precioMin || filtros.precioMax) {
		query.precio = {};
		if (filtros.precioMin) query.precio.$gte = filtros.precioMin;
		if (filtros.precioMax) query.precio.$lte = filtros.precioMax;
		}

		return query;
	}

	async generarQueryOrdenamiento(ordenamientos){
		//1=asc y -1=desc
		switch (ordenamientos?.sort) {
			case 'precio_asc':
				return { precio: 1 };
			case 'precio_desc':
				return { precio: -1 };
			case 'masVendido':
				return { ventas: -1 };
			default:
				return {}; // sin orden explícito
		}
	}

	async buscarPorId(id){
		return await this.productosRepository.buscarPorId(id)
	}

	async crear(productoJson) {
		const vendedor = await this.usuariosService.buscarPorId(productoJson.vendedorId);
		if(!vendedor) {
			throw new NotFound("Usuario", productoJson.vendedorId);
		}
		let categorias;
		if(productoJson.categoriasId) {
			categorias = await Promise.all(productoJson.categoriasId.map(async (categoriaId) => {
				const categoria = await this.categoriasService.buscarPorId(categoriaId);
				if (!categoria) {
					throw new NotFound("Categoria", categoriaId);
			  }
			return categoria;
		}));
		} else {
			categorias = [];
		}

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
	
	filtros.vendedor = vendedorId;
	const productos = await this.buscarTodosPaginado(pagina,limite,filtros);
	return productos;
	}

	async agregarVentasDeProducto(idProducto, cantidad) {
		const producto = await this.buscarPorId(idProducto);
		if (!producto) {
			throw new NotFound("Producto", idProducto);
		}
		producto.ventas = (producto.ventas || 0) + cantidad;
		await this.productosRepository.actualizar(producto);

	}
}