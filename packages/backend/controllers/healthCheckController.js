

export class HealthCheckController {
  

  obtenerEstado(req, res) {
    res.status(200).json({ estado: "ok" });
  }
}
