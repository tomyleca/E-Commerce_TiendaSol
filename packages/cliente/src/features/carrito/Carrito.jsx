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
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const GARANTIAS = [
  { icon: <LocalShippingOutlinedIcon fontSize="small" />, text: "Envío gratis en compras superiores a $50.000" },
  { icon: <AutorenewIcon fontSize="small" />,            text: "Devolución gratis por 30 días" },
  { icon: <VerifiedUserOutlinedIcon fontSize="small" />, text: "Pago seguro garantizado" },
];

const Carrito = () => {
  const navigate = useNavigate();
  const { itemsCarrito, precioTotalCarrito, cantidadTotalCarrito, comprarCarrito } = useCarrito();

  if (itemsCarrito.length === 0) {
    return (
      <>
        <Navbar />
        <div className="carrito-page">
          <div className="carrito-empty">
            <ShoppingCartOutlinedIcon className="carrito-empty__icon" />
            <h2 className="carrito-empty__title">Tu carrito está vacío</h2>
            <p className="carrito-empty__subtitle">
              Explorá nuestros productos y agregá los que te gusten.
            </p>
            <BotonVolver className="carrito-empty__btn">
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
      <div className="carrito-page">
        {/* Encabezado */}
        <div className="carrito-topbar">
          <BotonVolver className="carrito-topbar__back" />
          <div className="carrito-topbar__title">
            <ShoppingCartOutlinedIcon />
            <h1>Carrito</h1>
            <span className="carrito-topbar__count">{cantidadTotalCarrito}</span>
          </div>
          <BotonVaciarCarrito />
        </div>

        {/* Contenido */}
        <div className="carrito-layout">
          {/* Columna de items */}
          <div className="carrito-items">
            {itemsCarrito.map((item) => (
              <CarritoItem key={item.id} item={item} />
            ))}
          </div>

          {/* Resumen */}
          <aside className="carrito-resumen">
            <div className="resumen-card">
              <h2 className="resumen-card__title">Resumen de compra</h2>

              <div className="resumen-linea">
                <span>Productos ({cantidadTotalCarrito})</span>
                <span>${precioTotalCarrito.toLocaleString("es-AR")}</span>
              </div>
              <div className="resumen-linea">
                <span>Envío</span>
                <span className="resumen-gratis">Gratis</span>
              </div>

              <div className="resumen-separador" />

              <div className="resumen-total">
                <span>Total</span>
                <span className="resumen-total__precio">
                  ${precioTotalCarrito.toLocaleString("es-AR")}
                </span>
              </div>

              <button
                className="resumen-btn-primary"
                onClick={() => comprarCarrito()}
              >
                Proceder con la compra
              </button>
              <button
                className="resumen-btn-secondary"
                onClick={() => navigate(-1)}
              >
                Continuar comprando
              </button>

              {/* Garantías */}
              <ul className="resumen-garantias">
                {GARANTIAS.map((g) => (
                  <li key={g.text} className="resumen-garantia-item">
                    <span className="resumen-garantia-icon">{g.icon}</span>
                    <span>{g.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Carrito;
