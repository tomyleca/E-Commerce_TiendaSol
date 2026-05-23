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
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import StoreIcon from "@mui/icons-material/Store";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarIcon from "@mui/icons-material/Star";

const Tienda = () => {
  const { idTienda } = useParams();
  const [vendedor, setVendedor] = useState(null);
  const [productosDestacados, setProductosDestacados] = useState([]);
  const { isVendedor } = useAuth();
  const navigate = useNavigate();
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await getUsuario(idTienda);
        setVendedor(data);
        setBusquedaRealizada(true);
      } catch (error) {
        setBusquedaRealizada(true);
        console.error("Error cargando usuario:", error);
      }
    };

    const cargarProductosDestacados = async () => {
      try {
        const response = await getProductos(1, null, "masVendido", null, null, idTienda);
        setProductosDestacados(response?.data.slice(0, 4) || []);
        setBusquedaRealizada(true);
      } catch (error) {
        setBusquedaRealizada(true);
        console.error("Error cargando productos destacados:", error);
      }
    };

    if (idTienda) {
      setBusquedaRealizada(false);
      cargarUsuario();
      cargarProductosDestacados();
    }
  }, [idTienda]);

  /* ─── Loading ─── */
  if (!busquedaRealizada) {
    return (
      <>
        <Navbar />
        <div className="tienda-loading">
          <CircularProgress size={36} sx={{ color: "var(--brand-color)" }} />
        </div>
      </>
    );
  }

  /* ─── Sin tienda ─── */
  if (vendedor?.tipo !== "VENDEDOR" && busquedaRealizada) {
    return (
      <>
        <Navbar />
        <div className="tienda-page">
          <div className="tienda-vacia">
            <div className="tienda-vacia__icon-wrap">
              <StoreIcon className="tienda-vacia__icon" />
              <div className="tienda-vacia__slash" />
            </div>
            <h2 className="tienda-vacia__title">
              No se encontró una tienda para este usuario
            </h2>
            {!isVendedor && (
              <>
                <p className="tienda-vacia__subtitle">¿Querés crear la tuya?</p>
                <button
                  className="tienda-btn tienda-btn--brand"
                  onClick={() => navigate("/crear-tienda")}
                >
                  <AddBusinessIcon fontSize="small" />
                  Crear mi tienda
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  /* ─── Tienda normal ─── */
  const ubicacion =
    vendedor?.direccion
      ? `${vendedor.direccion.ciudad}, ${vendedor.direccion.pais}`
      : "Buenos Aires, Argentina";

  return (
    <>
      <Navbar />
      <div className="tienda-page">
        {/* Banner de perfil */}
        <div className="tienda-banner" aria-hidden="true" />

        <div className="tienda-profile">
          <Avatar
            alt={vendedor?.nombre}
            src=""
            sx={{ width: 100, height: 100 }}
            className="tienda-avatar"
          />
          <div className="tienda-profile__info">
            <h1 className="tienda-profile__name">{vendedor?.nombre || "Cargando..."}</h1>
            <p className="tienda-profile__desc">
              {vendedor?.descripcion || "Bienvenido a nuestra tienda"}
            </p>
            <div className="tienda-profile__meta">
              <span className="tienda-profile__meta-item">
                <LocationOnOutlinedIcon fontSize="small" />
                {ubicacion}
              </span>
              <span className="tienda-profile__meta-item tienda-rating">
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" style={{ opacity: 0.3 }} />
                <span>4.5</span>
              </span>
            </div>
          </div>
          <Link to={`/tienda/${idTienda}/productos`} className="tienda-ver-btn">
            Ver todos los productos
          </Link>
        </div>

        {/* Separador */}
        <div className="tienda-divider" />

        {/* Productos destacados */}
        <section className="tienda-destacados">
          <div className="tienda-destacados__header">
            <span className="tienda-section-label">Más vendidos</span>
            <h2 className="tienda-section-title">Productos Destacados</h2>
          </div>
          <div className="tienda-destacados__grid">
            {productosDestacados.map((producto) => (
              <CardProducto key={producto._id} producto={producto} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Tienda;
