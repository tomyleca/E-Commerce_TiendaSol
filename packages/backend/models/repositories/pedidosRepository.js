import mongoose from "mongoose";
import { PedidoModel } from "../../schemas/pedidoSchema.js";

export class PedidosRepository {
  constructor() {
    this.model = PedidoModel;
  }

  async buscarTodos() {
    return PedidoModel.find().populate(
      "vendedor comprador itemsPedido.producto direccionEntrega estado historialDeEstados",
    );
  }

  async buscarPorId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return PedidoModel.findById(id).populate(
      "vendedor comprador itemsPedido.producto direccionEntrega estado historialDeEstados",
    );
  }

  async crear(nuevoPedido) {
    const pedidoMongo = new PedidoModel(nuevoPedido);
    return pedidoMongo.save();
  }

  async actualizar(pedido) {
    let pedidoActualizado = await this.model.findByIdAndUpdate(
      pedido.id,
      pedido,
      { new: true },
    );
    // el new true hace que devuelva el objeto actualizado

    //si no lo encuentra, lo crea
    if (!pedidoActualizado) {
      pedidoActualizado = await this.crear(pedido);
    }

    return pedidoActualizado;
  }

  async actualizarEstado(id, nuevoEstado) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return PedidoModel.findByIdAndUpdate(
      id,
      { estado: nuevoEstado, $push: { historialDeEstados: nuevoEstado } },
      { new: true },
    );
  }

  async buscarPorUsuario(idUsuario) {
    if (!mongoose.Types.ObjectId.isValid(idUsuario)) return [];
    return PedidoModel.find({ comprador: idUsuario }).populate(
      "vendedor comprador itemsPedido.producto direccionEntrega estado historialDeEstados",
    );
  }

  async buscarPorVendedor(idVendedor){
    if (!mongoose.Types.ObjectId.isValid(idVendedor)) return [];
    return PedidoModel.find({ vendedor: idVendedor}).populate(
      "vendedor comprador itemsPedido.producto direccionEntrega estado historialDeEstados",
    );
  }

  async buscarPorFiltros(vendedorId, filtros = {}) {
    const query = { vendedor: vendedorId }; // siempre filtramos por vendedor

    if (filtros.nombre) {
      query.nombre = filtros.nombre;
    }
    if (filtros.descripcion) {
      query.descripcion = filtros.descripcion;
    }

    if (filtros.categoria) {
      query.categoria = filtros.categoria;
    }

    // Rango de precios
    if (filtros.precioMin || filtros.precioMax) {
      query.precio = {};
      if (filtros.precioMin) query.precio.$gte = Number(filtros.precioMin);
      if (filtros.precioMax) query.precio.$lte = Number(filtros.precioMax);
    }

    // Ejecutamos la consulta
    return await this.model.find(query).populate("vendedor");
  }
}

/*

    buscarTodos() {
        return this.pedidos;
    }

    async buscarPorId(id) {
        return await this.model.findById(id);
    }
    async crear(pedido) {
        const nuevoPedido = new this.model(pedido);
        return await nuevoPedido.save();
    }


    async buscarPorUsuario(idUsuario) {
        return await this.model.find({ comprador: idUsuario });
    }
		
    

*/
