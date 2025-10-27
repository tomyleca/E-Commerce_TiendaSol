import { z } from "zod";

export class CategoriaController {
  constructor(service) {
    this.service = service;
  }

  async obtenerCategorias(req, res) {
    const categorias = await this.service.buscarTodos();
    res.json(categorias);
  }

  async crear(req, res) {
    const data = CategoriaSchema.parse(req.body);
    const categoriaAlmacenada = await this.service.crearCategoria(data);
    res.status(201).json(categoriaAlmacenada);
  }
}

const CategoriaSchema = z.object({
  nombre: z.string().min(2).max(100),
});
