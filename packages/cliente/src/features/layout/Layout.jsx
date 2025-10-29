import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { Outlet } from 'react-router'
const Layout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet />
        </>
    )
}

export default Layout
