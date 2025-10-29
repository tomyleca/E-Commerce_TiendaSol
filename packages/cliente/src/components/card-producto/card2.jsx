import './card2.css';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { useNavigate } from 'react-router-dom';

const Card2 = ({ producto }) => {
  const { agregarCarrito } = useCarrito();
  const navegar = useNavigate();

  return (
    <div className="product-card-horizontal">
      <img src={`images/${producto.fotos[0]}`} alt={producto.titulo} className="product-img" />

      <div className="product-info">
		<div className="product-header">
			<div className="product-title">{producto.titulo}</div>
			<div className="stock">En Stock</div>
		</div>
		{Array.isArray(producto.categorias) && producto.categorias.length > 0 && (
          <ul className="categorias">
            {producto.categorias.map((cat) => (
              <li
                key={cat?._id ?? cat?.id ?? cat?.nombre ?? String(cat)}
                className="categoria"
              >
                {cat?.nombre ?? String(cat)}
              </li>
            ))}
          </ul>
        )}
        <div className="product-price">${producto.precio}</div>

        <button
          className="btn-carrito"
          onClick={() => navegar(`/producto/${producto.id}`)}
        >
          Ver producto
        </button>
      </div>
    </div>
  );
};

export default Card2;
