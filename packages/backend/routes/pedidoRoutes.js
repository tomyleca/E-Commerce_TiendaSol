import {PedidosController} from "../controllers/pedidosController.js"
import express from "express"

const pathPedido = "/pedido"

export default function pedidoRoutes(getController) {
	const router = express.Router()


	router.get(pathPedido, (req,res) => {
	getController(PedidosController).buscarTodos(req,res)
})

	

	return router
}