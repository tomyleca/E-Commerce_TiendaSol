import mongoose from "mongoose";
import { Direccion } from "../models/entities/direccion.js";

const direccionSchema = new mongoose.Schema(
  {
    calle: { type: String, required: true },
    altura: { type: String, required: true },
    piso: { type: String},
    departamento: { type: String},
    codigoPostal: { type: String, required: true },
    ciudad: { type: String, required: true },
    provincia: { type: String, required: true },
    pais: { type: String, required: true }
},
  { _id: false },
);

direccionSchema.loadClass(Direccion);
export { direccionSchema };
export const direccionModel = mongoose.model(
  "Direccion",
  direccionSchema,
);
