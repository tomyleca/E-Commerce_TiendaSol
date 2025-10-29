import React from 'react'
import Navbar from '../../components/navbar/navbar'
import BarraBusqueda from '../../components/BarraBusqueda'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Navbar />
            <BarraBusqueda />
            <Outlet />
        </>
    )
}

export default Layout
