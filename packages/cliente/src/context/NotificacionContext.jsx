import { createContext, useContext, useMemo, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children })
{
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(3);

  
  const cerrarNotificaciones = () => setIsOpen(false);
  const toggleNotificaciones = () => {setIsOpen((v) => !v); setTotalNotifications(0); };

  const value = useMemo(
    () => ({
      notificaciones : notifications,
      isOpenNotificaciones: isOpen,
	  cantidadNotificaciones: totalNotifications,
      cerrarNotificaciones,
      toggleNotificaciones,
      setNotifications,
    }),
    [notifications, isOpen, totalNotifications]
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
