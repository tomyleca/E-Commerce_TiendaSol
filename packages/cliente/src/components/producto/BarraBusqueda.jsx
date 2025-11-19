import React, { useState } from "react";
import "./BarraBusqueda.css";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useFiltro } from "../../context/FiltroContext";
import { useNavigate } from "react-router-dom";

const BarraBusqueda = () => {
  const { state, dispatch } = useFiltro();
  const { busqueda } = state;
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Siempre navegar a /productos (sin vendedor específico)
    navigate('/productos');
  };

  const handleSearchClick = () => {
    // Al hacer clic en el icono de búsqueda, navegar a /productos
    navigate('/productos');
  };

  const handleClear = () => {
    dispatch({ type: "SET_BUSQUEDA", payload: "" });
  };

  const handleChange = (e) => {
    const val = e.target.value;
    dispatch({ type: "SET_BUSQUEDA", payload: val });
  };

  return (
    <form
      className={`barra-busqueda ${isFocused ? "focused" : ""}`}
      onSubmit={handleSubmit}
      aria-label="Barra de búsqueda de productos"
    >
      <IconButton
        className="search-icon-wrapper"
        onClick={handleSearchClick}
        type="button"
        aria-label="buscar"
      >
        <SearchIcon fontSize="medium" />
      </IconButton>
      
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
