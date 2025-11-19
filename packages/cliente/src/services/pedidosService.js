import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const getPedidosCliente= async (id) => {
try{
 if (!id.toString()) {
      throw new Error("ID de usuario no proporcionado");
    }

    const response = await axios.get(
      `${API_BASE_URL}/usuarios/${id}/pedidos`,
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error obteniendo los pedidos", error);
    throw error;
  }
}

export const getPedidosVendedor = async (id) => {
  try {
    if (!id.toString()) {
      throw new Error("id de Vendedor no proporcionado");
    }
    
    const response = await axios.get(
      `${API_BASE_URL}/pedidos`,
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );

    return response.data;
  } catch (error) {
    
  }
}

export const enviarPedido= async (id) => {

  try {
    if (!id.toString()) {
      throw new Error("ID de Pedido no proporcionado");
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${id}/enviar`,
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );

    return response.data;
  } catch (error) {
    
  }
}

export const cancelarPedido= async (id) => {

  try {
    if (!id.toString()) {
      throw new Error("ID de Pedido no proporcionado");
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${id}/cancelar`,
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );

    return response.data;
  } catch (error) {
    
  }
}

