import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CrearTiendaForm.css";
import toast from "react-hot-toast";
import InputField from "../input-field/InputField.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {actualizarUsuario} from "../../services/usuarioService.js";
import StoreIcon from "@mui/icons-material/Store";

const CrearTiendaForm = () => {
  const { usuario: usuarioAuth } = useAuth();
  const [usuario, setUsuario] = useState({
    telefono: "",
    descripcion: "",
    direccion: {
      calle: "",
      altura: "",
      ciudad: "",
      codigoPostal: "",
      pais: "",
      provincia: "",
      piso: "",
      departamento: "",
    },
  });
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  // Cargar datos existentes del usuario
  useEffect(() => {
    if (usuarioAuth) {
      setUsuario({
        telefono: usuarioAuth.telefono || "",
        descripcion: usuarioAuth.descripcion || "",
        direccion: {
          calle: usuarioAuth.direccion?.calle || "",
          altura: usuarioAuth.direccion?.altura || "",
          ciudad: usuarioAuth.direccion?.ciudad || "",
          codigoPostal: usuarioAuth.direccion?.codigoPostal || "",
          pais: usuarioAuth.direccion?.pais || "",
          provincia: usuarioAuth.direccion?.provincia || "",
          piso: usuarioAuth.direccion?.piso || "",
          departamento: usuarioAuth.direccion?.departamento || "",
        },
      });
    }
  }, [usuarioAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;

    // Validaciones
    if (!usuario.telefono?.trim()) {
      toast.error("El teléfono es obligatorio.");
      return;
    }
    if (!usuario.descripcion?.trim()) {
      toast.error("La descripción es obligatoria.");
      return;
    }
    if (!usuario.direccion.calle?.trim() || !usuario.direccion.altura) {
      toast.error("Calle y altura son obligatorios.");
      return;
    }
    if (!usuario.direccion.ciudad?.trim() || !usuario.direccion.provincia?.trim()) {
      toast.error("Ciudad y provincia son obligatorias.");
      return;
    }
    if (!usuario.direccion.codigoPostal?.trim() || !usuario.direccion.pais?.trim()) {
      toast.error("Código postal y país son obligatorios.");
      return;
    }

    try {
      setEnviando(true);
      
      // Convertir altura a número
      const datosParaEnviar = {
        telefono: parseInt(usuario.telefono),
        descripcion: usuario.descripcion,
        direccion: {
          ...usuario.direccion,
          altura: parseInt(usuario.direccion.altura),
        },
      };

      await actualizarUsuario(usuarioAuth?._id, datosParaEnviar);
      toast.success("¡Tienda creada con éxito!");
      navigate(`/tienda/${usuarioAuth?._id}`);
    } catch (err) {
      const msg = err?.message || "Error desconocido creando la tienda";
      toast.error(`No se pudo crear la tienda: ${msg}`);
    } finally {
      setEnviando(false);
    }
  };

  const handleDireccionChange = (campo, valor) => {
    setUsuario((u) => ({
      ...u,
      direccion: { ...u.direccion, [campo]: valor },
    }));
  };

  return (
    <div className="crear-tienda-container">
      <div className="crear-tienda-card">
        <div className="crear-tienda-header">
          <StoreIcon className="store-icon" />
          <h2>Crear Mi Tienda</h2>
          <p>Completá los datos para comenzar a vender</p>
        </div>

        <form className="crear-tienda-form" onSubmit={handleSubmit} noValidate>
          {/* Datos de la tienda */}
          <div className="form-section">
            <h3>Información de la Tienda</h3>
            
            <InputField
              id="telefono"
              name="telefono"
              type="tel"
              label="Teléfono de contacto"
              placeholder="Ej: +54 11 1234-5678"
              value={usuario.telefono}
              onChange={(e) => setUsuario((u) => ({ ...u, telefono: e.target.value }))}
              autoComplete="tel"
              required
              errorId="telefonoError"
            />

            <div className="input-wrapper">
              <label htmlFor="descripcion" className="input-label">
                
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="input-field textarea-field"
                placeholder="Contanos sobre tu tienda, qué productos vendés..."
                value={usuario.descripcion}
                onChange={(e) => setUsuario((u) => ({ ...u, descripcion: e.target.value }))}
                rows="4"
                required
              />
              <span id="descripcionError" className="input-error"></span>
            </div>
          </div>

          {/* Dirección */}
          <div className="form-section">
            <h3>Dirección</h3>
            
            <div className="form-row">
              <InputField
                id="calle"
                name="calle"
                type="text"
                label="Calle"
                placeholder="Ej: Av. Corrientes"
                value={usuario.direccion.calle}
                onChange={(e) => handleDireccionChange("calle", e.target.value)}
                autoComplete="address-line1"
                required
                errorId="calleError"
              />

              <InputField
                id="altura"
                name="altura"
                type="number"
                label="Altura"
                placeholder="Ej: 1234"
                value={usuario.direccion.altura}
                onChange={(e) => handleDireccionChange("altura", e.target.value)}
                autoComplete="off"
                required
                errorId="alturaError"
              />
            </div>

            <div className="form-row">
              <InputField
                id="piso"
                name="piso"
                type="text"
                label="Piso (opcional)"
                placeholder="Ej: 3"
                value={usuario.direccion.piso}
                onChange={(e) => handleDireccionChange("piso", e.target.value)}
                autoComplete="off"
                errorId="pisoError"
              />

              <InputField
                id="departamento"
                name="departamento"
                type="text"
                label="Departamento (opcional)"
                placeholder="Ej: B"
                value={usuario.direccion.departamento}
                onChange={(e) => handleDireccionChange("departamento", e.target.value)}
                autoComplete="off"
                errorId="departamentoError"
              />
            </div>

            <div className="form-row">
              <InputField
                id="ciudad"
                name="ciudad"
                type="text"
                label="Ciudad"
                placeholder="Ej: Buenos Aires"
                value={usuario.direccion.ciudad}
                onChange={(e) => handleDireccionChange("ciudad", e.target.value)}
                autoComplete="address-level2"
                required
                errorId="ciudadError"
              />

              <InputField
                id="provincia"
                name="provincia"
                type="text"
                label="Provincia"
                placeholder="Ej: CABA"
                value={usuario.direccion.provincia}
                onChange={(e) => handleDireccionChange("provincia", e.target.value)}
                autoComplete="address-level1"
                required
                errorId="provinciaError"
              />
            </div>

            <div className="form-row">
              <InputField
                id="codigoPostal"
                name="codigoPostal"
                type="text"
                label="Código Postal"
                placeholder="Ej: C1043"
                value={usuario.direccion.codigoPostal}
                onChange={(e) => handleDireccionChange("codigoPostal", e.target.value)}
                autoComplete="postal-code"
                required
                errorId="codigoPostalError"
              />

              <InputField
                id="pais"
                name="pais"
                type="text"
                label="País"
                placeholder="Ej: Argentina"
                value={usuario.direccion.pais}
                onChange={(e) => handleDireccionChange("pais", e.target.value)}
                autoComplete="country-name"
                required
                errorId="paisError"
              />
            </div>
          </div>

          <button type="submit" className="form-btn" disabled={enviando}>
            <span className="btn-text">
              {enviando ? "Creando..." : "Crear Tienda"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearTiendaForm;
