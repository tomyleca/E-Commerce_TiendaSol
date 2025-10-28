import "./notification-modal.css";
import React from "react";
import { useNotification } from "../../context/NotificacionContext.jsx";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function NotificationModal() {
  const { isOpenNotificaciones } = useNotification();
  if (!isOpenNotificaciones) return null;

  return (
    <div className="notification-modal">
	<h4 className="notification-title">¡Tienes nuevas notificaciones!</h4>
    
		<div className="notification">
		<LocalShippingIcon fontSize="medium" sx={{ color: "#bc280eff" }} />
			<p>¡Lo sentimos! El envío de tu pedido #1234 ha sido cancelado.</p>
	  	</div>
		  <div className="notification">
		<LocalShippingIcon fontSize="medium" sx={{ color: "#131412ff" }} />
			<p>¡Enhorabuena! Tu pedido #1234 ha sido enviado.</p>
	  	</div>
			  <div className="notification">
		<ShoppingBagIcon fontSize="medium" sx={{ color: "#131412ff" }} />
			<p>El pedido  #1234 ha sido procesado y será enviado pronto.</p>
	  	</div>
		
    </div>
  );
}