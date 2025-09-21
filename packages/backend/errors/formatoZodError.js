export class FormatoZodError extends Error {
	constructor() {
		super()
		this.message = "Datos faltantes o de formato incorrecto"
	}
}