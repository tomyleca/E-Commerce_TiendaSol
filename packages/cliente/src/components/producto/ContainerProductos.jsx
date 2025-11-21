import Card2 from "../card-producto/card2.jsx";
import "./ContainerProductos.css";
import Filtros from "./Filtros.jsx";
import { useState } from "react";
import BarraBusqueda from "./BarraBusqueda.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Body2 = ({ productos, categorias,busquedaRealizada }) => {
  return (
    <div className="productos-layout">
      <section className="filtros" aria-label="Filtros de productos">
        <Filtros categorias={categorias} />
      </section>

      <section className="productos" aria-label="Listado de productos">
        {((!productos || productos.length === 0) && busquedaRealizada) && (
          <div className="no-products">No hay productos disponibles.</div>
        )}
		{(!busquedaRealizada) && (

        <CircularProgress style={{ marginTop: '300px' }} /> 

        )}
        {productos.map((p) => (
          <Card2 key={p.id} producto={p} />
        ))}
      </section>
    </div>
  );
};

export default Body2;
