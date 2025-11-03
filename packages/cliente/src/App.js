import "./App.css";
import ListadoProductos from "./features/listadoProductos/ListadoProductos.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import Layout from "./features/layout/Layout.jsx";
import Login from "./features/login/Login.jsx";
import Register from "./features/register/Register.jsx";
import ProductoDetailPage from "./features/producto/ProductoDetailPage.jsx";
import { useState } from "react";
import { NotificationProvider } from "./context/NotificacionContext.jsx";
import ListaNotificaciones from "./features/notificaciones/ListaNotificaciones.jsx";
import { FiltroProvider } from "./context/FiltroContext.jsx";
import Tienda from "./features/tienda/Tienda.jsx";

function App() {
  const [carrito, setCarrito] = useState([]);
  const actualizarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  return (
    <CarritoProvider>
      <NotificationProvider>
        <FiltroProvider>
          <BrowserRouter>
            <Routes>
              {/*Rutas envueltas por el Layout */}
              <Route element={<Layout />}>
                <Route index element={<ListadoProductos />} />
                <Route path="productos" element={<ListadoProductos />} />
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
              <Route path="/tienda/:id" element={<Tienda />} />
            </Routes>
          </BrowserRouter>
        </FiltroProvider>
      </NotificationProvider>
    </CarritoProvider>
  );
}

export default App;
