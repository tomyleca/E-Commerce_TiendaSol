import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import "./login-form.css";
import { loginUsuario } from "../../services/usuarioService.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";


const LoginForm = () => {
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return; // evitar doble envío

    // Validaciones básicas
    if (!usuario.password?.trim()) {
      toast.error("Debes completar la contraseña.");
      return;
    }
    if (!usuario.email?.trim() && !usuario.username?.trim()) {
      toast.error("Debes completar el email.");
      return;
    }

    try {
      setEnviando(true);
      
      const data = await loginUsuario(usuario);
      if (!data) {
        toast.error("Respuesta vacía del servidor");
        return;
      }
      // Guardar usuario en contexto de auth
      login(data);
      toast.success("Sesión iniciada");
      navigate("/");
    } catch (err) {
      const msg = err?.message || "Error desconocido al iniciar sesión";
      toast.error(`No se pudo iniciar sesión: ${msg}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>

        <form className="login-form" id="loginForm" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text"
                id="Email o Nombre de Usuario"
                name="Email o Nombre de Usuario"
                required
                autoComplete="Email o Nombre de Usuario"
                placeholder="Email o Nombre de Usuario"
                aria-label="Email o Nombre de Usuario"
                value={usuario.email ? usuario.email : usuario.username}
                onChange={(e) =>{
                  if (e.target.value.includes("@")) {
					setUsuario((u) => ({ ...u, email: e.target.value }))
					setUsuario((u) => ({ ...u, username: null }))
				  } else {
					setUsuario((u) => ({ ...u, username: e.target.value }))
					setUsuario((u) => ({ ...u, email: null }))
				  }		
                }
				}
              />
            </div>
            <span className="error-message" id="emailError"></span>
          </div>

          <div className="form-group">
            <div className="input-wrapper password-wrapper">
              <input
                type={mostrarPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Contraseña"
                aria-label="Contraseña"
                value={usuario.password}
                onChange={(e) =>
                  setUsuario((u) => ({ ...u, password: e.target.value }))
                }
              />
              <button
                type="button"
                className="password-toggle"
                id="passwordToggle"
                aria-label="Mostrar/ocultar contraseña"
                aria-pressed={mostrarPassword}
                title={
                  mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                onClick={() => setMostrarPassword((v) => !v)}
              >
                <span
                  className={`eye-icon${mostrarPassword ? " show-password" : ""}`}
                ></span>
              </button>
            </div>
            <span className="error-message" id="passwordError"></span>
          </div>

          <div className="form-options" style={{ display: "none" }}></div>

          <button type="submit" className="form-btn" disabled={enviando}>
            <span className="btn-text">{enviando ? "Ingresando..." : "Iniciar Sesión"}</span>
            {enviando && <span className="btn-loader"></span>}
          </button>
        </form>

        <div className="signup-link">
          <p>
            ¿No tienes una cuenta? <Link to="/register">Crea una</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
