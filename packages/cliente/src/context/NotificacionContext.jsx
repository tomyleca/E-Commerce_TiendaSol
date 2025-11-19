import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { getNotificaciones, marcarNotificacionLeida } from "../services/usuarioService";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { usuario, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar notificaciones del backend cuando el usuario está autenticado
  useEffect(() => {
    if (!isAuthenticated || !usuario) {
      setNotifications([]);
      return;
    }

    const cargarNotificaciones = async () => {
      try {
        setLoading(true);
        const userId = usuario._id || usuario.id;
        const data = await getNotificaciones(userId, false);

        const normalized = (data || []).map((n) => ({
          ...n,
          id: n.id || n._id || `${n.tipo}-${n.fecha}`,
          leida: n.leida ?? false,
        }));

        setNotifications(normalized);
      } catch (error) {
        console.error("Error cargando notificaciones:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    cargarNotificaciones();

    // Recargar cada 30 segundos
    const interval = setInterval(cargarNotificaciones, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, usuario]);

<<<<<<< HEAD
  /**
   * Marca una notificación como leída
   * @param {string} notificacionId - ID de la notificación
   */
  const marcarComoLeida = async (id) => {
    try {
      const userId = usuario._id || usuario.id;
      await marcarNotificacionLeida(userId, id);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
      );
    } catch (error) {
      console.error("Error marcando notificación como leída:", error);
      toast.error("Error al marcar la notificación como leída");
    }
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
=======
  const cerrarNotificaciones = () => setIsOpen(false);
>>>>>>> e6173a790e4170c7df9a6e59f774bd22939a87c3
  const toggleNotificaciones = () => {
    setIsOpen((v) => !v);
  };

  const marcarTodasLeidas = async () => {
    try {
      const userId = usuario._id || usuario.id;
      const notificacionesNoLeidas = notifications.filter(n => !n.leida);

      // Marcar todas en el backend
      await Promise.all(
        notificacionesNoLeidas.map(n => marcarNotificacionLeida(userId, n.id))
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, leida: true })));
      toast.success("Todas las notificaciones marcadas como leídas");
    } catch (error) {
      console.error("Error marcando todas como leídas:", error);
      toast.error("Error al marcar las notificaciones como leídas");
    }
  };

  const cantidadNoLeidas = notifications.filter((n) => !n.leida).length;

  const value = useMemo(
    () => ({
      notificaciones: notifications,
      isOpenNotificaciones: isOpen,
      cantidadNotificaciones: cantidadNoLeidas,
      cerrarNotificaciones,
      toggleNotificaciones,
      marcarComoLeida,
      marcarTodasLeidas,
      loading,
    }),
    [notifications, isOpen, cantidadNoLeidas, loading],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}
