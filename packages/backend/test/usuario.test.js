import { Usuario } from "../models/entities/usuario.js";
import { FormatoDeEmailInvalido } from "../errors/formatoDeEmailInvalido.js";
import { TipoUsuario } from "../models/entities/tipoUsuario.js";
import { ClaseIncorrectaError } from "../errors/claseIncorrectaError.js";
import { Email } from "../models/entities/email.js";
import { ValorNoCumpleConEnum } from "../errors/valorNoCumpleConEnum.js";

describe("Validar usuario", () => {
  test("No me deja crear usuario con email que no es de la clase Email", () => {
    expect(
      () =>
        new Usuario(
          "Juan Perez",
          "emailFalso", // email inválido
          "1112341234",
        ),
    ).toThrow(ClaseIncorrectaError);
  });

  test("No me deja crear un email invalido", () => {
    expect(() => new Email("mailTrucho.com").toThrow(FormatoDeEmailInvalido));
  });

  test("Creo un usuario valido", () => {
    const email = new Email("mail@gmail.com");
    const usuario = new Usuario(
      "Juan Perez",
      email,
      "1112341234"
    );

    expect(usuario).toBeInstanceOf(Usuario);
  });
});
