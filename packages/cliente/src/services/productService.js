import {productos} from '../mockData/Productos.js';

export const getProducto=() => new Promise((resolve) => {
    setTimeout(() => {
        resolve(productos);
    }, 500);
})