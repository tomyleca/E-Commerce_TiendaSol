import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ButtonGroup, Button } from "@mui/material";
import BotonVolver from "../../components/boton-volver/BotonVolver.jsx";
import "./ProductoDetailPage.css";
import { getProductoById } from "../../services/productService";
import { useCarrito } from "../../context/CarritoContext.jsx";
import toast from "react-hot-toast";

const ProductoDetailPage = () => {
  const navegar = useNavigate();
  const { id } = useParams();
  const { agregarCarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await getProductoById(id);
        setProducto(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setError(
          err.response?.status === 404
            ? "Producto no encontrado"
            : "Error al cargar el producto",
        );
      }
    };
    cargarProducto();
  }, [id]);

  const [cantProductos, setCantProductos] = useState(1);
  useEffect(() => {
    setCantProductos(1);
  }, [id]);

  const incrementarProductos = () => {
    if (producto && cantProductos < producto.stock) {
      setCantProductos(cantProductos + 1);
    }
  };

  const decrementarProductos = () => {
    if (cantProductos > 1) {
      setCantProductos(cantProductos - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (!producto) return;

    if (cantProductos <= 0) {
      toast.error("Selecciona una cantidad válida");
      return;
    }

    if (cantProductos > producto.stock) {
      toast.error("No hay suficiente stock disponible");
      return;
    }

    agregarCarrito(producto, cantProductos);
    toast.success(
      `${cantProductos} ${producto.titulo} añadido${cantProductos > 1 ? "s" : ""} al carrito`,
    );
    setCantProductos(1);
  };

  if (error) {
    return (
      <div className="producto-detail-container">
        <BotonVolver />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>{error}</h2>
          <p>El producto que buscas no existe o fue eliminado.</p>
          <button className="btn" onClick={() => navegar("/productos")}>
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

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
          src={
            producto.fotos && producto.fotos[0]
              ? producto.fotos[0]
              : "https://images.unsplash.com/photo-1544237526-cae15a57ed1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDkwNDY5NjB8&ixlib=rb-4.1.0&q=85"
          }
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
                disabled={cantProductos === 1}
              >
                -
              </Button>
              <Button disabled>{cantProductos}</Button>
              <Button
                onClick={incrementarProductos}
                disabled={!producto.stock || cantProductos >= producto.stock}
              >
                +
              </Button>
            </ButtonGroup>
          </div>
          <button
            className="comprar"
            onClick={agregarAlCarrito}
            disabled={!producto.stock || producto.stock <= 0}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetailPage;
