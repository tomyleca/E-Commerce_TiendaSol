import { Categoria } from "../models/entities/categoria.js";

export class CategoriaService {
  constructor(categoriasRepository) {
    this.categoriasRepository = categoriasRepository;
  }

  async crearCategoria(categoria) {
    const catego = new Categoria(categoria.nombre);
    return await this.categoriasRepository.crear(catego);
  }

  async buscarTodos() {
    return await this.categoriasRepository.buscarTodos();
  }

  async buscarPorId(idCategoria) {
    return await this.categoriasRepository.buscarPorId(idCategoria);
  }
}
