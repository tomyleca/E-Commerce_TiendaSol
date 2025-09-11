export class Email {
  constructor(direccion) {
	const regexMailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!direccion || typeof direccion !== "string" || regexMailValido.test(direccion) === false) {
      throw new Error("Mail inválido");
    }
    this.direccion = direccion;
  }
}