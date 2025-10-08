import { PedidoModel } from "../../schemas/pedidoSchema.js";

export class PedidosRepository {
    constructor() {
        this.model= PedidoModel;
    }

    async buscarTodos() {
        return await this.model.find();
    }

    async buscarPorId(id) {
        return await this.model.findById(id);
    }
    async crear(pedido) {
        const nuevoPedido = new this.model(pedido);
        return await nuevoPedido.save();
    }


    async buscarPorUsuario(idUsuario) {
        return await this.model.find({ comprador: idUsuario });
    }
		
    


}
