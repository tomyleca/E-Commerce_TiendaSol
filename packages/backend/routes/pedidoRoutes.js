import {PedidosController} from "../controllers/pedidosController.js"
import express from "express"
import { generalErrorHandler } from "../middlewares/generalErrorHandler.js"
import { pedidoErrorHandler } from "../middlewares/pedidoErrorHandler.js"

const pathPedido = "/pedido"

export default function pedidoRoutes(getController) {
	const router = express.Router()


	router.get(pathPedido, (req,res) => {
	getController(PedidosController).buscarTodos(req,res)
	})

	router.post(pathPedido,async (req,res,next) => {
		try {
			await getController(PedidosController).crear(req,res)
		} 
		catch (error) {
			next(error)
	}})

	router.use(pedidoErrorHandler)
	router.use(generalErrorHandler)
	

	return router
}