export class PedidoRepository {
	    constructor() {
        this.pedidos = [];
        this.nextId = 0;
    }

	buscarTodos() {
		return this.pedidos;
	}


}
