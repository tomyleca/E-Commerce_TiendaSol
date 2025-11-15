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
	// Campos opcionales para vendedores
	descripcion: { type: String, required: false },
	ubicacion: { type: String, required: false },
},
  { collection: "usuarios" },
);

// Middleware pre-save: setear automáticamente como VENDEDOR si tiene datos de tienda
usuarioSchema.pre('save', function(next) {
  // Si tiene descripción O ubicación, automáticamente es vendedor
  if ((this.descripcion || this.ubicacion) && this.tipo !== 'VENDEDOR') {
    this.tipo = 'VENDEDOR';
  }
  next();
});

// Middleware post-update: verificar el documento actualizado y ajustar tipo si es necesario
usuarioSchema.post('findOneAndUpdate', async function(doc) {
  if (doc && (doc.descripcion || doc.ubicacion) && doc.tipo !== 'VENDEDOR') {
    doc.tipo = 'VENDEDOR';
    await doc.save();
  }
});

usuarioSchema.loadClass(Usuario);
export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);

function cumpleRequisitosVendedor(usuario) {
  return usuario.telefono && usuario.descripcion
}