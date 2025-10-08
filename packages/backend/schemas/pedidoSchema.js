import mongoose from "mongoose";
import { Pedido } from '../models/entities/pedido.js';
import { estadoSchema } from "./estadoSchema.js";
import { EstadoPedido } from "../models/entities/estadoPedido.js";
import { itemSchema } from "./itemSchema.js";

const pedidoSchema = new mongoose.Schema({

    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    itemsPedido: {
        type: [itemSchema],
        required: true
    },
    total: {
        type: Number,
        required: false
    },
    moneda: {
        type: String,
        required: true
    },
    direccionEntrega: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: Object.values(EstadoPedido),
        required: true
    },
    fechaDeCreacion: {
        type: Date,
        required: false
    },
      historialDeEstados: {
    type: [{ type: String, enum: Object.values(EstadoPedido) }],
    default: [EstadoPedido.PENDIENTE]
  }

})


pedidoSchema.loadClass(Pedido);
export const PedidoModel = mongoose.model('Pedido', pedidoSchema);