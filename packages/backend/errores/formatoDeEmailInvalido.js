export class FormatoDeEmailInvalido extends Error {
	constructor(email) {
		super()
		this.message = "La siguiente dirección de email no cumple con el formato correcto: " + email
	}
}