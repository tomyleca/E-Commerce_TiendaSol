export class NoHayStock extends Error{
		constructor() {
		super()
		this.message = "No hay stock suficiente para realizar el pedido"
	}
}
