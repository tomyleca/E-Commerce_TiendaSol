import {UsuariosController} from "../controllers/usuariosController.js"
import express from "express"

const pathUsuario = "/usuario"

export default function pedidoRoutes(getController) {
	const router = express.Router()


	router.get(pathUsuario, (req,res) => {
	getController(UsuariosController).buscarTodos(req,res)
	})
	
	router.post(pathUsuario, (req,res) => {
		getController(UsuariosController).crear(req,res)
	})

	return router
}