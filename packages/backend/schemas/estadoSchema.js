import mongoose from "mongoose";
import { EstadoPedido } from "../models/entities/estadoPedido.js";

// EstadoPedido es un enum (objeto plano), no una clase. No usar loadClass.
// Exportamos un sub-esquema reutilizable solo si hace falta un objeto anidado,
// pero típicamente se modela como un string con enum directamente en el schema padre.
export const estadoSchema = new mongoose.Schema(
  {
    estado: {
      type: String,
      enum: Object.values(EstadoPedido),
      required: true,
    },
  },
  { _id: false },
);
