import { createContext, useContext, useMemo, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children })
{
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const abrirNotificaciones = () => setIsOpen(true);
  const cerrarNotificaciones = () => setIsOpen(false);
  const toggleNotificaciones = () => setIsOpen((v) => !v);

  const value = useMemo(
    () => ({
      notificationes : notifications,
      isOpenNotificaciones: isOpen,
      abrirNotificaciones,
      cerrarNotificaciones,
      toggleNotificaciones,
      setNotifications,
    }),
    [notifications, isOpen]
  );



    return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  );
}


export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}
