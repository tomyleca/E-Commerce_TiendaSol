import "./notification-modal.css";
import React from "react";
import { useNotification } from "../../context/NotificacionContext.jsx";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from "react-router-dom";

export default function NotificationModal() {
	const { isOpenNotificaciones, toggleNotificaciones} = useNotification();
	const navigate = useNavigate();
  if (!isOpenNotificaciones) return null;

  return (
	<div className="modal-overlay" onClick={toggleNotificaciones}>
    <div className="notification-modal">
	<h4 className="notification-title">¡Tienes nuevas notificaciones!</h4>

		<div className="notification-list">
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
		<div
			className="notification-footer"
			onClick={() => { toggleNotificaciones(); navigate("/notificaciones"); }}
		>
			Ver todas las notificaciones
		</div>

		
    </div>
	</div>
  );
}