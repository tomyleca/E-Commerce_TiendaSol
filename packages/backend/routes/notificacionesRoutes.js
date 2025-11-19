import { NotificacionesController } from "../controllers/notificacionesController.js";
import express from "express";
import { generalErrorHandler } from "../middlewares/generalErrorHandler.js";

const pathNoti = "/notificaciones";

export default function notificacionesRoutes(getController) {
  const router = express.Router();

  router.post(pathNoti, async (req, res, next) => {
    try {
      await getController(NotificacionesController).crear(req, res);
    } catch (error) {
      next(error);
    }
  });

  router.use(generalErrorHandler);

  return router;
}
