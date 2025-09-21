export class NotFound extends Error{
		constructor(objeto,id) {
		super()
		this.message = "el " + objeto + "de id " + id + " no fue encontrado"
	}
}
