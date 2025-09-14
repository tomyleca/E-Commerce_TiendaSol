export class PedidosRepository {
	    constructor() {
        this.pedidos = [];
        this.nextId = 0;
    }

	buscarTodos() {
		return this.pedidos;
	}
	
	
	crear(nuevoPedido) {
        nuevoPedido.id = this.nextId++;
        this.pedidos.push(nuevoPedido)
        return nuevoPedido
    }


}
