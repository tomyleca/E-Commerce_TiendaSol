import { productos } from '../../mockData/Productos'
import { useParams } from 'react-router'
import "./ProductoDetailPage.css"

const ProductoDetailPage = () => {
    const { id } = useParams();
    const producto = productos.find(h => h.id === parseInt(id));

    if (!producto) {
        return (
            <div className="producto-detail-container">
                <div className="producto-header">
                    <h1>Producto no encontrado</h1>
                    <p>Lo sentimos, no pudimos encontrar el producto que buscas.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="producto-detail-container">
            <div className="producto-header">
                <h1 className="producto-nombre">{producto.titulo}</h1>
            </div>

            <div className="producto-content">
                <div className="producto-image-section">
                    <img
                        src={producto.imagen}
                        alt={producto.titulo}
                        className="producto-imagen"
                    />
                </div>

                <div className="producto-info-section">
                    <div className="producto-description">
                        {producto.descripcion}
                    </div>

                    <div className="producto-price-section">
                        <div className="producto-precio">$ {producto.precio?.toLocaleString()}</div>
                    </div>

                </div>
            </div>

            <div className="producto-container">
                <button className="comprar">Comprar</button>
            </div>
        </div>
    );
}

export default ProductoDetailPage
