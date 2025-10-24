import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import ModalCarrito from './components/navbar/modal-carrito.jsx';


function App() {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);

	return (
		<>
			<Navbar onCartClick={openCart} />
			<ModalCarrito isOpen={isCartOpen} onClose={closeCart} />
		</>
	);
}

export default App;
