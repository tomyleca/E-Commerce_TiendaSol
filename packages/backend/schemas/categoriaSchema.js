import { Categoria } from "../models/entities/categoria.js";
import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({

    nombre: { type : String ,
              required : true
    }
})

categoriaSchema.loadClass(Categoria);
export const CategoriaModel = mongoose.model('Categoria',categoriaSchema);