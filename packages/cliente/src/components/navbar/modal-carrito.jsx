import React from 'react';
import './modal-carrito.css';

const ModalCarrito = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<h2>Carrito de Compras</h2>
				<p>Lista de productos en el carrito:</p>
				<button className="modal-close" onClick={onClose}>Cerrar</button>
			</div>
		</div>
	);
};



export default ModalCarrito;