import { ProductoModel } from "../../schemas/productoSchema.js";

export class ProductosRepository {
    constructor() {
        this.model= ProductoModel;
    }

    async buscarTodos(filtros,ordenamiento,pagina,limite) {
        
        return await this.model.find(filtros)
		.sort(ordenamiento)
		.skip(pagina)
		.limit(limite)
		.populate('vendedor')
		.populate('categorias');
    }

	
    async buscarPorId(id) {
    	return await this.model.findById(id)
		.populate('vendedor')
		.populate('categorias');
    }

    async buscarPorVendedor(idVendedor){
        return this.model.find({vendedor:idVendedor})
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

    async agregarVentas(idProducto, cantidad) {
        const productoActualizado = await this.model.UpdateOne(
            { _id: idProducto },
            { $inc: { ventas: cantidad }}
        );
        //Aquí no verificamos si no existe el id del producto, porque ya se validó antes de llamar a este método.
        await productoActualizado .save();
        
    }

    async count(){
        return this.model.countDocuments();
    }

}