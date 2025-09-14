import { z } from "zod"

export class HealthCheckController {
	constructor() {}

	obtenerEstado(req, res) {

	    res.status(200).json({estado:"ok"});
    }


}