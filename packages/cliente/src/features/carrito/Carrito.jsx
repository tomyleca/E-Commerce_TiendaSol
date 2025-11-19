import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import CarritoItem from "../../components/carrito-item/CarritoItem.jsx";
import BotonVaciarCarrito from "../../components/boton-vaciar-carrito/BotonVaciarCarrito.jsx";
import BotonVolver from "../../components/boton-volver/BotonVolver.jsx";
import { useCarrito } from "../../context/CarritoContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Carrito.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Carrito = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const {
    itemsCarrito,
    precioTotalCarrito,
    cantidadTotalCarrito,
    comprarCarrito,
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
            <BotonVolver className="btn-continuar-comprando">
              Continuar comprando
            </BotonVolver>
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
          <BotonVolver className="btn-volver">Volver</BotonVolver>
          <div className="titulo-carrito">
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
                <span>${precioTotalCarrito.toLocaleString("es-AR")}</span>
              </div>
              <div className="resumen-linea">
                <span>Envío</span>
                <span className="gratis">Gratis</span>
              </div>
              <hr className="resumen-separador" />
              <div className="resumen-total">
                <span>Total</span>
                <span className="total-precio">
                  ${precioTotalCarrito.toLocaleString("es-AR")}
                </span>
              </div>
              <button
                className="btn-proceder-compra"
                onClick={() => comprarCarrito()}
              >
                Proceder con la compra
              </button>
              <button
                className="btn-continuar-comprando-secondary"
                onClick={() => navigate(-1)}
              >
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
