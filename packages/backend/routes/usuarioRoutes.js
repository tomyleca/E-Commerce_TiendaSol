import { UsuariosController } from "../controllers/usuariosController.js"
import express from "express"
import { usuarioErrorHandler } from "../middlewares/usuarioErrorHandler.js"
import { generalErrorHandler } from "../middlewares/generalErrorHandler.js"

const pathUsuario = "/usuario"

export default function pedidoRoutes(getController) {
	const router = express.Router()

	router.get(pathUsuario, async (req, res, next) => {
		try {
			await getController(UsuariosController).buscarTodos(req, res)
		} catch (error) {
			next(error)
		}
	})
	

	//Obtener el historial de pedidos de un usuario
	router.get(pathUsuario + '/:id/pedidos', async (req,res,next) => {
		try {
			await getController(UsuariosController).buscarHistorialDePedidos(req,res)
		} catch (error) {
			next(error)
		}
	})

	//Obtener las notificaciones de un usuario
	//Query param: ?leidas=true/false
	router.get(pathUsuario + '/:id/notificaciones', async (req,res,next) => {
		try {
			await getController(UsuariosController).getNotificaciones(req,res)
		} catch (error) {
			next(error)
		}
	})

	//Leer una notificacion
	router.get(pathUsuario + '/:id/notificaciones/:notificacionId', async (req,res,next) => {
		try {
			await getController(UsuariosController).leerNotificacion(req,res)
		} catch (error) {
			next(error)
		}
	})

	//Crear un usuario
	router.post(pathUsuario, async (req,res,next) => {
		try {
			await getController(UsuariosController).crear(req,res)
		} 
		catch (error) {
			next(error)
	}})

	router.use(usuarioErrorHandler)
	router.use(generalErrorHandler)

	return router
}