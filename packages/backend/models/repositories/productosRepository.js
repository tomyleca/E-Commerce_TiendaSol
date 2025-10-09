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

	async actualizar(producto) {
			let productoActualizado = await this.model
			.findByIdAndUpdate(producto.id, producto, { new: true });
			// el new true hace que devuelva el objeto actualizado
			
			
			//si no lo encuentra, lo crea
			if (!productoActualizado) {
				productoActualizado = await this.crear(producto);
			}

			return productoActualizado;

		}

    async eliminar(id){
        return await this.model.findByIdAndDelete(id);
    }

}