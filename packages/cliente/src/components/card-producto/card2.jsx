import "./card2.css";
import { useCarrito } from "../../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";

const Card2 = ({ producto }) => {
  const { agregarCarrito } = useCarrito();
  const navegar = useNavigate();

  return (
    <div className="product-card-horizontal">
      <img
        src={`/images/${producto.fotos[0]}`}
        alt={producto.titulo}
        className="product-img"
      />

      <div className="product-info">
        <div className="product-header">
          <div className="product-title">{producto.titulo}</div>
          <div className="stock">En Stock</div>
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
            onClick={() => agregarCarrito(producto)}
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
      </div>
    </div>
  );
};

export default Card2;
