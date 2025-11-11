import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar.jsx';
import './Tienda.css'
import { Avatar } from '@mui/material';
import { getUsuario } from '../../services/usuarioService.js';	
import { getProductos } from '../../services/productService.js';
import CardProducto from '../../components/card-producto/card.jsx';


const Tienda = () => {
	const { id } = useParams(); //Lee el :id de la URL
	const [vendedor, setVendedor] = useState(null);
	const [productosDestacados, setProductosDestacados] = useState([]);

	useEffect(() => {
		// Cargar datos del vendedor cuando cambia el id
		const cargarUsuario = async () => {
			try {
				const data = await getUsuario(id);
				setVendedor(data);
			} catch (error) {
				console.error('Error cargando usuario:', error);
			}
		};

		const cargarProductosDestacados = async () => {
			try {
				const response = await getProductos(1, null, 'masVendido', null, null, id);
				setProductosDestacados(response?.data || []);
			} catch (error) {
				console.error('Error cargando productos destacados:', error);
			}
		};

		if (id) {
			cargarUsuario();
			cargarProductosDestacados();
		}
	}, [id]);

	return (
		<>
			<Navbar />
			<div className="tienda-container">
				<div className="tienda-upper-section">
					<div className="avatar-container">
						<Avatar
							alt="Remy Sharp"
							src="/images/sony.jpg"
							sx={{ width: 200, height: 200 }}
						/>
					</div>
					<div className="tienda-info">
						<h1>{vendedor?.nombre || 'Cargando...'}</h1>
						<p>{vendedor?.descripcion || 'Electrónica y tecnología de vanguardia'}</p>
						<p>Ubicación: {vendedor?.ubicacion || 'Buenos Aires, Argentina'}</p>
						<p>Calificación: ★★★★☆ (4.5/5)</p>
					</div>
					<button className="ver-productos-btn">Ver todos los productos</button>
				</div>
				<hr className="tienda-separator" />
				<div className="tienda-lower-section">
					<h2 className='titulo-productos-destacados' >Productos Destacados</h2>
					<div className="productos-destacados">
						{productosDestacados.map((producto) => (
							<div key={producto._id} className="producto-card">
								<CardProducto producto={producto} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Tienda;
								