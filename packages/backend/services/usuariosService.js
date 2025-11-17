import { Usuario } from "../models/entities/usuario.js";
import { Email } from "../models/entities/email.js";
import bcrypt from "bcrypt";
import { NotFound } from "../errors/notFound.js";
import { LoginError } from "../errors/loginError.js";


export class UsuariosService {
  constructor(usuariosRepository, notificacionesService) {
    this.usuariosRepository = usuariosRepository;
    this.pedidosService = null;
    this.notificacionesService = notificacionesService;
  }

  setPedidosService(pedidosService) {
    this.pedidosService = pedidosService;
  }

  async buscarTodos() {
    return await this.usuariosRepository.buscarTodos();
  }

  async buscarPorId(id) {
    return await this.usuariosRepository.buscarPorId(id);
  }

  async crear(nuevoUsuarioJson) {
    const emailUsuario = new Email(nuevoUsuarioJson.email);
	const saltRounds = 10; // cuántas veces "mezcla" la encriptación
    const passwordHash = await bcrypt.hash(nuevoUsuarioJson.password, saltRounds);


    const nuevoUsuario = new Usuario(
      nuevoUsuarioJson.nombre,
      emailUsuario,
      nuevoUsuarioJson.telefono,
	  passwordHash
    );
    return await this.usuariosRepository.crear(nuevoUsuario);
  }

  buscarHistorialDePedidos(id) {
    return this.pedidosService.buscarPedidosDeUsuario(id);
  }

  async getNotificaciones(id, leidas) {
    return await this.notificacionesService.getNotificaciones(id, leidas);
  }

  leerNotificacion(idUsuario, idNotificacion) {
    return this.notificacionesService.leerNotificacion(
      idUsuario,
      idNotificacion,
    );
  }

  async login(data) {
	let usuario = null; 
	data.nombre ?
	  usuario = await this.usuariosRepository.buscarPorNombre(data.nombre) :
	  usuario = await this.usuariosRepository.buscarPorEmail(data.email);

	if (!usuario) {
		throw new LoginError();
	}

	const ok = await bcrypt.compare(data.password, usuario.passwordHash);
    if (!ok) {
      throw new LoginError();
    }

    //Credenciales válidas: continuar
    return usuario;
  }

  async editar(id, datosActualizados) {
	const usuario = await this.usuariosRepository.buscarPorId(id);
	if (!usuario) {
	  throw new NotFound("Usuario no encontrado");
	}


  //Si viene password, la hasheás antes
  if (datosActualizados.password) {
    const saltRounds = 10;
    datosActualizados.passwordHash = await bcrypt.hash(datosActualizados.password, saltRounds);
    delete datosActualizados.password;
  }

  //Mezcla no-destructiva
  Object.assign(usuario, datosActualizados);

  return await this.usuariosRepository.update(id, usuario);
  }


}
