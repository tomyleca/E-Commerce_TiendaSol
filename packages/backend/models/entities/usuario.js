import { z } from "zod"
import dayjs from "dayjs";
import { Email } from "./email.js";
import { TipoUsuario } from "./tipoUsuario.js";

export class Usuario{

	constructor(nombre, email, telefono, tipo )
	{
		if(email instanceof Email === false) //valido que sea de la clase mail
			throw new Error("Mail inválido")
		
		if(!Object.values(TipoUsuario).includes(tipo)) //valido que sea un enum
			throw new Error("Tipo usuario inválido")

		this.nombre = nombre
		this.email = email
		this.telefono = telefono
		
		
		
		this.tipo = tipo
		this.fechaAlta = dayjs().toDate() // le pongo la fecha de hoy

	}
}