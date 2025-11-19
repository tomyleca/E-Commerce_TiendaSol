import mongoose from "mongoose";
import { Producto } from "../models/entities/producto.js";

const productoSchema = new mongoose.Schema({
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  categorias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
  ],
  precio: {
    type: Number,
    required: true,
  },
  moneda: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  fotos: [
    {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          // Validar que sea un string Base64 válido o una URL
          return (
            !v ||
            v.startsWith("data:image/") ||
            v.startsWith("http://") ||
            v.startsWith("https://")
          );
        },
        message: (props) =>
          `${props.value} no es una imagen Base64 válida o URL`,
      },
    },
  ],
  activo: {
    type: Boolean,
    required: true,
  },
  ventas: {
    type: Number,
    default: 0,
  },
});

productoSchema.loadClass(Producto); // Al modelo que se va a corresponder el schema
export const ProductoModel = mongoose.model("Producto", productoSchema);
//Este seran el modelo que se usarán en los repositorios.
