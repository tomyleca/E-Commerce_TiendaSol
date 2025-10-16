export class FormatoZodError extends Error {
  constructor(zodError) {
    super();
    this.name = "FormatoZodError";

    const issues = zodError?.issues ?? [];

    // Campos faltantes (undefined)
    const faltantes = issues
      .filter((i) => i.code === "invalid_type" && i.received === "undefined")
      .map((i) => i.path.join("."));

    // Mensajes por campo
    this.fields = issues.map((i) => ({
      path: i.path.join("."),
      code: i.code,
      message: i.message,
    }));

    if (faltantes.length) {
      this.message = `Faltan datos requeridos: ${faltantes.join(", ")}`;
    } else if (issues.length) {
      this.message =
        "Datos de formato incorrecto: " +
        issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    } else {
      this.message = "Datos faltantes o de formato incorrecto";
    }
  }
}
