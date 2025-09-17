import dotenv from "dotenv";
import express from "express";


import { Server } from "./server.js"
import routes from "./routes/routes.js"

import { HealthCheckController } from "./controllers/healthCheckController.js";

import { PedidosService } from "./services/pedidosService.js"
import { PedidosController } from "./controllers/pedidosController.js"
import { PedidosRepository } from "./models/repositories/pedidosRepository.js"

import { UsuariosService } from "./services/usuariosService.js"
import { UsuariosController } from "./controllers/usuariosController.js"
import { UsuariosRepository } from "./models/repositories/usuariosRepository.js"

import { FactoryNotificacion } from "./models/entities/factoryNotificacion.js";

import {NotificacionesRepository} from "./models/repositories/notificacionesRepository.js"
import {NotificacionesService} from "./services/notificacionService.js"

import { ProductosService } from "./services/productosService.js"
import { ProductosController } from "./controllers/productosController.js"
import { ProductosRepository } from "./models/repositories/productosRepository.js"





const app = express();
app.use(express.json());



const port = process.env.PORT || 3000
dotenv.config();

const server = new Server(app, port)

const healthCheckController=new HealthCheckController()
server.setController(HealthCheckController, healthCheckController)
const productosRepository = new ProductosRepository()
const productosService = new ProductosService(productosRepository)
const productosController = new ProductosController(productosService)

const factoryNotificacion = new FactoryNotificacion()

const notificacionesRepository = new NotificacionesRepository()
const notificacionesService = new NotificacionesService(notificacionesRepository)

const pedidosRepository = new PedidosRepository()
const pedidosService = new PedidosService(pedidosRepository,factoryNotificacion,notificacionesService)
const pedidosController = new PedidosController(pedidosService)

server.setController(PedidosController, pedidosController)

const usuariosRepository = new UsuariosRepository()
const usuariosService = new UsuariosService(usuariosRepository,pedidosService)
const usuariosController = new UsuariosController(usuariosService)

server.setController(UsuariosController, usuariosController)

routes.forEach(route => server.addRoute(route))
server.configureRoutes();

server.launch()
