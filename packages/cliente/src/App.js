import "./App.css";
import ListadoProductos from "./features/listadoProductos/ListadoProductos.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import Login from "./features/login/Login.jsx";
import Register from "./features/register/Register.jsx";

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/productos" element={<ListadoProductos />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
