import { jest } from "@jest/globals";
import request from "supertest";
import { buildTestServer } from "./buildTestServer";

import { ProductosService } from "../services/productosService";
import { PedidosService } from "../services/pedidosService";
import { NotificacionesService } from "../services/notificacionesService";
import { CategoriaService } from "../services/categoriasService";
import { UsuariosService } from "../services/usuariosService";
import { FactoryNotificacion } from "../models/entities/factoryNotificacion";

import { PedidosController } from "../controllers/pedidosController";
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


const mockRepoProductos = {
  buscarPorId: jest.fn(),
  buscarTodos: jest.fn(),
  actualizar: jest.fn(),
};
const mockRepoPedidos = {
  crear: jest.fn(),
  buscarTodos: jest.fn(),
  buscarPorId: jest.fn(),
  actualizarEstado: jest.fn(),
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
const usuariosService = new UsuariosService(mockRepoUsuarios, notificacionesService);
const productosService = new ProductosService(mockRepoProductos, usuariosService, categoriasService);
const pedidosService = new PedidosService(
  mockRepoPedidos,
  factoryNoti,
  notificacionesService,
  productosService,
  usuariosService
);
const pedidosController = new PedidosController(pedidosService);
usuariosService.setPedidosService(pedidosService);


const server = buildTestServer();
server.addRoute(pedidoRoutes);
server.setController(PedidosController, pedidosController);
server.configureRoutes();

const emailVendedor = new Email("vendedor@test.com");
const emailComprador = new Email("comprador@test.com");
const cat1 = new Categoria("Dulces");

const vendedor = new Usuario("Vendedor", emailVendedor, "111111", TipoUsuario.VENDEDOR);
const comprador = new Usuario("Comprador", emailComprador, "222222", TipoUsuario.COMPRADOR);

const producto = new Producto(vendedor, "Caramelito", "Un dulce", cat1, 2000, Moneda.PESO_ARG, 4, []);
const producto1 = new Producto(vendedor, "Alfajor", "Un dulce", cat1, 1500, Moneda.PESO_ARG, 4, []);
const item1 = new ItemPedido(producto, 2, 2000);
const item2 = new ItemPedido(producto1,1,1500)
const direccion = new DireccionEntrega("Av. Libertador", "1234", "5", "B", "1428", "Buenos Aires", "Buenos Aires", "Argentina", "-34.6037", "-58.3816");
const pedido = new Pedido(comprador, [item1], direccion);
const notificacion = new Notificacion(vendedor, "Se vendió algo");

describe("PedidosController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    producto.id = "1";
    comprador.id = "2";
    producto1.id = "3"; 
  });

  
  test("POST /pedido - escenario correcto", async () => {
    mockRepoPedidos.crear.mockResolvedValue(pedido);
    mockRepoUsuarios.buscarPorId.mockResolvedValue(comprador);
    mockRepoProductos.buscarPorId.mockResolvedValue(producto);
    mockRepoProductos.actualizar.mockResolvedValue(producto);
    mockRepoFactory.crear.mockResolvedValue(notificacion);
    productosService.agregarVentasDeProducto = jest.fn().mockResolvedValue();

    const res = await request(server.app)
      .post("/pedido")
      .send({
        compradorId: "2",
        items: [{ productoId: "1", cantidad: 3, precioUnitario: 2000 }],
        direccionEntrega: "Av. Libertador 1234",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(mockRepoPedidos.crear).toHaveBeenCalled();
    expect(mockRepoFactory.crear).toHaveBeenCalled();
    expect(res.body).toMatchObject({
      comprador: expect.any(Usuario),
      items: expect.any(Array),
    });
  });

  // Error: comprador no encontrado
  test("POST /pedido - comprador no encontrado", async () => {
    mockRepoUsuarios.buscarPorId.mockResolvedValue(null);

    const res = await request(server.app)
      .post("/pedido")
      .send({
        compradorId: "999",
        items: [{ productoId: "1", cantidad: 2, precioUnitario: 1000 }],
        direccionEntrega: "Calle Falsa 123",
      });

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(mockRepoPedidos.crear).not.toHaveBeenCalled();
  });

  //Error: sin items
  test("POST /pedido - sin items debe fallar", async () => {
    mockRepoUsuarios.buscarPorId.mockResolvedValue(comprador);

    const res = await request(server.app)
      .post("/pedido")
      .send({
        compradorId: "2",
        items: [],
        direccionEntrega: "Calle Falsa 123",
      });

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(mockRepoPedidos.crear).not.toHaveBeenCalled();
  });

  // GET /pedido - buscar todos
  test("GET /pedido - devuelve lista de pedidos", async () => {
    const pedido1 = new Pedido(comprador, [item1], direccion);
    const pedido2 = new Pedido(comprador, [item2], direccion);
    mockRepoPedidos.buscarTodos.mockResolvedValue([pedido1, pedido2]);

    const res = await request(server.app).get("/pedido");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(mockRepoPedidos.buscarTodos).toHaveBeenCalled();
  });

  //GET /pedido vacío
  test("GET /pedido - sin pedidos devuelve array vacío", async () => {
    mockRepoPedidos.buscarTodos.mockResolvedValue([]);

    const res = await request(server.app).get("/pedido");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
