import { productos } from "../mockData/Productos.js";
import axios from "axios";

export const getProducto = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 500);
  });

export const getProductoById = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const producto = productos.find((h) => h.id === parseInt(id));
      resolve(producto);
    }, 500);
  });

const API_BASE_URL = "http://localhost:3001"; //Definir en un env

export const getProductos = async (
  page,
  selectedCategorias,
  orden,
  precio,
  masVendido,
  busqueda
) => {
  try {
    const params = new URLSearchParams();

    if (selectedCategorias && selectedCategorias.length > 0) {
      params.append("categorias", selectedCategorias.join(","));
    }

    // Orden
    if (orden && orden !== "") {
      params.append("orden", orden);
    }

    // Precio separado
    if (precio?.min !== "") {
      params.append("precioMin", precio.min);
    }
    if (precio?.max !== "") {
      params.append("precioMax", precio.max);
    }

    // Mas vendido
    if (masVendido) {
      params.append("masVendido", masVendido);
    }

    // Búsqueda
    if (busqueda && busqueda !== "") {
      params.append("titulo", busqueda);
    }

    const response = await axios.get(
      `${API_BASE_URL}/productos?${params.toString()}`,
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error obteniendo los productos", error);
    throw error;
  }
};

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categorias`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo las categorías", error);
    throw error;
  }
};
