import { productos } from "../mockData/Productos.js";
import axios from "axios";

export const getProducto = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 500);
  });

export const getProductoByIdMock = (id) =>
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
  busqueda,
) => {
  try {
    const params = new URLSearchParams();

    if (page) {
      params.append("pagina", page);
    }

    if (selectedCategorias && selectedCategorias.length > 0) {
      params.append("categorias", selectedCategorias.join(","));
    }

    if (orden === "masVendido") {
      params.set("sort", "masVendido");
    } else if (orden && orden !== "") {
      // Aceptar alias 'asc'/'desc' y mapearlos a precio_asc/precio_desc
      const mapped =
        orden === "asc"
          ? "precio_asc"
          : orden === "desc"
            ? "precio_desc"
            : orden;
      params.set("sort", mapped);
    }

    // Precio separado
    if (precio?.min !== "") {
      params.append("precioMin", precio.min);
    }
    if (precio?.max !== "") {
      params.append("precioMax", precio.max);
    }

    // Nota: no se envía 'masVendido' por separado; se usa en 'sort'

    // Búsqueda: el backend espera 'nombre' para filtrar por titulo
    if (busqueda && busqueda !== "") {
      params.append("nombre", busqueda);
    }

    const response = await axios.get(
      `${API_BASE_URL}/productos?${params.toString()}`,
      {
        headers: { "Cache-Control": "no-cache" },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error obteniendo los productos", error);
    throw error;
  }
};

export const getProductoById = async (
  id
) => {
  try {

    if (!id.toString()) {
      throw new Error("ID de producto no proporcionado");
    }
    
    const response = await axios.get(
      `${API_BASE_URL}/productos/${id}`,
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
