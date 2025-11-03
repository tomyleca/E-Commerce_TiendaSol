import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const getUsuario = async (id) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/usuarios/${id}`,
			{
				headers: { "Cache-Control": "no-cache" },
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error obteniendo el usuario", error);
		throw error;
	}
};
