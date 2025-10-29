import "./Filtros.css";
import { useEffect, useState } from "react";
import { useFiltro } from "../context/FiltroContext.jsx";

const Filtro = ({ categorias = [] }) => {
  
  const { 
  selectedCategorias, 
  toggleCategoria,  
  precio, 
  setPrecioFiltro, 
  masVendido, 
  toggleMasVendido, 
  orden, 
  setOrdenFiltro 
} = useFiltro();





  return (
    <div className="filtro-componente">
      <aside className="categorias">
        <h3>Categorías</h3>
        <div className="filtro-grupo">
          {categorias.map((c) => (
            <label key={c.id} className="check-input">
              <input
                type="checkbox"
                value={String(c.id)}
                checked={selectedCategorias.includes(String(c.id))}
                onChange={() => toggleCategoria(c.id)}
              />{" "}
              {c.nombre}
            </label>
          ))}
        
        {/* Rango de Precio */}
        <div className="filtro-grupo">
          <h3>Precio</h3>
          <label>
            Mínimo:
            <input
              type="number"
              name="precioMin"
              onChange={(e) => {
                const val = e.target.value;
                setPrecioFiltro(val, precio.max);
              }}
            />
          </label>
          <label>
            Máximo:
            <input
              type="number"
              name="precioMax"
              placeholder="1000"
               onChange={(e) => {
                const val = e.target.value;
                setPrecioFiltro(precio.min, val);
              }}
            />
          </label>
        </div>
        </div>
        {/* Ordenamiento */}
        <div className="filtro-grupo">
          <h3>Ordenar por</h3>
		<label className="check-input">
            <input
            type="radio"
              name="orden-precio"
              checked={orden === "masVendido"}
              onClick={(e) => {
                // Permitir desmarcar si ya está seleccionado
                if (orden === "masVendido") {
                  e.preventDefault();
                  setOrdenFiltro("");
                } else {
                  setOrdenFiltro("masVendido");
                }
              }}
            />
            Más Vendido
          </label>
          <label className="check-input">
            <input
              type="radio"
              name="orden-precio"
              checked={orden === "precio_asc"}
              onClick={(e) => {
                // Permitir desmarcar si ya está seleccionado
                if (orden === "precio_asc") {
                  e.preventDefault();
                  setOrdenFiltro("");
                } else {
                  setOrdenFiltro("precio_asc");
                }
              }}
            />
            Precio ascendente
          </label>
          <label className="check-input">
            <input
              type="radio"
              name="orden-precio"
              checked={orden === "precio_desc"}
              onClick={(e) => {
                if (orden === "precio_desc") {
                  e.preventDefault();
                  setOrdenFiltro("");
                } else {
                  setOrdenFiltro("precio_desc");
                }
              }}
            />
            Precio descendente
          </label>
        </div>

        
      </aside>
    </div>
  );
};
export default Filtro;
