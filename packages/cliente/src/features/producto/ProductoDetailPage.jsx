import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ButtonGroup, Button } from "@mui/material";
import BotonVolver from "../../components/boton-volver/BotonVolver.jsx";
import "./ProductoDetailPage.css";
import { getProductoById } from "../../services/productService";

const conProductos = (cantidadProductos, producto) => ({
  ...producto,
  cantidadProductos,
});
const ProductoDetailPage = ({ carrito, actualizarCarrito }) => {
  const navegar = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  useEffect(() => {
    const cargarProducto = async () => {
      const data = await getProductoById(id);
      setProducto(data);
    };
    cargarProducto();
  }, [id]);

  const [cantProductos, setCantProductos] = useState(0);
  useEffect(() => {
    setCantProductos(0);
  }, [id, carrito]);

  const incrementarProductos = () => {
    const nuevosProductos = cantProductos + 1;
    setCantProductos(nuevosProductos);
  };

  const decrementarProductos = () => {
    if (cantProductos > 0) {
      const nuevosProductos = cantProductos - 1;
      setCantProductos(nuevosProductos);
    }
  };

  const comprar = () => {
    actualizarCarrito(conProductos(cantProductos, producto));
    navegar("/productos");
  };

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
    <div className="producto-content">
      <BotonVolver>Volver</BotonVolver>
      <div className="producto-image-section">
        <img
          src={`/images/${producto.fotos[0]}`}
          alt={producto.titulo}
          className="producto-imagen"
        />
      </div>

      <div className="producto-info-section">
        <div className="producto-nombre">{producto.titulo}</div>
        <div className="producto-description">{producto.descripcion}</div>

        <div className="producto-price-section">
          <div className="producto-precio">
            $ {producto.precio?.toLocaleString()}
          </div>
        </div>

        <div className="comprar-container">
          <div className="boton-contador">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={decrementarProductos}
                disabled={cantProductos === 0}
              >
                -
              </Button>
              <Button disabled>{cantProductos}</Button>
              <Button onClick={incrementarProductos}>+</Button>
            </ButtonGroup>
          </div>
          <button className="comprar" onClick={comprar}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetailPage;
