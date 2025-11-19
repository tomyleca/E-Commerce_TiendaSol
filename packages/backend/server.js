import express from "express";

export class Server {
  #controllers = {};
  #app;
  #routes;

  constructor(app, port) {
    this.#app = app;
    this.port = port;
    this.#routes = [];
    this.#app.use(express.json({ limit: "50mb" }));
    this.#app.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  //Lo pongo aca pq no es necesario crearle un archivo routes aparte
  configureHealthCheck() {
    this.#app.get("/health", (req, res) => {
      res.send("Aplicación corriendo correctamente");
    });
  }

  addRoute(route) {
    this.#routes.push(route);
  }

  configureRoutes() {
    this.#routes.forEach((route) =>
      this.#app.use(route(this.getController.bind(this))),
    );

    this.configureHealthCheck();
  }

  launch() {
    this.app.listen(this.port, "0.0.0.0", () => {
      console.log("Server running on port " + this.port);
    });
  }
}
