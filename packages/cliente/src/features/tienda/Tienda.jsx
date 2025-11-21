import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import BotonVolver from "../../components/boton-volver/BotonVolver.jsx";
import "./Tienda.css";
import { Avatar } from "@mui/material";
import { getUsuario } from "../../services/usuarioService.js";
import { getProductos } from "../../services/productService.js";
import CardProducto from "../../components/card-producto/card.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import AddHomeIcon from "@mui/icons-material/AddHome";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const Tienda = () => {
  const { idTienda } = useParams(); //Lee el :id de la URL
  const [vendedor, setVendedor] = useState(null);
  const [productosDestacados, setProductosDestacados] = useState([]);
  const { isVendedor } = useAuth();
  const navigate = useNavigate();
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  useEffect(() => {
    // Cargar datos del vendedor cuando cambia el idTienda
    const cargarUsuario = async () => {
      try {
        const data = await getUsuario(idTienda);
        setVendedor(data);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    const cargarProductosDestacados = async () => {
      try {
        const response = await getProductos(
          1,
          null,
          "masVendido",
          null,
          null,
          idTienda,
        );
        setProductosDestacados(response?.data.slice(0, 4) || []);
      } catch (error) {
        console.error("Error cargando productos destacados:", error);
      }
    };

    if (idTienda) {
	  setBusquedaRealizada(false);
      cargarUsuario();
      cargarProductosDestacados();
	  setBusquedaRealizada(true);
    }
  }, [idTienda]);

  if (vendedor?.tipo !== "VENDEDOR"  && busquedaRealizada) {
    return (
      <>
        <Navbar />
        <div className="tienda-container">
          <div className="tienda-vacia">
            <div className="tienda-vacia-icon-wrapper">
              <StoreIcon className="tienda-vacia-icon" />
              <div className="icon-slash"></div>
            </div>
            <h2>¡No se ha podido encontrar una tienda para este usuario!</h2>
            {!isVendedor && (
              <>
                <h3>¿Querés crear tu propia tienda?</h3>
                <p>¡Estás solo a unos pocos pasos!</p>
                <button
                  className="btn-agregar-tienda"
                  onClick={() => navigate("/crear-tienda")}
                >
                  <AddBusinessIcon />
                  Agregar tienda
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="tienda-container">
        <div className="tienda-upper-section">
          <div className="avatar-container">
            <Avatar alt="Remy Sharp" src="" sx={{ width: 200, height: 200 }} />
          </div>
          <div className="tienda-info">
            <h1>{vendedor?.nombre || "Cargando..."}</h1>
            <p>
              {vendedor?.descripcion ||
                "Electrónica y tecnología de vanguardia"}
            </p>
            <p>
              Ubicación:{" "}
              {vendedor?.direccion?.ciudad + ", " + vendedor?.direccion?.pais ||
                "Buenos Aires, Argentina"}
            </p>
            <p>Calificación: ★★★★☆ (4.5/5)</p>
          </div>
          <Link to={`/tienda/${idTienda}/productos`}>
            <button className="ver-productos-btn">
              Ver todos los productos
            </button>
          </Link>
        </div>
        <hr className="tienda-separator" />
        <div className="tienda-lower-section">
          <h2 className="titulo-productos-destacados">Productos Destacados</h2>
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
