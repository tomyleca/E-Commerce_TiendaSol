import { z } from "zod"

export class CategoriaController {
	constructor(service) {

        this.service = service
    }

	async obtenerCategorias(req, res) {
    
	    const categorias = await this.service.buscarTodos()
		res.json(categorias)
    }
    
    async crear(req,res){
        const categoria = req.body;
        const categoriaAlmacenada = await this.service.crearCategoria(categoria);
        res.status(201).json(categoriaAlmacenada);
    }


}