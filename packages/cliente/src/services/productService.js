import { productos } from '../mockData/Productos.js';

export const getProducto = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(productos);
    }, 500);
})

export const getProductoById = (id) =>
    new Promise((resolve) => {
        setTimeout(() => {
            const producto = productos.find(h => h.id === parseInt(id));
            resolve(producto);
        }, 500);
    });