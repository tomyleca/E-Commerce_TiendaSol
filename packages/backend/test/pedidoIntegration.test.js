import { jest } from "@jest/globals";
import request from "supertest";
import { buildTestServer } from "./buildTestServer";
import { ProductosService } from "../services/productosService.js";
import { NotificacionesService } from "../services/notificacionesService.js";
import { CategoriaService } from "../services/categoriasService.js";
import { UsuariosService } from "../services/usuariosService.js";
import { FactoryNotificacion } from "../models/entities/factoryNotificacion.js";
import { PedidosController } from "../controllers/pedidosController.js";
import pedidoRoutes from "../routes/pedidoRoutes.js";
import { Usuario } from "../models/entities/usuario.js";
import { Email } from "../models/entities/email.js";
import { TipoUsuario } from "../models/entities/tipoUsuario.js";
import { Pedido } from "../models/entities/pedido.js";
import { ItemPedido } from "../models/entities/itemPedido.js";
import { Producto } from "../models/entities/producto.js";
import { Categoria } from "../models/entities/categoria.js";
import { Moneda } from "../models/entities/moneda.js";
import { DireccionEntrega } from "../models/entities/direccionEntrega.js";
import { Notificacion } from "../models/entities/notificacion.js";
import { PedidosService } from "../services/pedidosService.js";

const mockRepoProductos = {
  buscarPorId: jest.fn(),
  buscarTodos: jest.fn(),
  actualizar: jest.fn(),
};
const mockRepoPedidos = {
  crear: jest.fn(),
};
const mockRepoFactory = {
  crear: jest.fn(),
};

const mockRepoUsuarios = {
  buscarPorId: jest.fn(),
};
const mockCategorias = {};

const factoryNoti = new FactoryNotificacion();
const notificacionesService = new NotificacionesService(mockRepoFactory);
const categoriasService = new CategoriaService(mockCategorias);
const usuariosService = new UsuariosService(
  mockRepoUsuarios,
  notificacionesService,
);

const productoServive = new ProductosService(
  mockRepoProductos,
  usuariosService,
  categoriasService,
);

const pedidosService = new PedidosService(
  mockRepoPedidos,
  factoryNoti,
  notificacionesService,
  productoServive,
  usuariosService,
);
const pedidosController = new PedidosController(pedidosService);
usuariosService.setPedidosService(pedidosService);

const server = buildTestServer();
server.addRoute(pedidoRoutes);
server.setController(PedidosController, pedidosController);
server.configureRoutes();

describe("POST/Pedido", () => {
  const email2 = new Email("holaJuani@gmail.com");
  const cat1 = new Categoria("Dulces");
  let vendedor = new Usuario(
    "Juanita",
    email2,
    "1133454342",
    TipoUsuario.VENDEDOR,
  );
  let producto = new Producto(
    vendedor,
    "Caramelito",
    "Un caramelito",
    cat1,
    2000,
    Moneda.PESO_ARG,
    4,
    [],
  );
  const email = new Email("hola@gmail.com");
  let comprador = new Usuario(
    "Juan",
    email,
    "1123456756",
    TipoUsuario.COMPRADOR,
  );

  const item1 = new ItemPedido(producto, 2, 2000);
  const direccion = new DireccionEntrega(
    "Av. Libertador",
    "1234",
    "5",
    "B",
    "1428",
    "Buenos Aires",
    "Buenos Aires",
    "Argentina",
    "-34.6037",
    "-58.3816",
  );
  let pedido = new Pedido(comprador, [item1], direccion);
  const notificacion = new Notificacion(vendedor, "se vendio algo");

  test("1 ESCENARIO CORRECTO ", async () => {
    producto.id = 1;
    comprador.id = 2;
    mockRepoPedidos.crear = jest.fn().mockResolvedValue(pedido);
    mockRepoUsuarios.buscarPorId = jest.fn().mockResolvedValue(comprador);
    mockRepoProductos.buscarPorId = jest.fn().mockResolvedValue(producto);
    mockRepoProductos.actualizar = jest.fn().mockResolvedValue(producto);
    mockRepoFactory.crear = jest.fn().mockResolvedValue(notificacion);

    producto.id = 1;
    comprador.id = 2;

    const res = await request(server.app)
      .post("/pedido")
      .send({
        compradorId: "2",
        items: [{ productoId: "1", cantidad: 3, precioUnitario: 2000 }],
        direccionEntrega: "Av. Libertador 1234",
      })
      .set("Content-Type", "application/json");

    // No usar debugger en tests automatizados

    expect(res.status).toBe(201);
    console.log(res.status);
    expect(mockRepoPedidos.crear).toHaveBeenCalled();
    expect(mockRepoFactory.crear).toHaveBeenCalled();
    expect(mockRepoProductos.actualizar).toHaveBeenCalled();
    expect(res.body).toMatchObject({
      comprador: expect.any(Object),
      itemsPedido: expect.any(Array),
    });
  });
});
