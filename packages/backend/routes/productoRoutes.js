import { ProductosController } from "../controllers/productosController.js";
import express from "express";
import { generalErrorHandler } from "../middlewares/generalErrorHandler.js";

const pathProducto = "/producto";

export default function productoRoutes(getController) {
  const router = express.Router();

  //Get Productos
  router.get(pathProducto, (req, res, next) => {
    try {
      getController(ProductosController).buscarTodos(req, res);
    } catch (error) {
      next(error);
    }
  });

  //Crear pedido
  router.post(pathProducto, async (req, res, next) => {
    try {
      await getController(ProductosController).crear(req, res);
    } catch (error) {
      next(error);
    }
  });

  router.get("/vendedores/:id/productos", async (req, res, next) => {
    try {
      await getController(ProductosController).buscarProductosDeVendedor(
        req,
        res,
      );
    } catch (error) {
      next(error);
    }
  });

  router.use(generalErrorHandler);
  return router;
}
