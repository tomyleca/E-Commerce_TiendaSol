import {PedidoController} from "../controllers/pedidoController.js"
import express from "express"

const pathPedido = "/pedido"

export default function pedidoRoutes(getController) {
	const router = express.Router()


	router.get(pathPedido, (req,res) => {
	getController(PedidoController).buscarTodos(req,res)
})

	return router
}