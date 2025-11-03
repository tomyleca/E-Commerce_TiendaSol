import { createContext, useContext, useMemo, useReducer } from "react";

const FiltroContext = createContext(undefined);

//Normaliza un valor de categoría (objeto Mongo, número o string) a string de id
const normalizeId = (val) => {
  if (val && typeof val === "object") {
    const maybe = val._id ?? val.id ?? undefined;
    return maybe !== undefined ? String(maybe) : "";
  }
  return val != null ? String(val) : "";
};

export const FiltroProvider = ({ children, initialCategorias = [] }) => {
  //Reducer y estado inicial
  const initialState = {
    precio: { min: "", max: "" },
    orden: "",
    busqueda: "",
    selectedCategorias: (initialCategorias || []).map((x) => normalizeId(x)),
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PRECIO": {
        const { min, max } = action.payload || {};
		//los ... hacen que copie el objeto anterior y, luego, solo modifico el precio
        return { ...state, precio: { min, max } };
      }
      case "SET_ORDEN": {
        return { ...state, orden: action.payload ?? "" };
      }
      case "SET_BUSQUEDA": {
        return { ...state, busqueda: action.payload ?? "" };
      }
      case "TOGGLE_CATEGORIA": {
        const s = normalizeId(action.payload);
        const has = state.selectedCategorias.includes(s);
        const next = has
          ? state.selectedCategorias.filter((x) => x !== s)
          : [...state.selectedCategorias, s];
        return { ...state, selectedCategorias: next };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Solo exponer { state, dispatch }
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <FiltroContext.Provider value={value}>{children}</FiltroContext.Provider>
  );
};

export const useFiltro = () => {
  const ctx = useContext(FiltroContext);
  if (!ctx) throw new Error("useFiltro debe usarse dentro de FiltroProvider");
  return ctx;
};

export default FiltroContext;
