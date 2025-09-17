export class PedidosRepository {
	    constructor() {
        this.pedidos = [];
        this.nextId = 0;
    }

	buscarTodos() {
		return this.pedidos;
	}
	
	  buscarPorId(id) {
        return this.pedidos.find(pedido => pedido.id === id);
    }
	crear(nuevoPedido) {
        nuevoPedido.id = this.nextId++;
        this.pedidos.push(nuevoPedido)
        return nuevoPedido
    }


}
