import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

  const inicialVendedor = vendedor?.nombre ? vendedor.nombre.charAt(0).toUpperCase() : "T";

  return (
    <>
      <Navbar />
      <div className="tienda-page">
       
        <div className="tienda-profile">
          <Avatar
            alt={vendedor?.nombre || "Vendedor"}
            src={vendedor?.avatarUrl || ""}
            sx={{ width: 100, height: 100 }}
            className="tienda-avatar"
          >
            {!vendedor?.avatarUrl && inicialVendedor}
          </Avatar>
          
          <div className="tienda-profile__info">
            <div className="tienda-profile__name-row">
              <h1 className="tienda-profile__name">{vendedor?.nombre || "Cargando..."}</h1>
              <CheckCircleIcon className="tienda-verified-badge" titleAccess="Vendedor Verificado" />
              <span className="tienda-status-pill">Online</span>
            </div>
            
            <p className="tienda-profile__desc">
              {vendedor?.descripcion || "Bienvenido a nuestra tienda. Descubrí nuestros productos y novedades."}
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

            {/* Strip de métricas del vendedor (Confianza y Estadísticas) */}
            <div className="tienda-metrics-strip">
              <div className="tienda-metric-item">
                <TrendingUpIcon className="metric-icon" />
                <div className="metric-text">
                  <strong>+150</strong>
                  <span>Ventas concretadas</span>
                </div>
              </div>
              <div className="tienda-metric-divider" aria-hidden="true" />
              <div className="tienda-metric-item">
                <VerifiedUserIcon className="metric-icon" />
                <div className="metric-text">
                  <strong>100%</strong>
                  <span>Pagos Protegidos</span>
                </div>
              </div>
              <div className="tienda-metric-divider" aria-hidden="true" />
              <div className="tienda-metric-item">
                <CalendarMonthIcon className="metric-icon" />
                <div className="metric-text">
                  <strong>2025</strong>
                  <span>Miembro desde</span>
                </div>
              </div>
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
          
          {productosDestacados.length === 0 ? (
            <div className="tienda-destacados-vacio">
              <p>El vendedor aún no ha publicado productos destacados.</p>
            </div>
          ) : (
            <div className="tienda-destacados__grid">
              {productosDestacados.map((producto) => {
                const productoNormalizado = {
                  ...producto,
                  id: producto._id || producto.id,
                };
                return <CardProducto key={productoNormalizado.id} producto={productoNormalizado} />;
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Tienda;
