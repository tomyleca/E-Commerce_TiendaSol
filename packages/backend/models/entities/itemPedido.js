import { z } from "zod";
import { Producto } from "./producto.js";

export class ItemPedido {
  constructor(producto, cantidad, precioUnitario) {
    z.object({
      producto: z.instanceof(Producto),
      cantidad: z.number().int(),
      precioUnitario: z.number(),
    });

    this.producto = producto;
    this.cantidad = cantidad;

    // Si no viene precioUnitario, usar el precio del producto
    this.precioUnitario = precioUnitario ?? producto.getPrecio();
  }
  //FALTAN ATRPAR LOS ERRORES O VERIFICAR LOS DATOS EN SI

  subTotal() {
    return this.cantidad * this.precioUnitario;
  }

  stockEstaDisponible() {
    return this.producto.estaDisponible(this.cantidad);
  }
}
