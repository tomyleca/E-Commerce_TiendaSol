import dotenv from "dotenv";
import express from "express";
import { MongoDBClient } from "./config/database.js";

import { Server } from "./server.js";
import routes from "./routes/routes.js";

import { HealthCheckController } from "./controllers/healthCheckController.js";

import { PedidosService } from "./services/pedidosService.js";
import { PedidosController } from "./controllers/pedidosController.js";
import { PedidosRepository } from "./models/repositories/pedidosRepository.js";

import { UsuariosService } from "./services/usuariosService.js";
import { UsuariosController } from "./controllers/usuariosController.js";
import { UsuariosRepository } from "./models/repositories/usuariosRepository.js";

import { FactoryNotificacion } from "./models/entities/factoryNotificacion.js";

import { NotificacionesRepository } from "./models/repositories/notificacionesRepository.js";
import { NotificacionesService } from "./services/notificacionesService.js";

import { ProductosService } from "./services/productosService.js";
import { ProductosController } from "./controllers/productosController.js";
import { ProductosRepository } from "./models/repositories/productosRepository.js";

import { CategoriaController } from "./controllers/categoriasController.js";
import { CategoriaService } from "./services/categoriasService.js";
import { CategoriasRepository } from "./models/repositories/categoriasRepository.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//TODO PASARLO A SERVER CUANDO YA NO NECESITE POSTMAN
app.use(cors());

const port = process.env.PORT || 3001;

const server = new Server(app, port);

const healthCheckController = new HealthCheckController();
server.setController(HealthCheckController, healthCheckController);

const usuariosRepository = new UsuariosRepository();
const pedidosRepository = new PedidosRepository();
const productosRepository = new ProductosRepository();
const categoriasRepository = new CategoriasRepository();

const factoryNotificacion = new FactoryNotificacion();
const notificacionesRepository = new NotificacionesRepository();
const notificacionesService = new NotificacionesService(
  notificacionesRepository,
);
const categoriaService = new CategoriaService(categoriasRepository);

const usuariosService = new UsuariosService(
  usuariosRepository,
  notificacionesService,
);
const productosService = new ProductosService(
  productosRepository,
  usuariosService,
  categoriaService,
);
const pedidosService = new PedidosService(
  pedidosRepository,
  factoryNotificacion,
  notificacionesService,
  productosService,
  usuariosService,
);

//Es necesario setearlo despues porque el pedidosService depende del usuarioService y viceversa
usuariosService.setPedidosService(pedidosService);

const productosController = new ProductosController(productosService);
server.setController(ProductosController, productosController);

const pedidosController = new PedidosController(pedidosService);
server.setController(PedidosController, pedidosController);

const usuariosController = new UsuariosController(usuariosService);
server.setController(UsuariosController, usuariosController);

const categoriaController = new CategoriaController(categoriaService);
server.setController(CategoriaController, categoriaController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();

server.launch();

//Conexión a la base de mongo
MongoDBClient.connect();
