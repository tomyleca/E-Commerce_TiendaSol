import React from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Filtro from "./Filtros.jsx";
import Divider from "@mui/material/Divider";

export default function FiltrosDrawer({ open = false, onClose = () => {}, categorias = [] }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 290,
          background: "var(--surface-card)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
        },
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          marginBottom: "1rem" 
        }}
      >
        <span 
          style={{ 
            fontFamily: "var(--font-sans)", 
            fontWeight: 700, 
            fontSize: "1rem", 
            color: "var(--text-dark)" 
          }}
        >
          Filtrar Catálogo
        </span>
        <button 
          onClick={onClose} 
          aria-label="Cerrar filtros"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "var(--text-light)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CloseIcon fontSize="small" />
        </button>
      </div>

      <Divider style={{ marginBottom: "1.25rem" }} />

      <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px" }}>
        <Filtro categorias={categorias} />
      </div>
    </Drawer>
  );
}
