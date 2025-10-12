import {z} from "zod"
import {Moneda} from "../models/entities/moneda.js"
import { FormatoZodError } from "../errors/formatoZodError.js"


export class ProductosController {
	constructor(productosService) {
		this.productosService = productosService
	}


	async buscarTodos(req, res) {
		const {pagina =1, limite= 5 }= req.query;
		const filtros = req.query;
		const productos = await this.productosService.buscarTodosPaginado(pagina,limite,filtros);
		if(!productos) {
			//Podria cambiar el error
			return res.status(204).send()
		}
		res.json(productos)
	}

	async crear(req, res) {

		const BodyProducto = req.body
		const resultBodyProducto = productoSchema.safeParse(BodyProducto)

		if (!resultBodyProducto.success) {
			throw new FormatoZodError(resultBodyProducto.error)
		}
		const productoGuardado = await this.productosService.crear(resultBodyProducto.data)

		res.status(201).json(productoGuardado);
	}
	
	async buscarProductosDeVendedor(req,res){
		const vendedor = req.params.id;
		const filtros =req.query;
		
		await this.productosService.buscarPorVendedor(vendedor,filtros)

	}

}




const categoriaSchema = z.object({
  nombre: z.string()
});

export const productoSchema = z.object({
  vendedorId: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  categorias: z.array(categoriaSchema).optional(),
  precio: z.number(),
  moneda: z.string(),
  stock: z.number().int(),
  fotos: z.array(z.string()).optional(),
  activo: z.boolean().optional()
});