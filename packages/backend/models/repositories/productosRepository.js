import { ProductoModel } from "../../schemas/productoSchema.js";

export class ProductosRepository {
    constructor() {
        this.model= ProductoModel;
    }

    async buscarTodos() {
        return await this.model.find();
    }

    async buscarPorId(id) {
        return await this.model.findById(id);
    }
    async crear(producto) {
        const nuevoProducto = new this.model(producto);
        return await nuevoProducto.save();
    }

    async eliminar(id){
        return await this.model.findByIdAndDelete(id);
    }

}