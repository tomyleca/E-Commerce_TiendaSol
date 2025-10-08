import mongoose from "mongoose";
import { Usuario } from "../models/entities/usuario";

const usuarioSchema = new mongoose.Schema({
        nombre: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true
        },
        telefono: {
                type: Number,
                required: true
        },
        tipo: {
                type: String,
                required: true
        },
        fechaDeAlta: {
                type: Date,
                required: true
        }
})

usuarioSchema.loadClass(Usuario);
export const UsuarioModel = mongoose.model('Usuario', usuarioSchema);