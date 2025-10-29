import React, { useState } from "react";
import "./BarraBusqueda.css";
import { TextField, Button } from "@mui/material";


const BarraBusqueda = ({ fltrarProductos, filtrarProductos }) => {
  const [busqueda, setBusqueda] = useState("");
  const onFilter = fltrarProductos ?? filtrarProductos ?? (() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(busqueda);
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
          setBusqueda(val);
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
