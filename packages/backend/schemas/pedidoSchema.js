import mongoose from "mongoose";
import { Pedido } from "../models/entities/pedido.js";
import { itemSchema } from "./itemSchema.js";
import { EstadoPedido } from "../models/entities/estadoPedido.js";

const direccionSchema = new mongoose.Schema({
  calle: {
    type: String,
    required: true,
  },
  altura: {
    type: String,
    required: true,
  },
  piso: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  cosigoPostal: {
    type: String,
    requiered: true,
  },
  ciudad: {
    type: String,
    requiered: true,
  },
  provincia: {
    type: String,
    requiered: true,
  },
  pais: {
    type: String,
    requiered: true,
  },
  lat: {
    type: String,
    requiered: true,
  },
  lon: {
    type: String,
    requiered: true,
  },
});

const pedidoSchema = new mongoose.Schema({
  comprador: {
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
  direccionEntrega: {
    type: String,
    required: false,
  },
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
