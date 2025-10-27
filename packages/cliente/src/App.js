import "./App.css";
import ListadoProductos from "./features/listadoProductos/ListadoProductos.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext.jsx";

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/productos" element={<ListadoProductos />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
