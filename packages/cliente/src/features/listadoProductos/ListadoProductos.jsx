import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar.jsx';
import ModalCarrito from '../../components/navbar/modal-carrito.jsx';
import './ListadoProductos.css';
import { useCarrito } from '../../context/CarritoContext.jsx';
import Body2 from '../../components/Body2.jsx';
import { getProducto } from '../../services/productService.js';
import BarraBusqueda from '../../components/BarraBusqueda.jsx';

const ListadoProductos = () => {
	const [productos, setProductos] = useState([]);
	const [productosFiltrados, setProductosFiltrados] = useState([]);

	const filtarProductos = (busqueda) => {
		const filtrados = productos.filter((p) => p.titulo.toLowerCase().includes(busqueda.toLowerCase()));
		setProductosFiltrados(filtrados);
	}

	const cargarProductos = async () => {
		const productosObtenidos = await getProducto();
		setProductos(productosObtenidos);
		setProductosFiltrados(productosObtenidos);
	}

	useEffect(() => {
		cargarProductos();
	}, []);

	return (
		<>
			<Navbar />
			<BarraBusqueda filtarProductos />
			<div className="contenedor-productos">
				<Body2 productos={productos} />
			</div>
		</>
	);
}

export default ListadoProductos;
