import mongoose from "mongoose";
import { EstadoPedido } from "../models/entities/estadoPedido";

const estadoSchema= new mongoose.Schema({

    estado:{
        type:String,
        required: true

    }

})

estadoSchema.loadClass(EstadoPedido);
export const estadoModel = mongoose.model('EstadoPedido', estadoSchema);