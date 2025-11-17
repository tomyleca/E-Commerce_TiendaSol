import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getProductos = async (
  page,
  selectedCategorias,
  orden,
  precio,
  busqueda,
  vendedor
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
    if (precio?.min && precio.min !== "") {
      params.append("precioMin", precio.min);
    }
    if (precio?.max && precio.max !== "") {
      params.append("precioMax", precio.max);
    }

    // Nota: no se envía 'masVendido' por separado; se usa en 'sort'

    // Búsqueda: el backend espera 'nombre' para filtrar por titulo
    if (busqueda && busqueda !== "") {
      params.append("nombre", busqueda);
    }

    let url;

    if (vendedor) {
      url = `${API_BASE_URL}/usuarios/${vendedor}/productos?${params.toString()}`;
    } else {
      url = `${API_BASE_URL}/productos?${params.toString()}`;
    }

    const response = await axios.get(url, {
      headers: { "Cache-Control": "no-cache" },
    });

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

export const createProducto = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/productos`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creando el producto", error);
    throw error;
  }
}; 