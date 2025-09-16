import { NoHayStock } from "../errors/noHayStock.js";

export function pedidoErrorHandler(err, req, res, next) {
	if(err instanceof NoHayStock){
		res.status(400).json({ error: err.message });
		return
	}

	next(err)

}