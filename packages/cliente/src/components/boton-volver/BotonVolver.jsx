import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./BotonVolver.css";

const BotonVolver = ({ to, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`boton-volver ${className}`}
      aria-label="Volver"
    >
      <ArrowBackIcon />
      <span>Volver</span>
    </button>
  );
};

export default BotonVolver;
