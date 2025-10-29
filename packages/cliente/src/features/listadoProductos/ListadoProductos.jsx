import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import ModalCarrito from "../../components/navbar/modal-carrito.jsx";
import "./ListadoProductos.css";
import { useCarrito } from "../../context/CarritoContext.jsx";
import Body2 from "../../components/Body2.jsx";
import {
  getProducto,
  getProductos,
  getCategorias,
} from "../../services/productService.js";
import BarraBusqueda from "../../components/BarraBusqueda.jsx";
import Paginacion from "../../components/paginacion/paginacion.jsx";
import { useFiltro, FiltroProvider } from "../../context/FiltroContext.jsx";

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(3);
  //const [vendedor,setVendedor]=useState('68f132ae7f31069b1cb49254');

  const { selectedCategorias, orden, precio, masVendido, busqueda } =
    useFiltro();


  const cargarProductos = async (page) => {
    const numeroPagina = page ?? 1;
    const productosObtenidos = await getProductos(
      numeroPagina,
      selectedCategorias,
      orden,
      precio,
      masVendido,
      busqueda
    );
    setProductos(productosObtenidos.data);
    setProductosFiltrados(productosObtenidos.data);
    if (typeof productosObtenidos.totalPaginas === "number") {
      setTotalPaginas(productosObtenidos.totalPaginas);
    }
    setCurrentPage(productosObtenidos.page ?? numeroPagina);
  };

  const cargarCategorias = async () => {
    const categoriasObtenidas = await getCategorias();
    // El backend puede responder { data: [...] } o directamente [...]
    const raw = Array.isArray(categoriasObtenidas?.data)
      ? categoriasObtenidas.data
      : categoriasObtenidas;
    // Normalizar _id de Mongo a string estable
    const toIdString = (val) => {
      const base = val?._id ?? val?.id ?? val;
      if (base == null) return "";
      if (typeof base === "string" || typeof base === "number")
        return String(base);
      // Intentar formatos comunes { $oid: "..." }
      if (typeof base === "object") {
        if (typeof base.$oid === "string") return base.$oid;
        // Si tiene toHexString (ObjectId real)
        if (typeof base.toHexString === "function") return base.toHexString();
        const s = String(base);
        return s === "[object Object]" ? JSON.stringify(base) : s;
      }
      return String(base);
    };
    // Normalizar a { id, nombre }
    const cats = (Array.isArray(raw) ? raw : []).map((c) => ({
      id: toIdString(c),
      nombre: c?.nombre ?? String(c?.nombre ?? ""),
    }));
    setCategorias(cats);
  };

  useEffect(() => {
    cargarProductos(1);
    cargarCategorias();
  }, []);

  //Cuando cambian las categorías seleccionadas (o el vendedor), re-buscamos desde página 1
  useEffect(() => {
    cargarProductos(1);
	cargarCategorias();
  }, [selectedCategorias, orden, masVendido, busqueda,precio]);

  return (
    <>
      <div className="contenedor-productos">
        <Body2 productos={productos} categorias={categorias} />
      </div>
      {totalPaginas >= 1 && (
        <Paginacion
          currentPage={currentPage}
          totalPaginas={totalPaginas}
          onPageChange={(page) => cargarProductos(page)}
        />
      )}
    </>
  );
};

export default ListadoProductos;
