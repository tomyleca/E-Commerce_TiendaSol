import { ClaseIncorrectaError } from "../errors/claseIncorrectaError.js";
import { FormatoZodError } from "../errors/formatoZodError.js";
import { ValorNoCumpleConEnum } from "../errors/valorNoCumpleConEnum.js";
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js";
import { NotFound } from "../errors/notFound.js";

export function generalErrorHandler(err, req, res, next) {
		
	if (err instanceof FormatoZodError) {
		res.status(400).json({ error: err.message });
		return
	}

	if (err instanceof ValorNoCumpleConEnum) {
		res.status(400).json({ error: err.message });
		return
	}

	if (err instanceof FormatoInvalidoDeId){
		res.status(400).json({error: err.message});
		return
	}

	if (err instanceof NotFound){
		res.status(404).json({error: err.message});
		return
	}


	

	res.status(500).json({ error: "Error interno del servidor." });
	return
}