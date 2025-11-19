import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import ModalCarrito from "../../components/navbar/modal-carrito.jsx";
import "./ListadoProductos.css";
import { useCarrito } from "../../context/CarritoContext.jsx";
import Body2 from "../../components/producto/ContainerProductos.jsx";
import {
  getProducto,
  getProductos,
  getCategorias,
} from "../../services/productService.js";
import BarraBusqueda from "../../components/producto/BarraBusqueda.jsx";
import Paginacion from "../../components/paginacion/paginacion.jsx";
import { useFiltro, FiltroProvider } from "../../context/FiltroContext.jsx";
import { useParams } from "react-router-dom";

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  //vendedor harcodeado //TODO sacarlo
  const [vendedor, setVendedor] = useState(null);

  const { idTienda } = useParams();

  //Obtener filtros desde el contexto
  const { state } = useFiltro();
  const { selectedCategorias, orden, precio, busqueda } = state;

  const cargarProductos = async (page) => {
	// Solo usar vendedor si estamos en la ruta de una tienda específica
	const vendedorActual = idTienda || null;

    const numeroPagina = page ?? 1;
    const productosObtenidos = await getProductos(
      numeroPagina,
      selectedCategorias,
      orden,
      precio,
      busqueda,
	  vendedorActual
    );
    setProductos(productosObtenidos.data);
    setTotalPaginas(productosObtenidos.totalPaginas);

    if (typeof productosObtenidos.totalPaginas === "number") {
      setTotalPaginas(productosObtenidos.totalPaginas);
    }
    setCurrentPage(productosObtenidos.page ?? numeroPagina);
  };

  const cargarCategorias = async () => {
    const categoriasObtenidas = await getCategorias();
    const categoriasNormalizadas = categoriasObtenidas.map((c) => ({
      id: c._id,
      nombre: c.nombre,
    }));
    setCategorias(categoriasNormalizadas);
  };

  useEffect(() => {
    cargarProductos(1);
    cargarCategorias();
  }, []);

  //Cuando cambian las categorías seleccionadas (o el vendedor), re-buscamos desde página 1
  useEffect(() => {
    cargarProductos(1);
    cargarCategorias();
  }, [selectedCategorias, orden, busqueda, precio]);

  return (
    <>
      <div className="contenedor-productos">
        <Body2 productos={productos} categorias={categorias} />
      </div>
      {totalPaginas >= 1 && (
        <Paginacion
          key={`p-${totalPaginas}`}
          currentPage={currentPage}
          totalPaginas={totalPaginas}
          onPageChange={(page) => cargarProductos(page)}
        />
      )}
    </>
  );
};

export default ListadoProductos;
