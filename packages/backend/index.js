import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { Server } from "./server.js"
import routes from "./routes/routes.js"

import { Pedido } from "./models/entities/pedido.js"
import { PedidoService } from "./services/pedidoService.js"
import { PedidoController } from "./controllers/pedidoController.js"
import { PedidoRepository } from "./models/repositories/pedidoRepository.js"





const app = express();
app.use(express.json());



const port = process.env.PORT || 3000
dotenv.config();

const server = new Server(app, port)

new Pedido();

const pedidoRepository = new PedidoRepository()
const pedidoService = new PedidoService(pedidoRepository)
const pedidoController = new PedidoController(pedidoService)

server.setController(PedidoController, pedidoController)

routes.forEach(route => server.addRoute(route))
server.configureRoutes();

server.launch()
