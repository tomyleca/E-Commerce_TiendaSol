export class ClaseIncorrectaError extends Error {
	constructor(valor,claseCorrecta) {
		super()
		this.message = "El valor" + valor + "no pertenece a la clase esperada: " + claseCorrecta
	}
}