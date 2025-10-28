import './card2.css';
import { useCarrito } from '../../context/CarritoContext.jsx';

const Card2 = ({ producto }) => {
  const { agregarCarrito } = useCarrito();

  return (
    <div className="product-card-horizontal">
      <img src={producto.imagen} alt={producto.titulo} className="product-img" />

      <div className="product-info">
        <div className="product-title">{producto.titulo}</div>
        <div className="product-price">${producto.precio}</div>

        <button
          className="btn-carrito"
          onClick={() => agregarCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Card2;
