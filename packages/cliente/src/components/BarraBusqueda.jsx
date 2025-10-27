import React from "react";
import "./BarraBusqueda.css";
import { TextField } from "@mui/material";
import { useState } from "react";

const BarraBusqueda = ({fltrarProductos}) => {
  const [busqueda, setBusqueda] = useState("");
  return (
    <div className="barra-busqueda">

      <TextField
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => {setBusqueda(e.target.value)}}
      />
  

    </div>
  );
};

export default BarraBusqueda;
