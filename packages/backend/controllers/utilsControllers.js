import { z } from "zod";
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js";

export function chequearID(id) {
  const idChequeado = idTransform.safeParse(id);

  if (idChequeado.error) {
    throw new FormatoInvalidoDeId(idChequeado.error);
  }
  return idChequeado.data;
}

//Ojo que por esto hay que llamarlo con .data despues
const idTransform = z.string().refine(
  (val) => {
    return isNaN(Number(val)); // true si NO es un número
  },
  {
    message: "id must NOT be a number",
  },
);
