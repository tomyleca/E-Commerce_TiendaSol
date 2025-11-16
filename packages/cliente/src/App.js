import "./App.css";
import ListadoProductos from "./features/listadoProductos/ListadoProductos.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./features/layout/Layout.jsx";
import Login from "./features/login/Login.jsx";
import Register from "./features/register/Register.jsx";
import ProductoDetailPage from "./features/producto/ProductoDetailPage.jsx";
import { useState } from "react";
import ListaNotificaciones from "./features/notificaciones/ListaNotificaciones.jsx";
import { Toaster } from "react-hot-toast";
import Tienda from "./features/tienda/Tienda.jsx";
import Carrito from "./features/carrito/Carrito.jsx";
import NuevoProducto from "./features/nuevoProducto/NuevoProducto.jsx";
import CrearTienda from "./features/crear-tienda/CrearTienda.jsx";

function App() {
  const [carrito, setCarrito] = useState([]);
  const actualizarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };



  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  return (

    <BrowserRouter>
      <Toaster position="bottom-center" containerStyle={{ bottom: 70 }} />
      <Routes>
        {/*Rutas envueltas por el Layout */}
        <Route element={<Layout />}>
          <Route index element={<ListadoProductos />} />
          <Route path="productos" element={<ListadoProductos />} />
          <Route path="tienda/:idTienda/productos" element={<ListadoProductos />} />
          <Route
            path="productos/:id"
            element={
              <ProductoDetailPage
                carrito={carrito}
                actualizarCarrito={actualizarCarrito}
              />
            }
          />
        </Route>

        {/* Rutas sin Layout para evitar contenido extra arriba*/}
        <Route path="notificaciones" element={<ListaNotificaciones />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={`/tienda/:idTienda`} element={<Tienda />} />
        <Route path="/crear-tienda" element={<CrearTienda />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/nuevoProducto" element={<NuevoProducto />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
