import React from 'react'
import Navbar from '../../components/navbar/navbar'
import BarraBusqueda from '../../components/BarraBusqueda'
import { Outlet } from 'react-router-dom'
import './Layout.css'

const Layout = ({ filtrarProductos }) => {
    return (
        <>
            <Navbar />
			<div className="barra-container">
		    <BarraBusqueda filtrarProductos={filtrarProductos} />
			</div>
            <Outlet />
        </>
    )
}

export default Layout
