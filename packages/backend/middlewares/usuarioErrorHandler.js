import { FormatoDeEmailInvalido } from "../errors/formatoDeEmailInvalido.js";

export function usuarioErrorHandler(err, req, res, next) {
  if (err instanceof FormatoDeEmailInvalido) {
    res.status(400).json({ error: err.message });
    return;
  }

  next(err);
}
