import { ZodError } from "zod";
import { ValorNoCumpleConEnum } from "../errors/valorNoCumpleConEnum.js";
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js";
import { NotFound } from "../errors/notFound.js";

export function generalErrorHandler(err, req, res, next) {
	
	
	if (err instanceof ZodError) {
    	return res.status(400).json({
     	 	error: 'VALIDATION_ERROR',
      		issues: err.issues,
    		});
 	 }

  if (err instanceof ValorNoCumpleConEnum) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof FormatoInvalidoDeId) {
    res.status(400).json({ error: err.message });
    return;
  }

  // CastError -> tratar como NotFound
  if (err?.name === "CastError" && err?.kind === "ObjectId") {
    const entidad = "Recurso";
    const nf = new NotFound(entidad, err?.value);
    return res.status(404).json({ error: nf.message });
  }

  if (err instanceof NotFound) {
    res.status(404).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Error interno del servidor." });
  return;
}
