import {Usuario} from "../models/entities/usuario.js"
import { FormatoDeEmailInvalido } from "../errors/formatoDeEmailInvalido.js"	
import { TipoUsuario } from "../models/entities/tipoUsuario.js"	
import { ClaseIncorrectaError } from "../errors/claseIncorrectaError.js"
import {Email} from "../models/entities/email.js"
import { ValorNoCumpleConEnum } from "../errors/valorNoCumpleConEnum.js"

describe('Validar usuario',() => {
	test('No me deja crear usuario con email que no es de la clase Email',() => {
		expect(() => new Usuario(
		"Juan Perez",
		"emailFalso",       // email inválido
		"1112341234",
		TipoUsuario.COMPRADOR
		)).toThrow(ClaseIncorrectaError)
	})

	test('No me deja crear un email invalido',() => {
		expect(() => (new Email("mailTrucho.com"))
			.toThrow(FormatoDeEmailInvalido))})

	test('No me deja crear un usuario con tipo de usuario invalido',() => {
		expect(() => new Usuario(
		"Juan Perez",
		new Email("mail@gmail.com"),       // email válido
		"1112341234",
		"TipoUsuarioIncorrecto"
		)).toThrow(ValorNoCumpleConEnum)
	})
	test('Creo un usuario valido', () => {
		const email = new Email("mail@gmail.com")
		const usuario = new Usuario(
			"Juan Perez",
			email,
			"1112341234",
			TipoUsuario.COMPRADOR)

		expect(usuario).toBeInstanceOf(Usuario)
	})



	}
	)
