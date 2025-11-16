import React from "react";
import "./CrearTienda.css";
import Navbar from "../../components/navbar/navbar.jsx";
import CrearTiendaForm from "../../components/crear-tienda-form/CrearTiendaForm.jsx";

const CrearTienda = () => {
  return (
    <>
      <Navbar minimalist />
      <div className="crear-tienda-page">
        <CrearTiendaForm />
      </div>
    </>
  );
};

export default CrearTienda;
