import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar.jsx';
import CarritoItem from '../../components/carrito-item/CarritoItem.jsx';
import BotonVaciarCarrito from '../../components/boton-vaciar-carrito/BotonVaciarCarrito.jsx';
import { useCarrito } from '../../context/CarritoContext.jsx';
import './Carrito.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Carrito = () => {
  const navigate = useNavigate();
  const {
    itemsCarrito,
    precioTotalCarrito,
    cantidadTotalCarrito,
  } = useCarrito();

  if (itemsCarrito.length === 0) {
    return (
      <>
        <Navbar />
        <div className="carrito-container">
          <div className="carrito-vacio">
            <ShoppingCartOutlinedIcon className="carrito-vacio-icon" />
            <h2>Tu carrito está vacío</h2>
            <p>¡Agrega productos para comenzar tu compra!</p>
            <button className="btn-continuar-comprando" onClick={() => navigate(-1)}>
              <ArrowBackIcon /> Continuar comprando
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="carrito-container">
        <div className="carrito-header">
          <button className="btn-volver" onClick={() => navigate(-1)}>
            <ArrowBackIcon /> Volver
          </button>
		  <div className='titulo-carrito'>
        	<ShoppingCartOutlinedIcon className="carrito-header-icon" />
          <h1>Carrito</h1>
		  </div>
          <BotonVaciarCarrito />
        </div>

        <div className="carrito-content">
          <div className="carrito-items">
            {itemsCarrito.map((item) => (
              <CarritoItem key={item.id} item={item} />
            ))}
          </div>

          <div className="carrito-resumen">
            <div className="resumen-card">
              <h2>Resumen de compra</h2>
              <div className="resumen-linea">
                <span>Productos ({cantidadTotalCarrito})</span>
                <span>${precioTotalCarrito.toLocaleString('es-AR')}</span>
              </div>
              <div className="resumen-linea">
                <span>Envío</span>
                <span className="gratis">Gratis</span>
              </div>
              <hr className="resumen-separador" />
              <div className="resumen-total">
                <span>Total</span>
                <span className="total-precio">
                  ${precioTotalCarrito.toLocaleString('es-AR')}
                </span>
              </div>
              <button className="btn-proceder-compra" onClick={() => console.log('Procediendo a la compra...')}>
                Proceder con la compra
              </button>
              <button className="btn-continuar-comprando-secondary" onClick={() => navigate(-1)}>
                Continuar comprando
              </button>
              <div className="resumen-info">
                <p>✓ Envío gratis en compras superiores a $50,000</p>
                <p>✓ Garantía de devolución de 30 días</p>
                <p>✓ Pago seguro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
