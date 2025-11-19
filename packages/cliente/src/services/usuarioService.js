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


export const crearUsuario = async (usuario) => {
	try {
		//mapear del formulario al esquema del backend
		const payload = {
			nombre: usuario.username?.trim(),
			email: usuario.email?.trim(),
			password: usuario.password,
			// Mantener el tipo si viene, o usar el valor que ya se estaba estableciendo por defecto
			tipo: usuario.tipo ?? "USUARIO",
			telefono: usuario.telefono ? Number(usuario.telefono) : undefined,
		};

		const response = await axios.post(
			`${API_BASE_URL}/usuarios`,
			payload,
			{
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
				},
				validateStatus: (s) => s >= 200 && s < 500,
			}
		);

		if (response.status >= 400) {
			const detalle = typeof response.data === "string" ? response.data : (response.data?.message || JSON.stringify(response.data));
			throw new Error(`Error ${response.status} creando usuario: ${detalle}`);
		}

		return response.data;
	} catch (error) {
		console.error(`Error creando el usuario. CODIGO DE ERROR: ${error.response ? error.response.status : "Desconocido"}`, error.response?.data || error.message);
		throw error;
	}

}

export const loginUsuario = async (usuario) => {
	try {
		const payload = {
			nombre: usuario.username?.trim(),
			email: usuario.email?.trim(),
			password: usuario.password,

		};

		console.log("Payload de login:", payload);
		const response = await axios.post(
			`${API_BASE_URL}/usuarios/login`,
			payload,
			{
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
				},
				validateStatus: (s) => s >= 200 && s < 500,
			}
		);
		if (response.status >= 400) {
			const detalle = typeof response.data === "string" ? response.data : (response.data?.message || JSON.stringify(response.data));
			throw new Error(`Error ${response.status} creando usuario: ${detalle}`);

		}


		return response.data;

	}
	catch (error) {

		throw error;
	}

}


export const actualizarUsuario = async (idUsuario, datosActualizados) => {
	try {
		const response = await axios.patch(
			`${API_BASE_URL}/usuarios/${idUsuario}`,
			datosActualizados,
			{
				headers: {
					"Content-Type": "application/json",
				},
				validateStatus: (status) => status < 500,
			}
		);

		if (response.status >= 400) {
			const errorMsg = response.data?.message || response.data?.error || "Error actualizando usuario";
			throw new Error(errorMsg);
		}

		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data?.message || "Error del servidor");
		}
		throw error;
	}
};

export const getNotificaciones = async (id,leidas) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/usuarios/${id}/notificaciones?leidas=${leidas}`, {
			headers: {
				"Cache-Control": "no-cache",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error obteniendo las notificaciones", error);
		throw error;
	}
};

export const marcarNotificacionLeida = async (userId, notificacionId) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/usuarios/${userId}/notificaciones/${notificacionId}`,
			{
				headers: {
					"Cache-Control": "no-cache",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error marcando notificación como leída", error);
		throw error;
	}
};