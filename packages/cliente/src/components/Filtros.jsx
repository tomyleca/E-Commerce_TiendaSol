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
                setPrecioFiltro(val, precio.min);
              }}
            />
          </label>
        </div>
        </div>
        {/* Más Vendidos */}
        <div className="filtro-grupo">
          <h3>Más Vendidos</h3>
          <label className="check-input">
            <input
              type="checkbox"
              onChange={() => toggleMasVendido()}
            />
            Mas Vendidos
          </label>
        </div>

        {/* Ordenamiento */}
        <div className="filtro-grupo">
          <h3>Ordenamiento</h3>
          <label className="check-input">
            <input
              type="checkbox"
              //checked={orden === "asc"}
              onChange={() => setOrdenFiltro("precio_asc")}
            />
            Precio ascendente
          </label>
          <label className="check-input">
            <input
              type="checkbox"
              //checked={orden === "desc"}
              onChange={() => setOrdenFiltro("desc")}
            />
            Precio descendente
          </label>
        </div>

        
      </aside>
    </div>
  );
};
export default Filtro;
