export class FormatoInvalidoDeId extends Error {
	constructor(id) {
		super()
		this.message = "La siguiente id no cumple con el formato correcto: " + id
	}
}