import { Notificacion } from '../models/entities/notificacion';
import {NotificacionesRepository} from '../models/repositories/notificacionesRepository'
import { Usuario } from '../models/entities/usuario';
import { Email } from '../models/entities/email';
import { TipoUsuario } from '../models/entities/tipoUsuario';
import { jest } from "@jest/globals";


describe("Notificaciones", () => {
  let usuario1;
  let repo;
  let _notis;

  beforeEach(() => {
    
    const email = new Email("mail@gmail.com")
    usuario1 = new Usuario(
            "Juan Perez",
            email,
            "1112341234",
            TipoUsuario.VENDEDOR)

    _notis = [];
    repo = new NotificacionesRepository();

    // Mockeamos el método 'crear' del repositorio
    repo.crear = jest.fn(n => {
      n.id = _notis.length;   // asigna un id incremental
      _notis.push(n);         // lo agrega al array simulado
      return n;               // devuelve el objeto agregado
    });
  });

  test("Notificación se guarda en repositorio", () => {
    const noti = new Notificacion(usuario1, "test");

    // Guardamos la notificación
    const resultado = repo.crear(noti);

    // Verificaciones
    expect(resultado).toBe(_notis[noti.id]);
    expect(_notis).toContain(noti);         
    expect(noti.id).toBeDefined();          
  });
});
