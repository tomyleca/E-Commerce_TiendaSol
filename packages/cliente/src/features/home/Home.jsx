import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/navbar/navbar.jsx";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import { useAuth } from "../../context/AuthContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { usuario, isAuthenticated } = useAuth();

  return (
    <>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Bienvenido a Tienda Sol</h1>
            <p className="hero-subtitle">
              Tu marketplace de confianza para comprar y vender
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/productos")}
              >
                <SearchIcon /> Explorar Productos
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/crear-tienda")}
              >
                <StorefrontIcon /> Crear Mi Tienda
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/tiendaSolLogo.png" alt="Hero" />
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">¿Por qué elegir Tienda Sol?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <SearchIcon fontSize="large" />
              </div>
              <h3>Búsqueda Fácil</h3>
              <p>
                Encuentra lo que buscás con nuestro sistema de búsqueda y
                filtros avanzados
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <LocalShippingIcon fontSize="large" />
              </div>
              <h3>Envíos Seguros</h3>
              <p>
                Seguimiento de pedidos en tiempo real y envíos a todo el país
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <VerifiedUserIcon fontSize="large" />
              </div>
              <h3>Compra Segura</h3>
              <p>Protección al comprador y vendedores verificados</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUpIcon fontSize="large" />
              </div>
              <h3>Mejores Precios</h3>
              <p>Compará precios y encontrá las mejores ofertas del mercado</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <StorefrontIcon fontSize="large" />
              </div>
              <h3>Creá tu Tienda</h3>
              <p>Vendé tus productos de forma simple y sin complicaciones</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <PeopleIcon fontSize="large" />
              </div>
              <h3>Comunidad</h3>
              <p>Unite a miles de compradores y vendedores en toda Argentina</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          {!isAuthenticated && (
            <div className="cta-content">
              <h2>¿Listo para comenzar?</h2>
              <p>
                Registrate hoy y descubrí todo lo que Tienda Sol tiene para
                ofrecerte
              </p>
              <div className="cta-buttons">
                <button
                  className="btn-cta-primary"
                  onClick={() => navigate("/register")}
                >
                  Crear Cuenta
                </button>
                <button
                  className="btn-cta-secondary"
                  onClick={() => navigate("/login")}
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
