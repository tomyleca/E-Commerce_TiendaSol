import { CategoriaModel } from "../../schemas/categoriaSchema.js";

export class CategoriasRepository {
  constructor() {
    this.model = CategoriaModel;
  }

  async buscarTodos() {
    return await this.model.find();
  }

  async buscarPorId(id) {
    return await this.model.findById(id);
  }

  async buscarPorNombre(nombre) {
    return await this.model.findOne({ nombre });
  }

  async crear(categoria) {
    const nuevaCategoria = new this.model(categoria);
    return await nuevaCategoria.save();
  }

  async actualizar(id, categoriaActualizada) {
    return await this.model.findByIdAndUpdate(id, categoriaActualizada, {
      new: true,
      runValidators: true,
    });
  }

  async eliminar(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async count() {
    return this.model.countDocuments();
  }
}
