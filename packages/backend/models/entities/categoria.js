import { z } from "zod"
export class Categoria {
    constructor(nombre) {
        z.object({
            nombre: z.string()
        })

        this.nombre = nombre;
    }
}