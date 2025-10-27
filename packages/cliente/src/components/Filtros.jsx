import "./Filtros.css";
import { useState } from "react";

const Filtro = () => {

    const [filtros, setFiltros] = useState({
		categoria: "",
		precioMin: "",
		precioMax: "",
		orden: "asc",
	});

  return (
    <div>
      <aside className="filtros">
        <h3>Filtros</h3>
        <div className="filtro-grupo">
          <label>
            <input type="checkbox" /> 
          </label>
          <label>
            <input type="checkbox" /> Más vendidos
          </label>
        </div>
        <div className="filtro-grupo">
          <h4>Precio</h4>
          <input type="range" min="0" max="200000" />
        </div>
      </aside>
    </div>
  );
};
export default Filtro;
