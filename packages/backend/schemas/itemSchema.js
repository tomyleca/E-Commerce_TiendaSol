import mongoose from "mongoose";
import { ItemPedido } from "../models/entities/itemPedido";

const itemSchema= new mongoose.Schema({

    producto:{
        type: mongoose.Schema.ObjectId,
        required: true

    },
    nombreProducto: {
        type: String,
        required:true,
    },
    precioProducto: {
        type:Number,
        required:true
    },
    cantidad:{ 
        type: Number,
        required: true
    },


})

itemSchema.loadClass(ItemPedido);
export const ItemModel = mongoose.model('ItemPedido',itemSchema)