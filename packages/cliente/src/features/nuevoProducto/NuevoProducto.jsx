import "./NuevoProducto.css";
import Navbar from "../../components/navbar/navbar.jsx";
import NuevoProductoForm from "../../components/nuevo-producto-form/NuevoProductoForm.jsx";

const NuevoProducto = () => {
    return (
        <>
            <Navbar minimalist />
            <div className="crear-producto-page">
                <NuevoProductoForm />
            </div>
        </>
    );
};

export default NuevoProducto;
