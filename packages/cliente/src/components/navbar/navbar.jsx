import './navbar.css';
import {FaShoppingCart} from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi';
import '../../index.css'

const Navbar = ({ onCartClick }) => {
  return (
    <header className="navbar-bg">
      <nav className="navbar">
        <div className="navbar-section left">
          <button className="menu-icon">☰</button>
        <button className="carrito-button" onClick={onCartClick}>
				<FaShoppingCart />
				<span className="carrito-count">0</span>
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