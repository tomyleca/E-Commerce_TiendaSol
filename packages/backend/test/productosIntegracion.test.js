import { jest } from "@jest/globals";
import request from "supertest";
import { buildTestServer } from "./buildTestServer";

import { ProductosService } from "../services/productosService.js";
import { ProductosController } from "../controllers/productosController.js";
import productoRoutes from "../routes/productoRoutes.js";

import { UsuariosService } from "../services/usuariosService.js";
import { CategoriaService } from "../services/categoriasService.js";
import { Producto } from "../models/entities/producto.js";
import { Usuario } from "../models/entities/usuario.js";
import { Email } from "../models/entities/email.js";
import { Categoria } from "../models/entities/categoria.js";
import { Moneda } from "../models/entities/moneda.js";
import { TipoUsuario } from "../models/entities/tipoUsuario.js";
import { NotificacionesService } from "../services/notificacionesService.js";

const mockRepoProductos = {
  buscarTodos: jest.fn(),
  buscarPorId: jest.fn(),
  crear: jest.fn(),
  actualizar: jest.fn(),
  count: jest.fn(),
};

const mockRepoUsuarios = {
  buscarPorId: jest.fn(),
};

const mockRepoCategorias = {
  buscarPorId: jest.fn(),
};

const mockRepoFactory = { crear: jest.fn() };

const notificacionesService = new NotificacionesService(mockRepoFactory);
const usuariosService = new UsuariosService(mockRepoUsuarios, notificacionesService);
const categoriasService = new CategoriaService(mockRepoCategorias);
const productosService = new ProductosService(mockRepoProductos, usuariosService, categoriasService);

const productosController = new ProductosController(productosService);

const server = buildTestServer();
server.addRoute(productoRoutes);
server.setController(ProductosController, productosController);
server.configureRoutes();

const vendedor = new Usuario("Vendedor", new Email("vendedor@test.com"), "111111", TipoUsuario.VENDEDOR);
vendedor.id = "1";
const categoria = new Categoria("Dulces");
categoria.id = "cat1";

const producto = new Producto(
  vendedor,
  "Caramelito",
  "Un dulce",
  [categoria],
  2000,
  Moneda.PESO_ARG,
  10,
  [],
  true
);
producto.id = "p1";

describe("ProductosController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /producto - crea producto correctamente", async () => {
    mockRepoUsuarios.buscarPorId.mockResolvedValue(vendedor);
    mockRepoCategorias.buscarPorId.mockResolvedValue(categoria);
    mockRepoProductos.crear.mockResolvedValue(producto);

    const res = await request(server.app)
      .post("/producto")
      .send({
        vendedorId: "1",
        titulo: "Caramelito",
        descripcion: "Un dulce",
        categoriasId: ["cat1"],
        precio: 2000,
        moneda: Moneda.PESO_ARG,
        stock: 10,
        fotos: [],
        activo: true,
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(mockRepoProductos.crear).toHaveBeenCalled();
    expect(res.body).toMatchObject({
      titulo: "Caramelito",
      precio: 2000,
      stock: 10,
    });
  });

  test("POST /producto - error vendedor no encontrado", async () => {
    mockRepoUsuarios.buscarPorId.mockResolvedValue(null);

    const res = await request(server.app)
      .post("/producto")
      .send({
        vendedorId: "999",
        titulo: "Caramelito",
        descripcion: "Un dulce",
        categoriasId: ["cat1"],
        precio: 2000,
        moneda: Moneda.PESO_ARG,
        stock: 10,
        fotos: [],
      });

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(mockRepoProductos.crear).not.toHaveBeenCalled();
  });

  test("POST /producto - error categoría no encontrada", async () => {
    mockRepoUsuarios.buscarPorId.mockResolvedValue(vendedor);
    mockRepoCategorias.buscarPorId.mockResolvedValue(null);

    const res = await request(server.app)
      .post("/producto")
      .send({
        vendedorId: "1",
        titulo: "Caramelito",
        descripcion: "Un dulce",
        categoriasId: ["noExiste"],
        precio: 2000,
        moneda: Moneda.PESO_ARG,
        stock: 10,
        fotos: [],
      });

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(mockRepoProductos.crear).not.toHaveBeenCalled();
  });

  test("GET /producto - devuelve lista de productos", async () => {
    mockRepoProductos.buscarTodos.mockResolvedValue([producto]);
    mockRepoProductos.count.mockResolvedValue(1);

    const res = await request(server.app)
      .get("/producto?pagina=1&limite=1")
      .set("Content-Type", "application/json");
    
    //Tambien deberiamos evaluar los datos de paginacion
    

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(mockRepoProductos.buscarTodos).toHaveBeenCalled();
  });

  test("GET /producto - sin productos devuelve array vacío", async () => {
    mockRepoProductos.buscarTodos.mockResolvedValue([]);
    mockRepoProductos.count.mockResolvedValue(0);

    const res = await request(server.app).get("/producto?page=1&limit=10");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  test("GET /producto/:id - producto encontrado", async () => {
    mockRepoProductos.buscarPorId.mockResolvedValue(producto);

    const res = await request(server.app).get("/producto/p1");

    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe("Caramelito");
    expect(mockRepoProductos.buscarPorId).toHaveBeenCalledWith("p1");
  });

  test("GET /producto/:id - producto no encontrado", async () => {
    mockRepoProductos.buscarPorId.mockResolvedValue(null);

    const res = await request(server.app).get("/producto/999");

    expect(res.status).toBe(404);
  });
});
