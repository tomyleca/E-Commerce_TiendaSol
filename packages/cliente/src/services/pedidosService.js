import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getPedidosCliente = async (id) => {
  try {
    if (!id.toString()) {
      throw new Error("ID de usuario no proporcionado");
    }

    const response = await axios.get(`${API_BASE_URL}/usuarios/${id}/pedidos`, {
      headers: { "Cache-Control": "no-cache" },
    });

    return response.data;
  } catch (error) {
    console.error("Error obteniendo los pedidos", error);
    throw error;
  }
};

export const getPedidosVendedor = async (id) => {
  try {
    if (!id.toString()) {
      throw new Error("id de Vendedor no proporcionado");
    }

    const response = await axios.get(`${API_BASE_URL}/usuarios/${id}/ventas`, {
      headers: { "Cache-Control": "no-cache" },
    });

    console.log("Respuesta de getPedidosVendedor:", response);

    return response.data;
  } catch (error) {
    console.error("Error obteniendo pedidos del vendedor", error);
    throw error;
  }
};

export const cancelarPedido = async (id) => {
  try {
    if (!id.toString()) {
      throw new Error("ID de Pedido no proporcionado");
    }

    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${id}/cancelar`,
      {
        headers: { "Cache-Control": "no-cache" },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error cancelando pedido", error);
    throw error;
  }
};

export const enviarPedido = async (id) => {
  try {
    if (!id.toString()) {
      throw new Error("ID de Pedido no proporcionado");
    }

    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${id}/enviar`,
      {},
      {
        headers: { "Cache-Control": "no-cache" },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error enviando pedido", error);
    throw error;
  }
};

export const crearPedido = async (pedidoData) => {
  try {
    if (!pedidoData) {
      throw new Error("Datos del pedido no proporcionados");
    }

    const response = await axios.post(`${API_BASE_URL}/pedidos`, pedidoData, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });

    return response;
  } catch (error) {
    console.error("Error creando el pedido", error);
    const msg =
      error.response?.message || error.message || "Error al crear el pedido";
    throw new Error(msg);
  }
};
