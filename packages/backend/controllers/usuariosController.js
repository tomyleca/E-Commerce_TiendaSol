import { z } from "zod";
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js";
import { chequearID } from "./utilsControllers.js";
import { direccionSchema } from "./utilsControllers.js";

export class UsuariosController {
  constructor(usuariosService) {
    this.usuariosService = usuariosService;
  }

  async buscarTodos(req, res) {
    const usuarios = await this.usuariosService.buscarTodos();
    res.json(usuarios);
  }

  async buscarPorId(req, res) {
    const id = req.params.id;
    const idUsuario = chequearID(id);
    const usuario = await this.usuariosService.buscarPorId(idUsuario);
    res.status(200).json(usuario);
  }

  async crear(req, res) {
    const body = req.body;
    const data = usuarioSchema.parse(body);
    const usuarioCreado = await this.usuariosService.crear(data);
    res.status(201).json(usuarioCreado);
  }

  async editar(req, res) {
    const id = req.params.id;
    const idUsuario = chequearID(id);
    const body = req.body;
    const data = editarUsuarioSchema.parse(body);
    const usuarioActualizado = await this.usuariosService.editar(
      idUsuario,
      data,
    );
    res.status(200).json(usuarioActualizado);
  }

  async buscarHistorialDePedidos(req, res) {
    const id = req.params.id;

    const idUsuario = chequearID(id);

    const historialPedidos =
      await this.usuariosService.buscarHistorialDePedidos(idUsuario);

    res.status(200).json(historialPedidos);
  }

  async buscarVentas(req, res) {
    const id = req.params.id;
    const idVendedor = chequearID(id);

    const historialDeVentas =
      await this.usuariosService.buscarHistorialDeVentas(idVendedor);

    res.status(200).json(historialDeVentas);
  }

  async getNotificaciones(req, res) {
    const id = req.params.id;
    const idUsuario = chequearID(id);

    const queryParams = queryNotificacionSchema.parse(req.query);
    const notificaciones = await this.usuariosService.getNotificaciones(
      idUsuario,
      queryParams.leidas,
    );

    res.status(200).json(notificaciones);
  }

  async leerNotificacion(req, res) {
    const id = req.params.id;
    const idUsuario = chequearID(id);

    let idNotificacion = req.params.notificacionId;
    idNotificacion = chequearID(idNotificacion);
    const notificacion = await this.usuariosService.leerNotificacion(
      idUsuario,
      idNotificacion,
    );
    res.status(200).json(notificacion);
  }

  async login(req, res) {
    const body = req.body;
    const data = loginSchema.parse(body);

    const usuario = await this.usuariosService.login(data);

    res.status(200).json(usuario);
  }
}

const usuarioSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().min(1, "El email es obligatorio"),
  telefono: z.number().min(1, "El teléfono es incorrecto").optional(),
  tipo: z.string().min(1, "El tipo de usuario es obligatorio").optional(),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});

//PARA VALIDAD QUE SEA UN BOOLEAN Y QUE SE COMPORTE COMO TAL
const queryNotificacionSchema = z.object({
  leidas: z.enum(["true", "false"]).transform((val) => val === "true"),
});

const loginSchema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio").optional(),
    email: z.string().min(1, "El email es obligatorio").optional(),
    password: z
      .string()
      .min(4, "La contraseña debe tener al menos 4 caracteres"),
  })
  .refine((data) => data.nombre || data.email, {
    message: "Debes enviar nombre o email",
    path: ["nombre"], // o ["email"]; es solo para ubicar el error
  });

const editarUsuarioSchema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio").optional(),
    email: z.string().email("Email inválido").optional(),
    telefono: z.number().min(1, "El teléfono es incorrecto").optional(),
    tipo: z.string().min(1, "El tipo de usuario es obligatorio").optional(),
    password: z
      .string()
      .min(4, "La contraseña debe tener al menos 4 caracteres")
      .optional(),
    direccion: direccionSchema.optional(),
    descripcion: z.string().min(1, "La descripción es obligatoria").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });
