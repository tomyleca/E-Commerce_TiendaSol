import { useState } from 'react';
import Navbar from '../components/navbar/navbar.jsx';
import ModalCarrito from '../components/navbar/modal-carrito.jsx';

const ListadoProductos = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);

	return (
		<>
			<Navbar onCartClick={openCart} />
			<ModalCarrito isOpen={isCartOpen} onClose={closeCart} />
			<BodyProductos productos={productosPaginados}/>
		</>
	);
}

export default ListadoProductos;