import "./Filtros.css";
import { useState } from "react";
import { useFiltro } from "../context/FiltroContext.jsx";

const Filtro = ({ categorias = [] }) => {

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
            <label key={c.id} className="check-categoria">
              <input
                type="checkbox"
                value={String(c.id)}
                checked={selectedCategorias.includes(String(c.id))}
                onChange={() => toggleCategoria(c.id)}
              />{" "}
              {c.nombre}
            </label>
          ))}
        </div>
      </aside>
    </div>
  );
};
export default Filtro;
