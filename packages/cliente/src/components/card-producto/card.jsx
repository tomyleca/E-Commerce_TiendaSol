import "./card.css";
import { useCarrito } from "../../context/CarritoContext.jsx";

const CardProducto = ({ producto }) => {
  const { agregarCarrito } = useCarrito();

  return (
    <div className="card">
      <div className="badge">HOT SALE</div>
      <div className="tilt">
        <div className="img">
          <img
            src={producto?.fotos?.[0] ? `/images/${producto.fotos[0]}` : "https://images.unsplash.com/photo-1544237526-cae15a57ed1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDkwNDY5NjB8&ixlib=rb-4.1.0&q=85"}
            alt={producto?.titulo || "Premium Laptop"}
          />
        </div>
        <div className="info">

		<h2 className="title">{producto?.titulo || "UltraBook Pro X"}</h2>
          <p className="desc">
            {producto?.descripcion || "Cutting-edge performance with Intel Core i9, 32GB RAM, and a 1TB SSD in a sleek, lightweight design."}
          </p>
          <div className="feats">
            {producto?.categorias.map((cat) => (
              <span key={cat.id} className="feat">{cat.nombre}</span>
            ))}
          </div>
          <div className="bottom">
            <div className="price">
              <span className="old">${producto?.precioAnterior || producto?.precio}</span>
              <span className="new">${producto?.precio || "1,999"}</span>
            </div>
            <button
              className="btn"
              aria-label={`Agregar ${producto?.nombre || "producto"} al carrito`}
              onClick={() =>
                agregarCarrito(producto)
              }
            >
              Agregar al carrito
              <svg
                className="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>
          </div>
          <div className="meta">
            <div className="rating">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="0.5"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="0.5"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="0.5"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="0.5"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="0.5"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="rcount">245 Reviews</span>
            </div>
            <div className="stock">In Stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
