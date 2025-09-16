import { z } from "zod"
import dayjs from "dayjs";
import { Email } from "./email.js";
import { TipoUsuario } from "./tipoUsuario.js";
import { ValorNoCumpleConEnum } from "../../errors/valorNoCumpleConEnum.js";

export class Usuario {
	constructor(id, nombre, email, telefono, tipo) {
		z.object({
			id: z.string(),
			nombre: z.string(),
			email: z.string(),
			telefono: z.string(),
			tipo: z.instanceof(TipoUsuario),
			fechaAlta: z.string().date()
		})

		if (email instanceof Email === false) //valido que sea de la clase mail
			throw new Error("email no es instancia de la clase Email")

		if (!Object.values(TipoUsuario).includes(tipo)) //valido que sea un valor posible del enum
			throw new ValorNoCumpleConEnum("TipoUsuario", tipo)

		this.id = id
		this.nombre = nombre
		this.email = email
		this.telefono = telefono
		this.tipo = tipo
		this.fechaAlta = dayjs().toDate() // le pongo la fecha de hoy

	}
}