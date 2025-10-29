import React, { useContext, useState } from "react";
import "./BarraBusqueda.css";
import { TextField, Button } from "@mui/material";
import { useFiltro } from "../context/FiltroContext";


const BarraBusqueda = ({ fltrarProductos, filtrarProductos }) => {
  const { busqueda, setBusquedaFiltro, categorias, precio, masVendido, orden } = useFiltro();
  const onFilter = fltrarProductos ?? filtrarProductos ?? (() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(busqueda,categorias,precio,masVendido,orden);
  };

  return (
    <form className="barra-busqueda" onSubmit={handleSubmit}>
      <TextField
        size="small"
        fullWidth
        label="Buscar productos"
        placeholder="Nombre, descripción, categoría..."
        value={busqueda}
        onChange={(e) => {
          const val = e.target.value;
          setBusquedaFiltro(val);
          onFilter(val);
        }}
      />
      <Button type="submit" variant="contained" className="btn-buscar">
        Buscar
      </Button>
    </form>
  );
};

export default BarraBusqueda;
