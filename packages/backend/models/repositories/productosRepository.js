export class ProductosRepository {
    constructor() {
        this.productos = [];
        this.nextId = 0;
    }

    buscarTodos() {
        return this.productos;
    }

    buscarPorId(id) {
        return this.productos.find(producto => producto.id === id);
    }
    crear(nuevoProducto) {
        nuevoProducto.id = this.nextId++;
        this.productos.push(nuevoProducto)
        return nuevoProducto
    }

}