import "./Filtros.css";
import { useEffect, useState } from "react";
import { useFiltro } from "../../context/FiltroContext.jsx";

const Filtro = ({ categorias = [] }) => {
  const { state, dispatch } = useFiltro();
  const { selectedCategorias, precio, orden } = state;

  //cambio en local
  const [minLocal, setMinLocal] = useState(precio?.min ?? "");
  const [maxLocal, setMaxLocal] = useState(precio?.max ?? "");

  //si el precio global cambia desde afuera, sincronizo
  useEffect(() => {
    setMinLocal(precio?.min ?? "");
    setMaxLocal(precio?.max ?? "");
  }, [precio?.min, precio?.max]);

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
                onChange={() =>
                  dispatch({ type: "TOGGLE_CATEGORIA", payload: c.id })
                }
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
                value={minLocal}
                onChange={(e) => {
                  const val = e.target.value;
                  setMinLocal(val);
                }}
              />
            </label>
            <label>
              Máximo:
              <input
                type="number"
                name="precioMax"
                value={maxLocal}
                onChange={(e) => {
                  const val = e.target.value;
                  setMaxLocal(val);
                }}
              />
            </label>
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
              Aplicar rango de precio
            </button>
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
                  dispatch({ type: "SET_ORDEN", payload: "" });
                } else {
                  dispatch({ type: "SET_ORDEN", payload: "masVendido" });
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
                  dispatch({ type: "SET_ORDEN", payload: "" });
                } else {
                  dispatch({ type: "SET_ORDEN", payload: "precio_asc" });
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
                  dispatch({ type: "SET_ORDEN", payload: "" });
                } else {
                  dispatch({ type: "SET_ORDEN", payload: "precio_desc" });
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
