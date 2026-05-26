import "./card.css";
import { useCarrito } from "../../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const CardProducto = ({ producto }) => {
  const { agregarCarrito } = useCarrito();
  const navegar = useNavigate();

  const verDetalle = () => {
    navegar(`/productos/${producto._id || producto.id}`);
  };

  const tienePocoStock = producto?.stock > 0 && producto?.stock <= 3;

  return (
    <div className="card" onClick={verDetalle} style={{ cursor: "pointer" }}>
      {tienePocoStock && <div className="badge">¡ÚLTIMOS {producto.stock}!</div>}
      {!producto?.stock || producto.stock <= 0 ? (
        <div className="badge badge--exhausted">SIN STOCK</div>
      ) : null}
      
      <div className="tilt">
        <div className="img">
          <img
            src={
              producto?.fotos?.[0] || 
              "https://images.unsplash.com/photo-1544237526-cae15a57ed1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDkwNDY5NjB8&ixlib=rb-4.1.0&q=85"
            }
            alt={producto?.titulo || "Producto"}
          />
        </div>
        <div className="info">
          <h2 className="title">{producto?.titulo || "Producto sin título"}</h2>
          <p className="desc">
            {producto?.descripcion || "Sin descripción detallada por el momento."}
          </p>
          
          {Array.isArray(producto?.categorias) && producto.categorias.length > 0 && (
            <div className="feats">
              {producto.categorias.map((cat) => (
                <span key={cat._id || cat.id || cat} className="feat">
                  {cat.nombre || cat}
                </span>
              ))}
            </div>
          )}
          
          <div className="bottom">
            <div className="price">
              <span className="new">${producto?.precio || "0"}</span>
            </div>
            <button
              className="btn"
              aria-label={`Agregar ${producto?.titulo || "producto"} al carrito`}
              onClick={(e) => {
                e.stopPropagation();
                agregarCarrito(producto);
              }}
              disabled={!producto?.stock || producto.stock <= 0}
            >
              {producto?.stock > 0 ? "Agregar al carrito" : "Sin stock"}
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
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" style={{ opacity: 0.3 }} />
              <span className="rcount">4.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
