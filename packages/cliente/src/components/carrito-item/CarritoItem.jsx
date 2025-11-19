import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCarrito } from "../../context/CarritoContext.jsx";
import "./CarritoItem.css";

const CarritoItem = ({ item }) => {
  const { agregarCarrito, quitarCarrito } = useCarrito();

  return (
    <div className="carrito-item">
      <div className="item-imagen">
        <img
          src={
            item.fotos?.[0] ||
            "https://images.unsplash.com/photo-1544237526-cae15a57ed1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDkwNDY5NjB8&ixlib=rb-4.1.0&q=85"
          }
          alt={item.title || item.nombre}
        />
      </div>
      <div className="item-detalles">
        <h3>{item.title || item.nombre}</h3>
        <p className="item-descripcion">
          {item.descripcion || "Producto de calidad premium"}
        </p>
        <p className="item-precio-unitario">
          Precio unitario: ${item.price?.toLocaleString("es-AR") || "0"}
        </p>
      </div>
      <div className="item-controles">
        <div className="cantidad-control">
          <button
            className="btn-cantidad"
            onClick={() => {
              if (item.qty > 1) {
                agregarCarrito(item, -1);
              } else {
                quitarCarrito(item.id);
              }
            }}
            aria-label="Disminuir cantidad"
          >
            -
          </button>
          <span className="cantidad">{item.qty}</span>
          <button
            className="btn-cantidad"
            onClick={() => agregarCarrito(item, 1)}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <div className="item-precio-total">
          <span className="precio-label">Subtotal:</span>
          <span className="precio-valor">
            ${((item.price || 0) * item.qty).toLocaleString("es-AR")}
          </span>
        </div>
        <button
          className="btn-eliminar"
          onClick={() => quitarCarrito(item.id)}
          aria-label="Eliminar producto"
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
};

export default CarritoItem;
