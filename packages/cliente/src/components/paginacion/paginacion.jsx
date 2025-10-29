import React from "react";
import "./paginacion.css";

const Paginacion = ({ currentPage, totalPaginas, onPageChange }) => {
  return (
    <nav className="paginacion" aria-label="Paginación de productos">
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={num === currentPage ? "active" : ""}
          aria-label={`Ir a la página ${num}`}
          aria-current={num === currentPage ? "page" : undefined}
        >
          {num}
        </button>
      ))}
    </nav>
  );
};

export default Paginacion;
