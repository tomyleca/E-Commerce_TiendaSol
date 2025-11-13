import "./navbar.css";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import "../../index.css";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import ResponsiveDrawer from "./drawer.jsx";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationModal from "./notification-modal.jsx";
import ModalCarrito from "./modal-carrito.jsx";
import { useNotification } from "../../context/NotificacionContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import BarraBusqueda from "../producto/BarraBusqueda.jsx";


const Navbar = ({ onCartClick, minimalist = false, fltrarProductos, filtrarProductos }) => {
  const { abrirCarrito, cantidadTotalCarrito } = useCarrito();
  const { toggleNotificaciones, cantidadNotificaciones } = useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const {  isAuthenticated, logout} = useAuth();

  return (
    <>
      <header className={`navbar-bg${minimalist ? " navbar-minimalist" : ""}`}>
        <nav className="navbar">
          <div className="navbar-section left">
            {!minimalist && (
              <>
                <button
                  className="menu-icon"
                  aria-label="Abrir menú"
                  aria-expanded={drawerOpen}
                  onClick={() => setDrawerOpen(true)}
                >
                  ☰
                </button>
                <ResponsiveDrawer
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                />
                <button
                  className="carrito-button"
                  onClick={abrirCarrito}
                  aria-label="Abrir carrito"
                  aria-haspopup="dialog"
                >
                  <Badge badgeContent={cantidadTotalCarrito} color="primary">
                    <ShoppingCartIcon fontSize="large" />
                  </Badge>
                </button>
              </>
            )}
          </div>

          <div className="navbar-section center">
            <img src="/tiendaSolLogo.png" alt="Logo" className="logo" />
            <h1 className="nombre-marca">Tienda Sol</h1>
          </div>

          <div className="navbar-section right">
            {!minimalist && (
              <>
                <button
                  className="search-toggle-button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
                >
                  {searchOpen ? <CloseIcon fontSize="large" /> : <SearchIcon fontSize="large" />}
                </button>
        
				{!isAuthenticated && (
                <Link
                  to="/login"
                  className="login-button"
                  aria-label="Ir a login"
                >
                  <FiLogIn />
                </Link>
				)}

				{isAuthenticated && (
				<>
				<button
                  type="button"
                  onClick={toggleNotificaciones}
                  className="notification-icon"
                  aria-label="Abrir notificaciones"
                  aria-haspopup="dialog"
                >
                  <Badge badgeContent={cantidadNotificaciones} color="primary">
                    <NotificationsIcon fontSize="large" />
                  </Badge>
                </button>
				<Link
                  to="/"
                  className="logout-button"
                  aria-label="Ir a logout"
				  onClick={logout}
                >
                  <FiLogOut />
                </Link>
				</>
				)}
              </>
            )}
          </div>
        </nav>
        
        {/* Barra de búsqueda desplegable */}
        <div className={`search-dropdown ${searchOpen ? 'search-dropdown-open' : ''}`}>
          {searchOpen && (
            <BarraBusqueda 
              fltrarProductos={fltrarProductos} 
              filtrarProductos={filtrarProductos}
            />
          )}
        </div>
        
        <NotificationModal />
        <ModalCarrito />
      </header>
    </>
  );
};

export default Navbar;
