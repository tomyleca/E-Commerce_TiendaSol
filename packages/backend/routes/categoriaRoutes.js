import { CategoriaController } from "../controllers/categoriasController.js";
import express from "express"

const path = "/categorias"

export default function categoriaRoutes(getController) {
    const router = express.Router()


    router.get(path, (req,res) => {
    getController(CategoriaController).obtenerCategorias(req,res)
    })

    router.post(path, (req,res) => {
    getController(CategoriaController).crear(req,res)
    })

    

    return router
}