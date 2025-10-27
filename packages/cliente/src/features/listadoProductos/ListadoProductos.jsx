import { useState } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import ModalCarrito from "../../components/navbar/modal-carrito.jsx";
import CardProducto from "../../components/card-producto/card.jsx";
import "./ListadoProductos.css";
import { useCarrito } from "../../context/CarritoContext.jsx";

const ListadoProductos = () => {
  return (
    <>
      <Navbar />
      <ModalCarrito />
      <div className="contenedor-productos">
        <CardProducto />
        <CardProducto />
        <CardProducto />
      </div>
    </>
  );
};

export default ListadoProductos;
