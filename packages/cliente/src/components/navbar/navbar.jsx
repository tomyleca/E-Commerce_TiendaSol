import "./navbar.css";
import { FiLogIn } from "react-icons/fi";
import "../../index.css";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";

const Navbar = ({ onCartClick, minimalist = false }) => {
  const { abrir, cantidadTotal } = useCarrito();
  return (
    <header className={`navbar-bg${minimalist ? " navbar-minimalist" : ""}`}>
      <nav className="navbar">
        
          <div className="navbar-section left">
            {!minimalist && (
              <>
                <button className="menu-icon">☰</button>
                <button className="carrito-button" onClick={abrir}>
                  <Badge badgeContent={cantidadTotal} color="primary">
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
              <Link to="/login" className="login-button" aria-label="Ir a login">
                <FiLogIn />
              </Link>
            )}
          </div>
        </nav>
    </header>
  );
};

export default Navbar;
