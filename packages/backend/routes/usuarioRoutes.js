import {UsuariosController} from "../controllers/usuariosController.js"
import express from "express"
import { usuarioErrorHandler } from "../middlewares/usuarioErrorHandler.js"
import { generalErrorHandler } from "../middlewares/generalErrorHandler.js"

const pathUsuario = "/usuario"

export default function pedidoRoutes(getController) {
	const router = express.Router()


	router.get(pathUsuario, (req,res) => {
	getController(UsuariosController).buscarTodos(req,res)
	})
	
	router.post(pathUsuario, async (req,res,next) => {
		try {
			await getController(UsuariosController).crear(req,res)
		} 
		catch (error) {
			next(error)
	}})

	router.get(pathUsuario + ':id/pedidos', (req,res) => {
	getController(UsuariosController).buscarHistorialDePedidos(req,res)
	})

	router.use(usuarioErrorHandler)
	router.use(generalErrorHandler)

	return router
}