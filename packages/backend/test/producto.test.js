// Aumenta el timeout global de Jest para operaciones de setup lentas (descarga de Mongo binario). Sino no corre el test
import { expect, jest } from '@jest/globals';
jest.setTimeout(30000);

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Usuario } from "../models/entities/usuario.js";
import { Email } from "../models/entities/email.js";
import { TipoUsuario } from "../models/entities/tipoUsuario.js";
import { Moneda } from "../models/entities/moneda.js";
import { ProductosService } from '../services/productosService.js';
import { UsuariosService } from '../services/usuariosService.js';
import { Categoria } from '../models/entities/categoria.js';
import { CategoriaService } from '../services/categoriasService.js';
import { UsuariosRepository } from "../models/repositories/usuariosRepository.js";
import { ProductosRepository } from "../models/repositories/productosRepository.js";
import { CategoriasRepository } from '../models/repositories/categoriasRepository.js';

let mongod;

const usuariosRepository = new UsuariosRepository();
const productosRepository = new ProductosRepository();
const categoriasRepository = new CategoriasRepository();

const usuariosService = new UsuariosService(usuariosRepository);
const categoriasService = new CategoriaService(categoriasRepository);
const productosService = new ProductosService(productosRepository, usuariosService, categoriasService);

let vendedor1Id, vendedor2Id;
let categoria1Id, categoria2Id;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  // Crear usuarios
  const vendedor1 = new Usuario("Juan Perez", new Email("mail@gmail.com"), "1112341234", TipoUsuario.VENDEDOR);
  const vendedor2 = new Usuario("Pedro Lopez", new Email("pedro@gmail.com"), "3332341234", TipoUsuario.VENDEDOR);

  const v1Guardado = await usuariosRepository.crear(vendedor1);
  const v2Guardado = await usuariosRepository.crear(vendedor2);

  vendedor1Id = v1Guardado.id || v1Guardado._id?.toString();
  vendedor2Id = v2Guardado.id || v2Guardado._id?.toString();

  // Crear categorías 
  const cat1 = new Categoria("Electrónica");
  const cat2 = new Categoria("Artículos para el hogar y decoración");

  const c1Guardada = await categoriasRepository.create(cat1);
  const c2Guardada = await categoriasRepository.create(cat2);

  categoria1Id = c1Guardada.id || c1Guardada._id?.toString();
  categoria2Id = c2Guardada.id || c2Guardada._id?.toString();

  // Crear productos mediante el Service (usa vendedorId y categoriasId)
  await productosService.crear({
    vendedorId: vendedor1Id,
    titulo: "Smartphone XYZ",
    descripcion: "Un smartphone con características avanzadas",
    categoriasId: [categoria1Id],
    precio: 1000000,
    moneda: Moneda.PESO_ARG,
    stock: 100,
    fotos: []
  });

  await productosService.crear({
    vendedorId: vendedor2Id,
    titulo: "Juego de sábanas",
    descripcion: "Juego de sábanas de algodón de alta calidad",
    categoriasId: [categoria2Id],
    precio: 5000,
    moneda: Moneda.PESO_ARG,
    stock: 200,
    fotos: []
  });

  await productosService.crear({
    vendedorId: vendedor1Id,
    titulo: "Tablet ABC",
    descripcion: "Tablet con pantalla de alta resolución",
    categoriasId: [categoria1Id],
    precio: 8000,
    moneda: Moneda.PESO_ARG,
    stock: 150,
    fotos: []
  });

  await productosService.crear({
    vendedorId: vendedor1Id,
    titulo: "Producto de Prueba en dolares",
    descripcion: "Este es un producto de prueba en dolares",
    categoriasId: [categoria1Id],
    precio: 10000000000000,
    moneda: Moneda.DOLAR_USA,
    stock: 1000,
    fotos: []
  });
});

test('paginacion de productos', async () => {
  const pagina = 1;
  const limite = 2;
  const resultado = await productosService.buscarTodosPaginado(pagina, limite, {});

  expect(resultado.data.length).toBe(2);
  // Asegura que ordenamiento por defecto (si existe) no afecta estas aserciones; ajusta si ordenas distinto
  expect(typeof resultado.data[0].precio).toBe('number');
  expect(typeof resultado.data[1].precio).toBe('number');
});

test('filtros de productos por nombre', async () => {
  const pagina = 1;
  const limite = 5;
  const resultado = await productosService.buscarTodosPaginado(pagina, limite, { nombre: "Tablet ABC" });

  expect(resultado.data.length).toBe(1);
  expect(resultado.data[0].titulo).toBe("Tablet ABC");
});

test('filtros de productos por categoria', async () => {
  const pagina = 1;
  const limite = 5;

  const resultado = await productosService.buscarTodosPaginado(pagina, limite, { categoria: categoria1Id });

  // Debe traer productos filtrados por la categoría indicada
  expect(Array.isArray(resultado.data)).toBe(true);
  expect(resultado.data.length).toBeGreaterThanOrEqual(2);
  for (const prod of resultado.data) {
    const cats = (prod.categorias || []).map(c => c.id || c._id?.toString() || c);
    expect(cats).toContain(categoria1Id);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});