import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar.jsx';
import ModalCarrito from '../../components/navbar/modal-carrito.jsx';
import './ListadoProductos.css';
import { useCarrito } from '../../context/CarritoContext.jsx';
import Body2 from '../../components/Body2.jsx';
import { getProducto,getProductos } from '../../services/productService.js';
import BarraBusqueda from '../../components/BarraBusqueda.jsx';
import Paginacion from '../../components/paginacion/paginacion.jsx';


const ListadoProductos = () => {
	const [productos, setProductos] = useState([]);
	const [productosFiltrados, setProductosFiltrados] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(3);
	const [vendedor,setVendedor]=useState('68f132ae7f31069b1cb49254');


	const filtarProductos = (busqueda) => {
		const filtrados = productos.filter((p) => p.titulo.toLowerCase().includes(busqueda.toLowerCase()));
		setProductosFiltrados(filtrados);
	}

	const cargarProductos = async (page) => {
		const productosObtenidos = await getProductos(page,vendedor);
		setProductos(productosObtenidos.data);
		setProductosFiltrados(productosObtenidos.data);
	}

	useEffect(() => {
		cargarProductos();
	}, []);

	return (
		<>
			<div className="contenedor-productos">
				<Body2 productos={productos} />
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
}

export default ListadoProductos;
