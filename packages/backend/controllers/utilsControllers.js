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

export const direccionSchema = z.object({
  calle: z.string().min(1, "La calle es obligatoria"),
  altura: z.number().min(1, "La altura es obligatoria"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  codigoPostal: z.string().min(1, "El código postal es obligatorio"),
  pais: z.string().min(1, "El país es obligatorio"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  provincia: z.string().min(1, "La provincia es obligatoria"),
  piso: z.string().optional(),
  departamento: z.string().optional()
});
