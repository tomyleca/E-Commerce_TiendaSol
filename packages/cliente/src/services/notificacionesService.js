import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Obtiene las notificaciones de un usuario
 * @param {string} usuarioId - ID del usuario
 * @param {boolean} leidas - Filtrar por notificaciones leídas/no leídas (opcional)
 * @returns {Promise<Array>} Array de notificaciones
 */
export const getNotificaciones = async (usuarioId, leidas = null) => {
    try {
        if (!usuarioId) {
            throw new Error("ID de usuario no proporcionado");
        }

        let url = `${API_BASE_URL}/usuarios/${usuarioId}/notificaciones`;

        if (leidas !== null) {
            url += `?leidas=${leidas}`;
        }

        const response = await axios.get(url, {
            headers: { "Cache-Control": "no-cache" },
        });

        return response.data;
    } catch (error) {
        console.error("Error obteniendo notificaciones:", error);
        throw error;
    }
};

/**
 * Marca una notificación como leída
 * @param {string} usuarioId - ID del usuario
 * @param {string} notificacionId - ID de la notificación
 * @returns {Promise<Object>} Notificación actualizada
 */
export const leerNotificacion = async (usuarioId, notificacionId) => {
    try {
        if (!usuarioId || !notificacionId) {
            throw new Error("IDs no proporcionados");
        }

        const response = await axios.get(
            `${API_BASE_URL}/usuarios/${usuarioId}/notificaciones/${notificacionId}`,
            {
                headers: { "Cache-Control": "no-cache" },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error al marcar notificación como leída:", error);
        throw error;
    }
};

/**
 * Obtiene el conteo de notificaciones no leídas
 * @param {Array} notificaciones - Array de notificaciones
 * @returns {number} Cantidad de notificaciones no leídas
 */
export const contarNoLeidas = (notificaciones) => {
    return notificaciones.filter((n) => !n.leida).length;
};
