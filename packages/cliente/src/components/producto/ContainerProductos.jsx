import Card2 from "../card-producto/card2.jsx";
import "./ContainerProductos.css";
import Filtros from "./Filtros.jsx";
import { useState } from "react";
import BarraBusqueda from "./BarraBusqueda.jsx";

const Body2 = ({ productos, categorias }) => {


  return (
    <div className="productos-layout">
      <section className="filtros" aria-label="Filtros de productos">
        <Filtros categorias={categorias} />
      </section>
	

      <section className="productos" aria-label="Listado de productos">
		 {(!productos || productos.length === 0) &&
    	<div className="no-products">No hay productos disponibles.</div>
  		}
  		{productos.map((p) => (
          <Card2 key={p.id} producto={p} />
        ))}
      </section>
    </div>
  );
};

export default Body2;
