import { PedidosController } from "../controllers/pedidosController.js";
import express from "express";
import { generalErrorHandler } from "../middlewares/generalErrorHandler.js";
import { pedidoErrorHandler } from "../middlewares/pedidoErrorHandler.js";

const pathPedido = "/pedido";

export default function pedidoRoutes(getController) {
  const router = express.Router();

  //Get pedidos
  router.get(pathPedido, async (req, res, next) => {
    try {
      await getController(PedidosController).buscarTodos(req, res);
    } catch (error) {
      next(error);
    }
  });

  //Crear pedido
  router.post(pathPedido, async (req, res, next) => {
    try {
      await getController(PedidosController).crear(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Cancelar un pedido
  router.post(pathPedido + "id/cancelar", async (req, res, next) => {
    try {
      await getController(PedidosController).cancelar(req, res);
    } catch (error) {
      next(error);
    }
  });

  // Enviar un pedido
  router.post(pathPedido + "id/enviar", async (req, res, next) => {
    try {
      await getController(PedidosController).enviar(req, res);
    } catch (error) {
      next(error);
    }
  });

  router.use(pedidoErrorHandler);
  router.use(generalErrorHandler);

  return router;
}
