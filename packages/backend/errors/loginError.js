export class LoginError extends Error {
  constructor() {
    super();
    this.message = "El nombre de usuario, email o contraseña son incorrectos";
  }
}
