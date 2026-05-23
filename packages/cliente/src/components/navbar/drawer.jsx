import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import "./drawer.css";
import { useAuth } from "../../context/AuthContext";
import HomeIcon from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import StoreIcon from "@mui/icons-material/Store";
import { ShoppingBag, LocalMall } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 260;

const NAV_ITEMS = ["Home", "Buscar Producto", "Mis Pedidos", "Mi Tienda"];
const VENDOR_ITEMS = ["Mis Ventas", "Agregar Producto"];

const getLink = (text, usuario) => {
  switch (text) {
    case "Home":             return "/";
    case "Buscar Producto":  return "/productos";
    case "Mi Tienda":        return usuario ? `/tienda/${usuario._id}` : "/login";
    case "Mis Pedidos":      return usuario ? `/clientes/${usuario._id}/pedidos` : "/login";
    case "Mis Ventas":       return usuario ? `/ventas/${usuario._id}` : "/login";
    case "Agregar Producto": return usuario ? "/nuevoProducto" : "/login";
    default:                 return "/";
  }
};

const getIcon = (text) => {
  switch (text) {
    case "Home":             return <HomeIcon />;
    case "Buscar Producto":  return <ManageSearchIcon />;
    case "Mi Tienda":        return <StoreIcon />;
    case "Mis Pedidos":      return <ShoppingBag />;
    case "Mis Ventas":       return <LocalMall />;
    case "Agregar Producto": return <AddCircleIcon />;
    default:                 return null;
  }
};

export default function ResponsiveDrawer({ open = false, onClose = () => {} }) {
  const { usuario, isAuthenticated, isVendedor } = useAuth();

  const renderItem = (text) => (
    <ListItem key={text} disablePadding>
      <ListItemButton
        component={Link}
        to={getLink(text, usuario)}
        onClick={onClose}
        sx={{
          py: 1.5,
          px: 2.5,
          borderRadius: "8px",
          mx: 1,
          color: "rgba(255,255,255,0.75)",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(201, 168, 76, 0.08)",
            color: "var(--brand-color)",
            borderLeft: "3px solid var(--brand-color)",
            paddingLeft: "calc(1.25rem + 3px)",
          },
          "& .MuiListItemIcon-root": {
            color: "inherit",
            minWidth: 40,
          },
        }}
      >
        <ListItemIcon>{getIcon(text)}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          background: "linear-gradient(180deg, #0f0f16 0%, #1a1a24 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        },
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.6)",
        },
      }}
    >
      {/* Header del drawer */}
      <div className="drawer-header">
        <div className="drawer-brand">
          <img src="/tiendaSolLogo.png" alt="Tienda Sol" className="drawer-logo" />
          <span className="drawer-title">Tienda Sol</span>
        </div>
        <button className="drawer-close" onClick={onClose} aria-label="Cerrar menú">
          <CloseIcon fontSize="small" />
        </button>
      </div>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* Navegación principal */}
      <List sx={{ mt: 1 }}>
        {NAV_ITEMS.map(renderItem)}
      </List>

      {/* Sección vendedor */}
      {isAuthenticated && isVendedor && (
        <>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2, my: 1 }} />
          <p className="drawer-section-label">Vendedor</p>
          <List>
            {VENDOR_ITEMS.map(renderItem)}
          </List>
        </>
      )}
    </Drawer>
  );
}
