import { FormatoDeEmailInvalido } from "../../errors/formatoDeEmailInvalido.js";

export class Email {
  constructor(direccion) {
    const regexMailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !direccion ||
      typeof direccion !== "string" ||
      regexMailValido.test(direccion) === false
    ) {
      throw new FormatoDeEmailInvalido(direccion);
    }
    this.direccion = direccion;
  }
}
