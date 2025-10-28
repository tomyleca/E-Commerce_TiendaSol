import "./App.css";
import ListadoProductos from "./features/listadoProductos/ListadoProductos.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import Login from "./features/login/Login.jsx";
import Register from "./features/register/Register.jsx";
import ProductoDetailPage from "./features/producto/ProductoDetailPage.jsx";
import { useState } from "react";
import { NotificationProvider } from "./context/NotificacionContext.jsx";

function App() {
  const [carrito, setCarrito] = useState([]);
  const actualizarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <CarritoProvider>
		<NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/productos" element={<ListadoProductos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/producto/:id" element={<ProductoDetailPage carrito={carrito}
            actualizarCarrito={actualizarCarrito} />}></Route>
        </Routes>
      </BrowserRouter>
	  </NotificationProvider>
    </CarritoProvider>
  );
}

export default App;
