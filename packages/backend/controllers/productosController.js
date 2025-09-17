import {z} from "zod"
import {Moneda} from "../models/entities/moneda.js"
import { FormatoZodError } from "../errors/formatoZodError.js"


export class ProductosController {
	constructor(productosService) {
		this.productosService = productosService
	}


	buscarTodos(req, res) {
		const productos = this.productosService.buscarTodos()
		res.json(productos)
	}

	crear(req, res) {

		const BodyProducto = req.body
		const resultBodyProducto = productoSchema.safeParse(BodyProducto)

		if (!resultBodyProducto.success) {
			throw new FormatoZodError()
		}
		const productoGuardado = this.productosService.crear(resultBodyProducto.data)

		res.status(201).json(productoGuardado);
	}

}


const usuarioSchema = z.object({
  nombre: z.string().min(1),
  email: z.object({ valor: z.string().min(1) }),
  telefono: z.string().min(1),
  tipoUsuario: z.string().min(1)
});

const categoriaSchema = z.object({
  nombre: z.string()
});

export const productoSchema = z.object({
  vendedor: usuarioSchema,
  titulo: z.string(),
  descripcion: z.string(),
  categorias: z.array(categoriaSchema).optional(),
  precio: z.number(),
  moneda: z.string(),
  stock: z.number().int(),
  fotos: z.array(z.string()).optional(),
  activo: z.boolean().optional()
});