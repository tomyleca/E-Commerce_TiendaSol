import './navbar.css';
import { FiLogIn } from 'react-icons/fi';
import '../../index.css'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrito } from '../../context/CarritoContext';

const Navbar = ({ onCartClick }) => {
  const { abrir, cantidadTotal } = useCarrito();
  return (
    <header className="navbar-bg">
      <nav className="navbar">
        <div className="navbar-section left">
          <button className="menu-icon">☰</button>
        <button className="carrito-button" onClick={abrir}>
      <Badge badgeContent={cantidadTotal} color="primary">
 				 <ShoppingCartIcon />
			</Badge>
		</button>

        </div>

        <div className="navbar-section center">
          
		<img src="tiendaSolLogo.png" alt="Logo" className="logo" />
		<h1 className='nombre-marca'>Tienda Sol</h1>
           
         
        </div>

        <div className="navbar-section right">
        <button className="login-button">
			<FiLogIn  />
		</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;