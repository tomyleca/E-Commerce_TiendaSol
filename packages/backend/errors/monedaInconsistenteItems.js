export class MonedaInconsistenteItems extends Error {
	constructor() {
		super()
		this.message = "Todos los itemes de un pedido deben tener asociada la misma moneda"
	}
}