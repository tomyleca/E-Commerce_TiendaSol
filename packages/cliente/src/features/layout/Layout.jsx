import React from "react";
import Navbar from "../../components/navbar/navbar";
import BarraBusqueda from "../../components/producto/BarraBusqueda";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = ({ filtrarProductos }) => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default Layout;
