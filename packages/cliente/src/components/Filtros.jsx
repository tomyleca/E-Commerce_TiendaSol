import "./Filtros.css";
import { useState } from "react";
import { useFiltro } from "../context/FiltroContext.jsx";

const Filtro = ({ categorias = [] }) => {
  //agregarmas vendido
  const { selectedCategorias, toggleCategoria, clearCategorias } = useFiltro();

  const [filtros, setFiltros] = useState({
    categoria: "",
    precioMin: "",
    precioMax: "",
    orden: "asc",
  });

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
            />
          </label>
          <label>
            Máximo:
            <input
              type="number"
              name="precioMax"
              placeholder="1000"
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
            //onChange={()=>agregarMasVendido()}
            />
            Mas Vendidos
          </label>
        </div>

        {/* Ordenamiento */}
        <div className="filtro-grupo">
          <h3>Ordenamiento</h3>
          <label className="check-input">
            <input type="checkbox" />
            Precio ascendente
          </label>
          <label className="check-input">
            <input type="checkbox" />
            Precio descendente
          </label>
        </div>

        
      </aside>
    </div>
  );
};
export default Filtro;
