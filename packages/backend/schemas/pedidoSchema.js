import mongoose from "mongoose";
import { Pedido } from '../models/entities/pedido';
import { direccionModel } from "./direccionSchema";
import { estadoModel } from "./estadoSchema";

const pedidoSchema = new mongoose.Schema({

    comprador: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    itemPedido: [{
        type: mongoose.Schema.ObjectId,
        ref: 'ItemPedido',
        requiered: true
    }
    ],
    vendedor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario'
    },
    total: {
        type: Number,
        requiered: true
    },
    moneda: {
        type: String,
        required: true
    },
    direccionEntrega: direccionModel,
    estado: estadoModel,
    fechaDeCreacion: {
        type: Date,
        required: true
    },
    historialDeEstados: [estadoModel]

})


pedidoSchema.loadClass(Pedido);
export const pedidoModel = mongoose.model('Pedido', pedidoSchema);