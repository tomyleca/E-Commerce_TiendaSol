import { z } from "zod"


export function chequearID(id) {
	const idChequeado = idTransform.safeParse(id)

	if(idChequeado.error) {
		return false 
	}
	return idChequeado.data
}

//Ojo que por esto hay que llamarlo con .data despues
const idTransform = z.string().refine((val) => {
	return isNaN(Number(val)); // true si NO es un número
}, {
	message: "id must NOT be a number",
});