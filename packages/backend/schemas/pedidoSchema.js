import mongoose from "mongoose";
import { Pedido } from "../models/entities/pedido.js";
import { itemSchema } from "./itemSchema.js";
import { EstadoPedido } from "../models/entities/estadoPedido.js";
import { direccionSchema } from "./direccionSchema.js";


const pedidoSchema = new mongoose.Schema({
  comprador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  itemsPedido: {
    type: [itemSchema],
    required: true,
  },
  total: {
    type: Number,
    required: false,
  },
  moneda: {
    type: String,
    required: true,
  },
  direccion: { type: direccionSchema},
  estado: {
    type: String,
    enum: Object.values(EstadoPedido),
    required: true,
  },
  fechaDeCreacion: {
    type: Date,
    required: false,
  },
  historialDeEstados: {
    type: [{ type: String, enum: Object.values(EstadoPedido) }],
    default: [EstadoPedido.PENDIENTE],
  },
});

pedidoSchema.loadClass(Pedido);
export const PedidoModel = mongoose.model("Pedido", pedidoSchema);
