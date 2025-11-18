import { z } from "zod";
import dayjs from "dayjs";
import { Email } from "./email.js";
import { TipoUsuario } from "./tipoUsuario.js";
import { ValorNoCumpleConEnum } from "../../errors/valorNoCumpleConEnum.js";
import { ClaseIncorrectaError } from "../../errors/claseIncorrectaError.js";

export class Usuario {
  constructor(nombre, email, telefono,passwordHash) {
    z.object({
      nombre: z.string(),
      email: z.string(),
      telefono: z.string(),
      fechaAlta: z.string().date(),
	  passwordHash: z.string()
    });

    if (email instanceof Email === false)
      //valido que sea de la clase mail
      throw new ClaseIncorrectaError("email", Email);



    this.id = null;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.tipo = "USUARIO";
    this.fechaAlta = dayjs().toDate(); // le pongo la fecha de hoy
	this.passwordHash = passwordHash;
}
}
