import "./App.css";
import ListadoProductos from "./features/listadoProductos/ListadoProductos.jsx";
import { Routes, Route } from "react-router-dom";
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
import EditarUsuarioForm from "./components/editar-usuario-form/EditarUsuarioForm.jsx";
import Home from "./features/home/Home.jsx";
import PedidosCliente from "./components/pedido/PedidosCliente.jsx";
import PedidoVendedor from "./components/pedido/PedidoVendedor.jsx";

function App() {
  const [carrito, setCarrito] = useState([]);
  const actualizarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };



  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  return (
    <>
      <Toaster position="bottom-center" containerStyle={{ bottom: 70 }} />
      <Routes>
        {/* Ruta principal - Home */}
        <Route index element={<Home />} />
        
        {/*Rutas envueltas por el Layout */}
        <Route element={<Layout />}>
          <Route path="productos" element={<ListadoProductos />} />
          <Route path="tienda/:idTienda/productos" element={<ListadoProductos />} />
          <Route path="clientes/:id/pedidos" element={<PedidosCliente />}/>
          <Route path="ventas/:idTienda" element={<PedidoVendedor/>}/>
		<Route path="/crear-tienda" element={<EditarUsuarioForm objetivo="crear-tienda" campos={{ nombre: false, telefono: true, descripcion: true, direccion:true }} />} />
		<Route path="/direccion" element={<EditarUsuarioForm objetivo="comprar" campos={{ nombre: false, telefono: false, descripcion: false, direccion:true}} />} />
          <Route
            path="productos/:id"
            element={<ProductoDetailPage />}
          />
        </Route>

        {/* Rutas sin Layout para evitar contenido extra arriba*/}
        <Route path="notificaciones" element={<ListaNotificaciones />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={`/tienda/:idTienda`} element={<Tienda />} />

        <Route path="/carrito" element={<Carrito />} />
        <Route path="/nuevoProducto" element={<NuevoProducto />} />
      </Routes>
    </>
  );}

export default App;
