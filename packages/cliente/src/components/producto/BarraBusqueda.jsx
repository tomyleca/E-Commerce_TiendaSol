import React from "react";
import "./BarraBusqueda.css";
import { TextField, Button } from "@mui/material";
import { useFiltro } from "../../context/FiltroContext";

const BarraBusqueda = ({ fltrarProductos, filtrarProductos }) => {
  const { state, dispatch } = useFiltro();
  const { busqueda, selectedCategorias, precio, orden } = state;
  const categorias = selectedCategorias;
  const onFilter = fltrarProductos ?? filtrarProductos ?? (() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(busqueda, categorias, precio, undefined, orden);
  };

  return (
    <form
      className="barra-busqueda"
      onSubmit={handleSubmit}
      aria-label="Barra de búsqueda de productos"
    >
      <TextField
        size="small"
        fullWidth
        label="Buscar productos"
        placeholder="Nombre..."
        value={busqueda}
        onChange={(e) => {
          const val = e.target.value;
          dispatch({ type: "SET_BUSQUEDA", payload: val });
          onFilter(val, categorias, precio, undefined, orden);
        }}
      />
    </form>
  );
};

export default BarraBusqueda;
