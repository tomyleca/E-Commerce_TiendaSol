import mongoose from "mongoose";
import { Usuario } from "../models/entities/usuario.js";

// Subdocumento embebido para email
const emailSchema = new mongoose.Schema(
  {
    direccion: {
      type: String,
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de email inválido"],
      trim: true,
      lowercase: true,
    },
  },
  { _id: false },
);

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: emailSchema, required: true },
    telefono: { type: Number, required: false },
    tipo: { type: String, required: true },
    fechaDeAlta: { type: Date, required: true, default: Date.now },
	passwordHash: { type: String, required: true },
},
  { collection: "usuarios" },
);

usuarioSchema.loadClass(Usuario);
export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);
