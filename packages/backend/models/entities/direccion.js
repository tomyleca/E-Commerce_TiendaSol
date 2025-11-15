import { z } from "zod";

export class Direccion {
  constructor(
    calle,
    altura,
    piso,
    departamento,
    codigoPostal,
    ciudad,
    provincia,
    pais,
    lat,
    lon,
  ) {
    z.object({
      calle: z.string(),
      altura: z.string(),
      piso: z.string(),
      departamento: z.string(),
      codigoPostal: z.string(),
      ciudad: z.string(),
      provincia: z.string(),
      pais: z.string(),
      lat: z.string(),
      lon: z.string(),
    });

    this.calle = calle;
    this.altura = altura;
    this.piso = piso;
    this.departamento = departamento;
    this.codigoPostal = codigoPostal;
    this.ciudad = ciudad;
    this.provincia = provincia;
    this.pais = pais;
    this.lat = lat;
    this.lon = lon;
  }
}
