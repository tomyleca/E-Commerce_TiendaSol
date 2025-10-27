import React from 'react';
import './modal-carrito.css';


import { useCarrito } from '../../context/CarritoContext';
// ...
const ModalCarrito = () => {
  const { isOpen, cerrar, items, precioTotal, quitar, vaciar } = useCarrito();
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={cerrar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Carrito</h2>
        {items.map(it => (
          <div key={it.id}>
            {it.title} x{it.qty} — ${it.price}
            <button onClick={() => quitar(it.id)}>Eliminar</button>
          </div>
        ))}
        <div>Total: ${precioTotal}</div>
        <button onClick={vaciar}>Vaciar</button>
        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
};



export default ModalCarrito;