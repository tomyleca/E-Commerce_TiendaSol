import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAuth } from "./AuthContext.jsx";
import {
  getNotificaciones,
  leerNotificacion,
  contarNoLeidas,
} from "../services/notificacionesService";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { usuario, isAuthenticated } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Cargar notificaciones cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated && usuario?._id) {
      cargarNotificaciones();
    } else {
      setNotificaciones([]);
    }
  }, [isAuthenticated, usuario?._id]);

  /**
   * Carga las notificaciones del usuario desde el backend
   * @param {boolean} leidas - Filtrar por leídas/no leídas (opcional)
   */
  const cargarNotificaciones = async (leidas = null) => {
    if (!usuario?._id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getNotificaciones(usuario._id, leidas);
      setNotificaciones(data);
    } catch (err) {
      console.error("Error cargando notificaciones:", err);
      setError(err.message || "Error al cargar notificaciones");
      mostrarSnackbar("Error al cargar notificaciones", "error");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Marca una notificación como leída
   * @param {string} notificacionId - ID de la notificación
   */
  const marcarComoLeida = async (notificacionId) => {
    if (!usuario?._id || !notificacionId) return;

    try {
      const notificacionActualizada = await leerNotificacion(
        usuario._id,
        notificacionId
      );

      // Actualizar el estado local
      setNotificaciones((prev) =>
        prev.map((n) =>
          n._id === notificacionId ? { ...n, leida: true } : n
        )
      );

      mostrarSnackbar("Notificación marcada como leída", "success");
    } catch (err) {
      console.error("Error al marcar notificación como leída:", err);
      mostrarSnackbar("Error al marcar notificación", "error");
    }
  };

  /**
   * Obtiene solo las notificaciones no leídas
   */
  const getNotificacionesNoLeidas = () => {
    return notificaciones.filter((n) => !n.leida);
  };

  /**
   * Abre el panel de notificaciones y marca el total como 0
   */
  const abrirNotificaciones = () => {
    setIsOpen(true);
  };

  /**
   * Cierra el panel de notificaciones
   */
  const cerrarNotificaciones = () => {
    setIsOpen(false);
  };

  /**
   * Alterna la visibilidad del panel de notificaciones
   */
  const toggleNotificaciones = () => {
    setIsOpen((v) => !v);
  };

  /**
   * Muestra un mensaje en un Snackbar
   * @param {string} message - Mensaje a mostrar
   * @param {string} severity - Tipo de mensaje (success, error, warning, info)
   */
  const mostrarSnackbar = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  /**
   * Cierra el Snackbar
   */
  const cerrarSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Calcular cantidad de notificaciones no leídas
  const cantidadNoLeidas = useMemo(
    () => contarNoLeidas(notificaciones),
    [notificaciones]
  );

  const value = useMemo(
    () => ({
      notificaciones,
      notificacionesNoLeidas: getNotificacionesNoLeidas(),
      cantidadNotificaciones: cantidadNoLeidas,
      isOpenNotificaciones: isOpen,
      loading,
      error,
      cargarNotificaciones,
      marcarComoLeida,
      abrirNotificaciones,
      cerrarNotificaciones,
      toggleNotificaciones,
      setNotificaciones,
    }),
    [notificaciones, isOpen, loading, error, cantidadNoLeidas]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Snackbar para mensajes de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={cerrarSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={cerrarSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}
