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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";
import { useAuth } from "../../context/AuthContext.jsx";

const FEATURES = [
  {
    icon: <SearchIcon />,
    title: "Búsqueda Avanzada",
    desc: "Encontrá exactamente lo que querés con filtros inteligentes por categoría, precio y más.",
  },
  {
    icon: <LocalShippingIcon />,
    title: "Envíos Certificados",
    desc: "Seguimiento en tiempo real y alianzas con los correos líderes para entregas sin sorpresas.",
  },
  {
    icon: <VerifiedUserIcon />,
    title: "Garantía de Compra",
    desc: "Tu dinero está protegido. Los vendedores cobran solo cuando confirmás la recepción.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Precios Competitivos",
    desc: "Conectamos compradores de forma directa, eliminando intermediarios innecesarios.",
  },
  {
    icon: <StorefrontIcon />,
    title: "Canales de Venta",
    desc: "Creá tu propia tienda en minutos, personalizá tu perfil y empezá a vender de inmediato.",
  },
  {
    icon: <PeopleIcon />,
    title: "Soporte y Comunidad",
    desc: "Un ecosistema de soporte activo para resolver cualquier duda que tengas durante el proceso.",
  },
];

const CATEGORIES = [
  {
    name: "Tecnología",
    image: "/images/joystick.jpg",
    link: "/productos?categoria=tecnologia",
    tagline: "Última generación",
  },
  {
    name: "Moda y Textil",
    image: "/images/cargador.jpg", // placeholder o genérico
    link: "/productos?categoria=moda",
    tagline: "Tendencias 2026",
  },
  {
    name: "Hogar y Deco",
    image: "/images/play5.jpg", // placeholder o genérico
    link: "/productos?categoria=hogar",
    tagline: "Diseño y confort",
  },
  {
    name: "Herramientas",
    image: "/images/sony.jpg", // placeholder o genérico
    link: "/productos?categoria=herramientas",
    tagline: "Máximo rendimiento",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <div className="home-container">

        {/* ═══════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════ */}
        <section className="home-hero">
          {/* Malla decorativa de fondo */}
          <div className="hero-mesh-grid" aria-hidden="true" />
          
          <div className="home-hero__content">
            <span className="home-hero__eyebrow">
              <SecurityIcon fontSize="inherit" style={{ marginRight: "4px", verticalAlign: "middle" }} />
              Mercado 100% Protegido y Verificado
            </span>
            <h1 className="home-hero__title">
              La forma inteligente <br />
              de comprar y vender <span>online</span>.
            </h1>
            <p className="home-hero__subtitle">
              Conectá con tiendas verificadas de todo el país, disfrutá de envíos certificados y gestioná tus compras con seguridad absoluta.
            </p>
            <div className="home-hero__actions">
              <button
                className="home-btn home-btn--brand"
                onClick={() => navigate("/productos")}
              >
                <SearchIcon fontSize="small" />
                Explorar Catálogo
              </button>
              <button
                className="home-btn home-btn--outline"
                onClick={() => navigate("/crear-tienda")}
              >
                <StorefrontIcon fontSize="small" />
                Vender en Tienda Sol
              </button>
            </div>
          </div>

          {/* Cards Flotantes Asimétricas (CSS 3D) */}
          <div className="home-hero__visual">
            <div className="hero-blur-glow" aria-hidden="true" />
            
            <div className="floating-card-scene">
              {/* Card 1: Vendedor Premium */}
              <div className="f-card f-card--vendedor">
                <div className="f-card__header">
                  <div className="f-card__avatar">S</div>
                  <div>
                    <h4 className="f-card__title">Sony Oficial</h4>
                    <span className="f-card__subtitle">Vendedor Verificado</span>
                  </div>
                  <CheckCircleIcon className="f-card__verified" />
                </div>
                <div className="f-card__rating">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  <span>5.0 (1.2k opiniones)</span>
                </div>
              </div>

              {/* Card 2: Producto Destacado */}
              <div className="f-card f-card--producto">
                <span className="f-card__badge">NUEVO</span>
                <div className="f-card__img-sim">
                  <ShoppingBagIcon />
                </div>
                <div className="f-card__body">
                  <h4 className="f-card__p-title">PlayStation 5 Console</h4>
                  <div className="f-card__p-footer">
                    <span className="f-card__price">$849.999</span>
                    <span className="f-card__stock">En Stock</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Notificación Envíos */}
              <div className="f-card f-card--envio">
                <div className="f-card__icon-circle">
                  <LocalShippingIcon />
                </div>
                <div>
                  <h4 className="f-card__title">Envío prioritario</h4>
                  <p className="f-card__desc">Llega mañana a tu domicilio</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           STATS SECTION (Glassmorphic Floating)
        ═══════════════════════════════════════ */}
        <section className="home-stats-wrapper">
          <div className="home-stats">
            <div className="home-stats__item">
              <strong>10k+</strong>
              <span>Productos Activos</span>
            </div>
            <div className="home-stats__divider" aria-hidden="true" />
            <div className="home-stats__item">
              <strong>2.5k+</strong>
              <span>Vendedores Certificados</span>
            </div>
            <div className="home-stats__divider" aria-hidden="true" />
            <div className="home-stats__item">
              <strong>50k+</strong>
              <span>Transacciones Exitosas</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CATEGORÍAS POPULARES
        ═══════════════════════════════════════ */}
        <section className="home-categories">
          <div className="home-categories__header">
            <span className="home-section-label">Categorías Populares</span>
            <h2 className="home-section-title">Comprá por departamento</h2>
          </div>
          
          <div className="home-categories__grid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="category-card"
                onClick={() => navigate(cat.link)}
              >
                <div className="category-card__image-container">
                  <div className="category-card__overlay" />
                  <div className="category-card__gradient" />
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-card__img"
                    onError={(e) => {
                      // Fallback en caso de que no cargue la imagen local
                      e.target.style.display = "none";
                    }}
                  />
                  {/* Icono decorativo de fallback por si falla la imagen */}
                  <div className="category-card__icon-fallback">
                    <ShoppingBagIcon />
                  </div>
                </div>
                <div className="category-card__content">
                  <span className="category-card__tagline">{cat.tagline}</span>
                  <h3 className="category-card__name">{cat.name}</h3>
                  <span className="category-card__action">
                    Ver productos <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
           BENEFICIOS (FEATURES)
        ═══════════════════════════════════════ */}
        <section className="home-features">
          <div className="home-features__header">
            <span className="home-section-label">Garantía Tienda Sol</span>
            <h2 className="home-section-title">Comercio seguro y transparente</h2>
          </div>
          
          <div className="home-features__grid">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="home-feature-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="home-feature-card__icon" aria-hidden="true">
                  {f.icon}
                </div>
                <h3 className="home-feature-card__title">{f.title}</h3>
                <p className="home-feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CÓMO FUNCIONA (PASO A PASO)
        ═══════════════════════════════════════ */}
        <section className="home-how-it-works">
          <div className="how__header">
            <span className="home-section-label">Simplicidad ante todo</span>
            <h2 className="home-section-title">¿Cómo funciona la plataforma?</h2>
          </div>

          <div className="how__grid">
            <div className="how__step">
              <span className="how__number">01</span>
              <h3 className="how__title">Explorá o Registrate</h3>
              <p className="how__desc">
                Navegá entre miles de productos o registrate como vendedor para crear tu espacio comercial personalizado de forma gratuita.
              </p>
            </div>
            
            <div className="how__step-connector" aria-hidden="true" />

            <div className="how__step">
              <span className="how__number">02</span>
              <h3 className="how__title">Operá con confianza</h3>
              <p className="how__desc">
                Comprá mediante canales de pago protegidos. Si vendés, publicá tu stock, recibí pedidos y respondé a tus clientes con rapidez.
              </p>
            </div>

            <div className="how__step-connector" aria-hidden="true" />

            <div className="how__step">
              <span className="how__number">03</span>
              <h3 className="how__title">Seguimiento y Entrega</h3>
              <p className="how__desc">
                Recibí actualizaciones de tu pedido y confirmá la llegada. El dinero del vendedor se libera una vez que el producto está en tus manos.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CTA (CALL TO ACTION)
        ═══════════════════════════════════════ */}
        {!isAuthenticated && (
          <section className="home-cta-wrapper">
            <div className="home-cta">
              <div className="home-cta__glow-left" aria-hidden="true" />
              <div className="home-cta__glow-right" aria-hidden="true" />
              
              <div className="home-cta__inner">
                <span className="home-section-label home-section-label--light">
                  Formá parte hoy
                </span>
                <h2 className="home-cta__title">
                  Impulsá tus ventas o encontrá <br />
                  lo que buscás hoy mismo.
                </h2>
                <p className="home-cta__subtitle">
                  Creá tu cuenta gratis en 30 segundos y unite al marketplace más transparente y moderno de Argentina.
                </p>
                <div className="home-cta__actions">
                  <button
                    className="home-btn home-btn--brand"
                    onClick={() => navigate("/register")}
                  >
                    Crear mi cuenta gratis
                  </button>
                  <button
                    className="home-btn home-btn--outline-light"
                    onClick={() => navigate("/login")}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
