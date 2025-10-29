import { productos } from '../mockData/Productos.js';
import axios from 'axios';

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


	const API_BASE_URL = "http://localhost:3001";

export const getProductos = async (page,vendedor,selectedCategorias) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/vendedores/${encodeURIComponent(vendedor)}/productos?pagina=${page}&categorias=${selectedCategorias.join(",")}`, {
  headers: {
    'Cache-Control': 'no-cache'
  },

});
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los hoteles", error);
    throw error;
  }
}

export const getCategorias = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/categorias`, {
  headers: {
    'Cache-Control': 'no-cache'
  }
});
    return response.data;
  } catch (error) {
    console.error("Error obteniendo las categorías", error);
    throw error;
  }
}