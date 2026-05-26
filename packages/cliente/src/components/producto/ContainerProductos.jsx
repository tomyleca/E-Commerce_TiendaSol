import React, { useState } from "react";
import CardProducto from "../card-producto/card.jsx";
import Card2 from "../card-producto/card2.jsx";
import "./ContainerProductos.css";
import Filtros from "./Filtros.jsx";
import FiltrosDrawer from "./FiltrosDrawer.jsx";
import { useFiltro } from "../../context/FiltroContext.jsx";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Body2 = ({ productos, categorias, busquedaRealizada }) => {
  const { state, dispatch } = useFiltro();
  const { orden } = state;

  // Modos de visualización: "grid" o "list"
  const [viewMode, setViewMode] = useState("list");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOrdenChange = (e) => {
    dispatch({ type: "SET_ORDEN", payload: e.target.value });
  };

  // Renderizar Skeletons de carga
  const renderSkeletons = () => {
    const skeletonsCount = 6;
    return (
      <div className={`productos-container-view ${viewMode === "grid" ? "view-grid-layout" : "view-list-layout"}`}>
        {Array.from({ length: skeletonsCount }).map((_, index) => (
          <div key={index} className={`skeleton-card skeleton-${viewMode}`}>
            <div className="skeleton-image-sim" />
            <div className="skeleton-body-sim">
              <div className="skeleton-line skeleton-line-title" />
              <div className="skeleton-line skeleton-line-desc" />
              <div className="skeleton-line skeleton-line-desc" style={{ width: "60%" }} />
              <div className="skeleton-footer-sim">
                <div className="skeleton-line skeleton-line-price" />
                <div className="skeleton-line skeleton-line-button" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="productos-layout">
      {/* Panel de filtros lateral (Solo visible en pantallas grandes) */}
      <section className="filtros-sidebar" aria-label="Filtros de productos">
        <Filtros categorias={categorias} />
      </section>

      {/* Panel principal de contenido */}
      <section className="catalogo-principal" aria-label="Listado de productos">
        {/* Toolbar superior */}
        <div className="products-toolbar">
          <div className="toolbar-left">
            <span className="results-count">
              {busquedaRealizada ? `${productos.length} productos encontrados` : "Cargando productos..."}
            </span>
          </div>

          <div className="toolbar-right">
            {/* Botón de filtros móvil */}
            <button 
              className="btn-toolbar-mobile-filter"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir filtros"
            >
              <FilterAltIcon fontSize="small" />
              <span>Filtrar</span>
            </button>

            {/* Dropdown de ordenamiento */}
            <div className="sort-dropdown-wrap">
              <select 
                value={orden} 
                onChange={handleOrdenChange} 
                className="sort-select"
                aria-label="Ordenar productos"
              >
                <option value="">Ordenar por: Destacados</option>
                <option value="masVendido">Más Vendidos</option>
                <option value="precio_asc">Precio: de Menor a Mayor</option>
                <option value="precio_desc">Precio: de Mayor a Menor</option>
              </select>
            </div>

            {/* Selector de visualización Grid/List */}
            <div className="view-mode-selector">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Vista de cuadrícula"
                aria-label="Ver como cuadrícula"
              >
                <GridViewIcon fontSize="small" />
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="Vista de lista"
                aria-label="Ver como lista"
              >
                <ViewListIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* Listado o Skeletons */}
        {!busquedaRealizada ? (
          renderSkeletons()
        ) : productos.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>No encontramos productos</h3>
            <p>Intentá modificando las categorías seleccionadas o el rango de precios.</p>
          </div>
        ) : (
          <div className={`productos-container-view ${viewMode === "grid" ? "view-grid-layout" : "view-list-layout"}`}>
            {productos.map((p) => {
              const productoNormalizado = {
                ...p,
                id: p._id || p.id,
              };
              return viewMode === "grid" ? (
                <CardProducto key={productoNormalizado.id} producto={productoNormalizado} />
              ) : (
                <Card2 key={productoNormalizado.id} producto={productoNormalizado} />
              );
            })}
          </div>
        )}
      </section>

      {/* Drawer responsivo de filtros móviles */}
      <FiltrosDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categorias={categorias}
      />
    </div>
  );
};

export default Body2;
