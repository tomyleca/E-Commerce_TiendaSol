export class IntentoDeCancelarEnviadoError extends Error {
  constructor(id) {
    super();
    this.message = id + ": No se puede cancelar un producto ya enviado";
  }
}
