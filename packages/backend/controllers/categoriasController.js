import { z } from "zod"
import { FormatoZodError } from "../errors/formatoZodError.js"

export class CategoriaController {
    constructor(service) {

        this.service = service
    }

    async obtenerCategorias(req, res) {

        const categorias = await this.service.buscarTodos()
        res.json(categorias)
    }
    
    async crear(req,res){
		const BodyProducto = req.body
		const resultBodyProducto = CategoriaSchema.safeParse(BodyProducto)
		
		if (!resultBodyProducto.success) {
				throw new FormatoZodError(resultBodyProducto.error)
				}

        const categoria = req.body;
        const categoriaAlmacenada = await this.service.crearCategoria(categoria);
        res.status(201).json(categoriaAlmacenada);
    }

}

const CategoriaSchema = z.object({
  nombre: z.string().min(2).max(100),
});
