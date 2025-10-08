import mongoose from "mongoose"
import { DireccionEntrega } from "../models/entities/direccionEntrega.js"

const direccionSchema = new mongoose.Schema(
  {
    calle: { type: String, required: true },
    altura: { type: String, required: true },
    piso: { type: String, required: true },
    departamento: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    ciudad: { type: String, required: true },
    provincia: { type: String, required: true },
    pais: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true },
  },
  { _id: false }
)

direccionSchema.loadClass(DireccionEntrega)
export { direccionSchema }
export const direccionModel = mongoose.model('DireccionEntrega', direccionSchema)