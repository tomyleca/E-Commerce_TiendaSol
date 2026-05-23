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
import MenuIcon from "@mui/icons-material/Menu";

const brandBadgeSx = {
  "& .MuiBadge-badge": {
    background: "var(--brand-color)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.65rem",
  },
};

const Navbar = ({ minimalist = false }) => {
  const { abrirCarrito, cantidadTotalCarrito } = useCarrito();
  const { toggleNotificaciones, cantidadNotificaciones } = useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { usuario, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className={`navbar-bg${minimalist ? " navbar-minimalist" : ""}`}>
        <nav className="navbar">
          {/* Izquierda */}
          <div className="navbar-section left">
            {!minimalist && (
              <>
                <button
                  className="menu-icon"
                  aria-label="Abrir menú"
                  aria-expanded={drawerOpen}
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon fontSize="medium" />
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
                  <Badge badgeContent={cantidadTotalCarrito} sx={brandBadgeSx}>
                    <ShoppingCartIcon fontSize="medium" />
                  </Badge>
                </button>
              </>
            )}
          </div>

          {/* Centro */}
          <div className="navbar-section center">
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <img src="/tiendaSolLogo.png" alt="Tienda Sol" className="logo" />
              <span className="nombre-marca">Tienda Sol</span>
            </Link>
          </div>

          {/* Derecha */}
          <div className="navbar-section right">
            {!minimalist && (
              <>
                <button
                  className="search-toggle-button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
                >
                  {searchOpen ? (
                    <CloseIcon fontSize="medium" />
                  ) : (
                    <SearchIcon fontSize="medium" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleNotificaciones}
                  className="notification-icon"
                  aria-label="Abrir notificaciones"
                  aria-haspopup="dialog"
                >
                  <Badge badgeContent={cantidadNotificaciones} sx={brandBadgeSx}>
                    <NotificationsIcon fontSize="medium" />
                  </Badge>
                </button>

                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="login-button"
                    aria-label="Iniciar sesión"
                  >
                    <FiLogIn size={20} />
                  </Link>
                )}

                {isAuthenticated && (
                  <Link
                    to="/"
                    className="logout-button"
                    aria-label="Cerrar sesión"
                    onClick={logout}
                  >
                    <FiLogOut size={20} />
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>

        {/* Barra de búsqueda */}
        <div className={`search-dropdown ${searchOpen ? "search-dropdown-open" : ""}`}>
          {searchOpen && <BarraBusqueda />}
        </div>

        <NotificationModal />
        <ModalCarrito />
      </header>
    </>
  );
};

export default Navbar;
