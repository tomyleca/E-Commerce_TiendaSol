import "./Filtros.css";
import { useEffect, useState } from "react";
import { useFiltro } from "../../context/FiltroContext.jsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const Filtro = ({ categorias = [] }) => {
  const { state, dispatch } = useFiltro();
  const { selectedCategorias, precio } = state;

  const [minLocal, setMinLocal] = useState(precio?.min ?? "");
  const [maxLocal, setMaxLocal] = useState(precio?.max ?? "");

  // Acordeones colapsables
  const [categoriasOpen, setCategoriasOpen] = useState(true);
  const [precioOpen, setPrecioOpen] = useState(true);

  // Sincronizar precio si cambia externamente
  useEffect(() => {
    setMinLocal(precio?.min ?? "");
    setMaxLocal(precio?.max ?? "");
  }, [precio?.min, precio?.max]);

  const limpiarTodosLosFiltros = () => {
    dispatch({ type: "RESET_FILTROS" });
    setMinLocal("");
    setMaxLocal("");
  };

  const tieneFiltrosActivos = selectedCategorias.length > 0 || precio?.min !== "" || precio?.max !== "";

  return (
    <div className="filtro-componente">
      <div className="filtro-header-main">
        <h3>Filtros</h3>
        {tieneFiltrosActivos && (
          <button 
            className="btn-limpiar-filtros"
            onClick={limpiarTodosLosFiltros}
            title="Limpiar todos los filtros"
          >
            <FilterAltOffIcon fontSize="inherit" />
            Limpiar
          </button>
        )}
      </div>

      <aside className="categorias">
        {/* Acordeón Categorías */}
        <div className={`filtro-grupo-acordeon ${categoriasOpen ? 'is-open' : ''}`}>
          <div 
            className="filtro-grupo-header" 
            onClick={() => setCategoriasOpen(!categoriasOpen)}
          >
            <h4>Categorías</h4>
            {categoriasOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </div>
          
          {categoriasOpen && (
            <div className="filtro-grupo-content">
              {categorias.map((c) => (
                <label key={c.id} className="check-input">
                  <input
                    type="checkbox"
                    value={String(c.id)}
                    checked={selectedCategorias.includes(String(c.id))}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_CATEGORIA", payload: c.id })
                    }
                  />
                  <span>{c.nombre}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Acordeón Precio */}
        <div className={`filtro-grupo-acordeon ${precioOpen ? 'is-open' : ''}`}>
          <div 
            className="filtro-grupo-header" 
            onClick={() => setPrecioOpen(!precioOpen)}
          >
            <h4>Precio</h4>
            {precioOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </div>
          
          {precioOpen && (
            <div className="filtro-grupo-content">
              <div className="rango-precio-inputs">
                <div className="precio-input-wrap">
                  <span className="precio-currency">$</span>
                  <input
                    type="number"
                    placeholder="Mínimo"
                    value={minLocal}
                    onChange={(e) => setMinLocal(e.target.value)}
                  />
                </div>
                <div className="precio-input-wrap">
                  <span className="precio-currency">$</span>
                  <input
                    type="number"
                    placeholder="Máximo"
                    value={maxLocal}
                    onChange={(e) => setMaxLocal(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn-filtros"
                type="button"
                onClick={() =>
                  dispatch({
                    type: "SET_PRECIO",
                    payload: { min: minLocal, max: maxLocal },
                  })
                }
                aria-label="Aplicar filtro de precio"
              >
                Aplicar Rango
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Filtro;
