import React, { useState } from "react";
import "./BodyProductos.css";
import CardProducto from "./card-producto/card";

const BodyProductos = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  return (
    <>
      {/* Botón para móviles */}
      <button
        className="btn-filtros"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
      >
        Filtrar
      </button>

      {/* Contenedor principal */}
      <div className={`home-body ${mostrarFiltros ? "mostrar-filtros" : ""}`}>
        {/* Panel lateral de filtros */}
        <div className="filtros">
          <h3>Filtros</h3>
          <div className="filtro">
            <label>Categoría</label>
            <select>
              <option>Todos</option>
              <option>Ropa</option>
              <option>Accesorios</option>
            </select>
          </div>
          <div className="filtro">
            <label>Precio</label>
            <input type="range" min="0" max="100" />
          </div>
        </div>

        {/* Contenedor de productos */}
        <div className="contenedor-productos">
          <CardProducto />
          <CardProducto />
          <CardProducto />
          <CardProducto />
        </div>
      </div>
    </>
  );
};

export default BodyProductos;
