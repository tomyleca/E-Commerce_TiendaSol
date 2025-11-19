import React from "react";
import "./CrearTienda.css";
import Navbar from "../../components/navbar/navbar.jsx";
import EditarUsuarioForm from "../../components/editar-usuario-form/EditarUsuarioForm.jsx";

const CrearTienda = () => {
  return (
    <>
      <Navbar minimalist />
      <div className="crear-tienda-page">
        <EditarUsuarioForm />
      </div>
    </>
  );
};

export default CrearTienda;
