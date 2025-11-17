import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const getPedidosCliente= async (id) => {
try{
 if (!id.toString()) {
      throw new Error("ID de usuario no proporcionado");
    }

    const response = await axios.get(
      `${API_BASE_URL}usuarios/${id}/pedidos`,
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


