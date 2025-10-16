import mongoose from "mongoose";

// Subdocumento embebido para ItemPedido en Pedido
// NOTA: aquí no cargamos la clase de dominio ItemPedido porque en DB guardamos solo la forma persistible
// (refs y valores primitivos). La validación de dominio con zod vive en la entidad.
const itemSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precioUnitario: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

export { itemSchema };
