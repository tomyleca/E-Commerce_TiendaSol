import { Pedido } from "../models/entities/pedido.js";
import { FactoryNotificacion } from "../models/entities/factoryNotificacion.js";
import { NoHayStock } from "../errors/noHayStock.js";
import { EstadoPedido } from "../models/entities/estadoPedido.js";
import { NotFound } from "../errors/notFound.js";
import { IntentoDeCancelarEnviadoError } from "../errors/intentoDeCancelarEnviadoError.js";
import { ItemPedido } from "../models/entities/itemPedido.js";

export class PedidosService {
  constructor(
    pedidosRepository,
    factoryNotificacion,
    notificacionesService,
    productosService,
    usuariosService,
  ) {
    this.pedidosRepository = pedidosRepository;
    this.factoryNotificacion = factoryNotificacion;
    this.notificacionesService = notificacionesService;
    this.productosService = productosService;
    this.usuariosService = usuariosService;
  }

  buscarTodos() {
    return this.pedidosRepository.buscarTodos();
  }

  buscarPorId(id) {
    return this.pedidosRepository.buscarPorId(id);
  }

  async crear(nuevoPedidoJson) {
    const comprador = await this.usuariosService.buscarPorId(
      nuevoPedidoJson.compradorId,
    );
    if (!comprador) {
      throw new NotFound("Usuario", nuevoPedidoJson.compradorId);
    }

    if (nuevoPedidoJson.items.length === 0 || !nuevoPedidoJson.items) {
      throw new Error("El pedido debe tener items");
    }
    const items = await Promise.all(
      nuevoPedidoJson.items.map(async (item) => {
        const itemPedido = await this.productosService.buscarPorId(
          item.productoId,
        );

        if (!itemPedido) {
          throw new NotFound("Producto", item.productoId);
        }
        return new ItemPedido(itemPedido, item.cantidad, item.precioUnitario);
      }),
    );

    const nuevoPedido = new Pedido(
      comprador,
      items,
      nuevoPedidoJson.direccionEntrega,
    );

    if (!nuevoPedido.validarStock()) {
      throw new NoHayStock();
    } //Aca se valida si el stock esta disponible.


    // Registrar ventas solo si el stock es suficiente
    // A demas en el service disminuye el stock
    await this.agregarVentasDePedido(items);

    //Creo la notificación según el pedido
    const notificacion = this.factoryNotificacion.crearSegunPedido(nuevoPedido);

    this.notificacionesService.enviar(notificacion);

    return await this.pedidosRepository.crear(nuevoPedido);
  }

 async cancelar(idPedido) {
    const pedido = await this.pedidosRepository.buscarPorId(idPedido);

    if (!pedido) {
      throw new NotFound(Pedido, idPedido);
    }

    if (pedido.estado === EstadoPedido.ENVIADO) {
      throw new IntentoDeCancelarEnviadoError();
    }

    pedido.actualizarEstado(EstadoPedido.CANCELADO);

    // Crear la notificación usando el pedido actualizado
    const notificacion = this.factoryNotificacion.crearSegunPedido(pedido);
    this.notificacionesService.enviar(notificacion);

    this.pedidosRepository.actualizarEstado(pedido, EstadoPedido.CANCELADO);

    return pedido;
  }

  buscarPedidosDeUsuario(idUsuario) {
    return this.pedidosRepository.buscarPorUsuario(idUsuario);
  }

  // Marcado de un pedido como enviado por parte del vendedor
  async enviar(idPedido) {
    const pedido = await this.pedidosRepository.buscarPorId(idPedido);

    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }

    pedido.actualizarEstado(EstadoPedido.ENVIADO);

    // Crear la notificación usando el pedido actualizado
    const notificacion = this.factoryNotificacion.crearSegunPedido(pedido);
    this.notificacionesService.enviar(notificacion);

    return pedido;
  }

  async agregarVentasDePedido(items) {
    if (items.length === 0 || !items) {
      throw new Error("El pedido debe tener items");
    }

    await Promise.all(
      items.map((item) =>
        this.productosService.agregarVentasDeProducto(
          item.producto.id,
          item.cantidad,
        ),
      ),
    );
  }

}
