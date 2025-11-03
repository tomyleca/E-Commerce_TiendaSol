import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar.jsx';
import './Tienda.css'
import { Avatar } from '@mui/material';
import { getUsuario } from '../../services/usuarioService.js';	

const Tienda = () => {
	const { id } = useParams(); //Lee el :id de la URL
	const [vendedor, setVendedor] = useState(null);

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

		if (id) {
			cargarUsuario();
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
				<div className="tienda-lower-section"></div>
			</div>
		</>
	);
};

export default Tienda;
								