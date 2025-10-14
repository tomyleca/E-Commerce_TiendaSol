import { HealthCheckController } from "../controllers/healthCheckController.js"
import express from "express"

const path = "/health-check"

export default function healthCheckRoutes(getController) {
    const router = express.Router()

    router.get(path, (req, res) => {
        getController(HealthCheckController).obtenerEstado(req, res)
    })

    return router
}