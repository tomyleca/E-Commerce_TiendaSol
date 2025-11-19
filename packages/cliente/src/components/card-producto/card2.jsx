import "./card2.css";
import { useCarrito } from "../../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";

const Card2 = ({ producto }) => {
  const { agregarCarrito } = useCarrito();
  const navegar = useNavigate();

  const verDetalle = () => {
    navegar(`/productos/${producto._id || producto.id}`);
  };

  return (
    <div className="product-card-horizontal" onClick={verDetalle} style={{ cursor: "pointer" }}>
      <img
        src={producto.fotos && producto.fotos[0] ? producto.fotos[0] : "https://images.unsplash.com/photo-1544237526-cae15a57ed1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDkwNDY5NjB8&ixlib=rb-4.1.0&q=85"}
        alt={producto.titulo}
        className="product-img"
      />

      <div className="product-info">
        <div className="product-header">
          <div className="product-title">{producto.titulo}</div>
          {producto.stock > 0 && <div className="stock">En Stock</div>}
		   {producto.stock <= 0 && <div className="sin-stock">Sin Stock</div>}
        </div>
        {Array.isArray(producto.categorias) &&
          producto.categorias.length > 0 && (
            <div className="categorias-card">
              {producto.categorias.map((cat) => (
                <span
                  key={cat?._id ?? cat?.id ?? cat?.nombre ?? String(cat)}
                  className="categoria"
                >
                  {cat?.nombre ?? String(cat)}
                </span>
              ))}
            </div>
          )}
        <div className="product-footer">
          <div className="product-price">${producto.precio}</div>

          <button
            className="btn"
            aria-label={`Agregar ${producto.titulo} al carrito`}
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
      </div>
    </div>
  );
};

export default Card2;
