import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Home from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import "./drawer.css";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

//Drawer CONTROLADO por props: open y onClose.
export default function ResponsiveDrawer({ open = false, onClose = () => { } }) {

  const { usuario, isAuthenticated, isVendedor } = useAuth();


  const renderLink = (text) => {
    switch (text) {
      case "Home":
        return "/";
      case "Buscar Producto":
        return "/productos";
      case "Mi Tienda":
        // usuario puede ser null si no está autenticado; prevenir acceso a _id
        return usuario ? `/tienda/${usuario._id}` : "/";
      default:
        return "/";
    }
  };

  const renderIcon = (text) => {
    switch (text) {
      case "Home":
        return <Home fontSize="large" />;
      case "Buscar Producto":
        return <ManageSearchIcon fontSize="large" />;
      case "Mi Tienda":
        return <StoreIcon fontSize="large" />;
      default:
        return null;
    }
  };

  const drawerContent = (
    // hace lo que le pase como onClose desde el navbar
    <div role="presentation" onClick={onClose} onKeyDown={onClose}>
      <Toolbar />
      <Divider />
      <List>
        {["Home", "Buscar Producto"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={renderLink(text)}>
              <ListItemIcon>{renderIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {(isAuthenticated && isVendedor) && (
        <List>
          {["Mi Tienda"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={renderLink(text)}>
                <ListItemIcon>{renderIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )
      }
    </div >
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
