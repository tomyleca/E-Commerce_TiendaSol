import "./navbar.css";
import { FiLogIn } from "react-icons/fi";
import "../../index.css";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import ResponsiveDrawer from "./drawer.jsx";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationModal from "./notification-modal.jsx";
import ModalCarrito from "./modal-carrito.jsx";
import { useNotification } from "../../context/NotificacionContext.jsx";

const Navbar = ({ onCartClick, minimalist = false }) => {
  const { abrirCarrito, cantidadTotalCarrito } = useCarrito();
  const { toggleNotificaciones, cantidadNotificaciones} = useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
	<>
    <header className={`navbar-bg${minimalist ? " navbar-minimalist" : ""}`}>
      <nav className="navbar">
        
          <div className="navbar-section left">
            {!minimalist && (
              <>
                <button className="menu-icon" onClick={() => setDrawerOpen(true)}>☰</button>
                <ResponsiveDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
                <button className="carrito-button" onClick={abrirCarrito}>
                  <Badge badgeContent={cantidadTotalCarrito} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </button>
              </>
            )}
          </div>
        

        <div className="navbar-section center">
          <img src="tiendaSolLogo.png" alt="Logo" className="logo" />
          <h1 className="nombre-marca">Tienda Sol</h1>
        </div>

        
          <div className="navbar-section right">
            {!minimalist && (
            <>
              <div role="button" onClick={toggleNotificaciones} className="notification-icon">
                <Badge badgeContent={cantidadNotificaciones} color="primary">
                  <NotificationsIcon fontSize="medium" />
                </Badge>
            </div>
                <Link to="/login" className="login-button" aria-label="Ir a login">
                  <FiLogIn />
                </Link>
              </>
            )}
          </div>
        </nav>
		<NotificationModal />
		<ModalCarrito />
    </header>
	</>
  );
};

export default Navbar;
