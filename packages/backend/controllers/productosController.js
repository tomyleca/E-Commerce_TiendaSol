import { z } from "zod";



export class ProductosController {
  constructor(productosService) {
    this.productosService = productosService;
  }

  async buscarTodos(req, res) {
    const { pagina, limite } = pagQuerySchema.parse(req.query);
    const querys = req.query;
    const productos = await this.productosService.buscarTodosPaginado(
      pagina,
      limite,
      querys,
    );
    if (productos.data.length === 0) {
      //Podria cambiar el error
      return res
        .status(200)
        .json({ data: [], message: "No se encontraron productos" });
    }
    res.json(productos);
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    const producto = await this.productosService.buscarPorId(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(producto);
  }

  async crear(req, res) {
    
    const resultBodyProducto =  productoSchema.parse(req.body);

    const productoGuardado = await this.productosService
	.crear(resultBodyProducto);
	res.status(201).json(productoGuardado);
  }

  async buscarProductosDeVendedor(req, res) {
    const idVendedor = req.params.id;
    const { pagina = 1, limite = 5 } = req.query;
    const querys = req.query;

    const productosDeVendedor = await this.productosService.buscarPorVendedor(
      pagina,
      limite,
      idVendedor,
      querys,
    );
    res.json(productosDeVendedor);
  }
}

export const productoSchema = z.object({
  vendedorId: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  categoriasId: z.array(z.string()),
  precio: z.number(),
  moneda: z.string(),
  stock: z.number().int(),
  fotos: z.array(z.string()).optional(),
  activo: z.boolean().optional(),
});

const pagQuerySchema = z.object({
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(5),
});
