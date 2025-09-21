export class ValorNoCumpleConEnum extends Error {
	constructor(enumName, valor) {
		super()
		this.message = `El valor '${valor}' no cumple con los valores permitidos para '${enumName}'`
	}
}