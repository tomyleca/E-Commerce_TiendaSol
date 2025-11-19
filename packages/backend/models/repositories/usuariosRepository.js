import { UsuarioModel } from "../../schemas/usuarioSchema.js";

export class UsuariosRepository {
  //Este es el modelo que previamente dijimos que lo usabamos en node
  constructor() {
    this.model = UsuarioModel;
  }

  async buscarTodos() {
    return await this.model.find();
  }

  async buscarPorId(id) {
    return await this.model.findById(id);
  }

  async buscarPorEmail(email) {
    const direccion = typeof email === "string" ? email : email?.direccion;
    if (!direccion) return null;
    return await this.model.findOne({
      "email.direccion": direccion.trim().toLowerCase(),
    });
  }

  async buscarPorNombre(nombre) {
    return await this.model.findOne({ nombre: nombre });
  }

  async crear(usuario) {
    const nuevoUsuario = new this.model(usuario);
    return await nuevoUsuario.save();
  }
  async update(id, usuarioModificado) {
    return await this.model.findByIdAndUpdate(id, usuarioModificado, {
      new: true,
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async count() {
    return this.model.countDocuments();
  }
}
