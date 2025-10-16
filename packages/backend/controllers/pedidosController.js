import { z } from "zod";
import { FormatoZodError } from "../errors/formatoZodError.js";
import { FormatoInvalidoDeId } from "../errors/formatoInvalidoDeId.js";
import { chequearID } from "./utilsControllers.js";

export class PedidosController {
  constructor(pedidosService) {
    this.pedidosService = pedidosService;
  }

  async buscarTodos(req, res) {
    const pedidos = await this.pedidosService.buscarTodos();
    res.json(pedidos);
  }

  async crear(req, res) {
    const BodyPedido = req.body;
    const resultBodyPedido = pedidosSchema.safeParse(BodyPedido);

    if (!resultBodyPedido.success) {
      throw new FormatoZodError(resultBodyPedido.error);
    }
    const pedidoGuardado = await this.pedidosService.crear(
      resultBodyPedido.data,
    );

    res.status(201).json(pedidoGuardado);
  }

  async cancelar(req, res) {
    let idPedido = req.params.id;

    idPedido = chequearID(idPedido);
    if (!idPedido) {
      throw new FormatoInvalidoDeId(idPedido);
    }

    await this.pedidosService.cancelar(idPedido);
    res.status(200).json("Pedido cancelado exitosamente");
  }

  async enviar(req, res) {
    let idPedido = req.params.id;

    idPedido = chequearID(idPedido);
    if (!idPedido) {
      throw new FormatoInvalidoDeId(idPedido);
    }

    await this.pedidosService.enviar(idPedido);
    res.status(200).json("Pedido enviado exitosamente");
  }
}

const ItemPedidoSchema = z.object({
  productoId: z.string(),
  cantidad: z.number().positive(),
  precioUnitario: z.number().nonnegative(),
});

const pedidosSchema = z.object({
  compradorId: z.string(),
  items: z.array(ItemPedidoSchema),
  total: z.number().nonnegative(),
  moneda: z.string(),
  direccionEntrega: z.string(),
});
