import { FormatoDeEmailInvalido } from "../errors/formatoDeEmailInvalido.js";
import {LoginError} from "../errors/loginError.js";

export function usuarioErrorHandler(err, req, res, next) {
  if (err instanceof FormatoDeEmailInvalido) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof LoginError) {
    res.status(401).json({ error: err.message });
    return;
  }

  next(err);
}
