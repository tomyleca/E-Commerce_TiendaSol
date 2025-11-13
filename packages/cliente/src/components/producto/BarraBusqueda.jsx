import React, { useState } from "react";
import "./BarraBusqueda.css";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useFiltro } from "../../context/FiltroContext";

const BarraBusqueda = ({ fltrarProductos, filtrarProductos }) => {
  const { state, dispatch } = useFiltro();
  const { busqueda, selectedCategorias, precio, orden } = state;
  const categorias = selectedCategorias;
  const onFilter = fltrarProductos ?? filtrarProductos ?? (() => {});
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(busqueda, categorias, precio, undefined, orden);
  };

  const handleClear = () => {
    dispatch({ type: "SET_BUSQUEDA", payload: "" });
    onFilter("", categorias, precio, undefined, orden);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    dispatch({ type: "SET_BUSQUEDA", payload: val });
    onFilter(val, categorias, precio, undefined, orden);
  };

  return (
    <form
      className={`barra-busqueda ${isFocused ? "focused" : ""}`}
      onSubmit={handleSubmit}
      aria-label="Barra de búsqueda de productos"
    >
      <div className="search-icon-wrapper">
        <SearchIcon fontSize="medium" />
      </div>
      
      <InputBase
        className="search-input"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputProps={{ 
          "aria-label": "buscar productos",
          autoComplete: "off"
        }}
      />

      {busqueda && (
        <IconButton
          className="clear-button"
          onClick={handleClear}
          size="small"
          aria-label="limpiar búsqueda"
          type="button"
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </form>
  );
};

export default BarraBusqueda;
