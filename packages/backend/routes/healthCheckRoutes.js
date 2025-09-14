import {HealthCheckController} from "../controllers/pedidosController.js"
import express from "express"

const pathPedido = "/health-check"

export default function healthCheckRoutes(getController) {
    const router = express.Router()


    router.get(pathPedido, (req,res) => {
    getController(HealthCheckController).obtenerEstado(req,res)
    })

    

    return router
}