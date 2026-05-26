import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditarUsuarioForm.css";
import toast from "react-hot-toast";
import InputField from "../input-field/InputField.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { actualizarUsuario } from "../../services/usuarioService.js";
import StoreIcon from "@mui/icons-material/Store";

const EditarUsuarioForm = ({
  objetivo,
  campos = {
    nombre: true,
    telefono: true,
    descripcion: true,
    direccion: true,
  },
}) => {
  const {
    usuario: usuarioAuth,
    isVendedor,
    actualizarDatosUsuario,
  } = useAuth();
  const [usuario, setUsuario] = useState({
    nombre: "",
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
        nombre: usuarioAuth.nombre || "",
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
  }, [usuarioAuth, isVendedor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;

    // Validaciones
    if (campos.nombre && !usuario.nombre?.trim()) {
      toast.error("El nombre es obligatorio.");
      return;
    }
    if (campos.telefono && !usuario.telefono?.trim()) {
      toast.error("El teléfono es obligatorio.");
      return;
    }
    if (campos.descripcion && !usuario.descripcion?.trim()) {
      toast.error("La descripción es obligatoria.");
      return;
    }
    if (campos.direccion) {
      if (!usuario.direccion.calle?.trim() || !usuario.direccion.altura) {
        toast.error("Calle y altura son obligatorios.");
        return;
      }
      if (
        !usuario.direccion.ciudad?.trim() ||
        !usuario.direccion.provincia?.trim()
      ) {
        toast.error("Ciudad y provincia son obligatorias.");
        return;
      }
      if (
        !usuario.direccion.codigoPostal?.trim() ||
        !usuario.direccion.pais?.trim()
      ) {
        toast.error("Código postal y país son obligatorios.");
        return;
      }
    }

    try {
      setEnviando(true);

      // Construir objeto solo con campos habilitados
      const datosParaEnviar = {};

      if (campos.nombre) {
        datosParaEnviar.nombre = usuario.nombre;
      }
      if (campos.telefono) {
        datosParaEnviar.telefono = parseInt(usuario.telefono);
      }
      if (campos.descripcion) {
        datosParaEnviar.descripcion = usuario.descripcion;
      }
      if (campos.direccion) {
        datosParaEnviar.direccion = {
          ...usuario.direccion,
          altura: parseInt(usuario.direccion.altura),
        };
      }

      await actualizarUsuario(usuarioAuth?._id, datosParaEnviar);

      // Actualizar el usuario en el contexto de autenticación
      actualizarDatosUsuario(datosParaEnviar);

      toast.success("¡Perfil actualizado con éxito!");
      if (objetivo === "crear-tienda" && isVendedor)
        toast.success("¡Tienda creada con exito!");
      if (objetivo === "crear-tienda" && !isVendedor)
        toast.error("¡No se pudo crear la tienda!");

      navigate(-1);
    } catch (err) {
      const msg = err?.message || "Error desconocido actualizando el perfil";
      toast.error(`No se pudo actualizar el perfil: ${msg}`);
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
	<div className="editar-usuario-page">
    <div className="editar-usuario-container">
      <div className="editar-usuario-card">
        <div className="editar-usuario-header">
          {objetivo === "crear-tienda" && (
            <>
              <StoreIcon className="store-icon" />
              <h2>Crear Tienda</h2>
              <p>Completa tus datos personales para crear tu tienda.</p>
            </>
          )}
          {objetivo === "comprar" && (
            <>
              <StoreIcon className="store-icon" />
              <h2>Comprar</h2>
              <p>Completa tus datos personales para continuar con tu compra.</p>
            </>
          )}
        </div>

        <form
          className="editar-usuario-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Datos de la tienda */}
          <div className="form-section">
            <h3>Información Personal</h3>

            {campos.nombre && (
              <InputField
                id="nombre"
                name="nombre"
                type="text"
                label="Nombre"
                placeholder="Ej: Juan Pérez"
                value={usuario.nombre}
                onChange={(e) =>
                  setUsuario((u) => ({ ...u, nombre: e.target.value }))
                }
                autoComplete="name"
                required
                errorId="nombreError"
              />
            )}

            {campos.telefono && (
              <InputField
                id="telefono"
                name="telefono"
                type="tel"
                label="Teléfono de contacto"
                placeholder="Ej: +54 11 1234-5678"
                value={usuario.telefono}
                onChange={(e) =>
                  setUsuario((u) => ({ ...u, telefono: e.target.value }))
                }
                autoComplete="tel"
                required
                errorId="telefonoError"
              />
            )}

            {campos.descripcion && (
              <div className="input-wrapper">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className={`textarea-field${usuario.descripcion ? " has-value" : ""}`}
                  placeholder=" "
                  value={usuario.descripcion}
                  onChange={(e) =>
                    setUsuario((u) => ({ ...u, descripcion: e.target.value }))
                  }
                  rows="4"
                  required
                />
                <label htmlFor="descripcion">Descripción de tu tienda o negocio</label>
                <span id="descripcionError" className="input-error"></span>
              </div>
            )}
          </div>

          {/* Dirección */}
          {campos.direccion && (
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
                  onChange={(e) =>
                    handleDireccionChange("calle", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDireccionChange("altura", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDireccionChange("piso", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDireccionChange("departamento", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDireccionChange("ciudad", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDireccionChange("provincia", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDireccionChange("codigoPostal", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDireccionChange("pais", e.target.value)
                  }
                  autoComplete="country-name"
                  required
                  errorId="paisError"
                />
              </div>
            </div>
          )}

          <button type="submit" className="form-btn" disabled={enviando}>
            <span className="btn-text">
              {enviando ? "Guardando..." : "Guardar Cambios"}
            </span>
          </button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default EditarUsuarioForm;
