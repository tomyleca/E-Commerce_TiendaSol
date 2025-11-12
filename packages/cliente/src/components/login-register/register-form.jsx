import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import "./register-form.css";
import { crearUsuario } from "../../services/usuarioService.js";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
	//para evitar doble envio
    if (enviando) return;

    // Validación mínima en cliente
    if (!usuario.email?.trim() || !usuario.username?.trim() || !usuario.password) {
      toast.error("Completá email, username y contraseña.");
      return;
    }
    if (usuario.password !== usuario.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      setEnviando(true);
      const creado = await crearUsuario(usuario);
      toast.success("Usuario creado con éxito.");
      // Redirigir a login
      navigate("/login");
    } catch (err) {
      const msg = err?.message || "Error desconocido creando el usuario";
      toast.error(`No se pudo crear el usuario: ${msg}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Crear Cuenta</h2>
        </div>

  <form className="register-form" id="registerForm" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Email"
                value={usuario.email}
                onChange={(e) =>
                  setUsuario((u) => ({ ...u, email: e.target.value }))
                }
                className={usuario.email ? "has-value" : ""}
              />
              <label htmlFor="email">Email</label>
            </div>

            <span className="error-message" id="emailError"></span>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                name="username"
                required
                autoComplete="username"
                placeholder="Username"
                value={usuario.username}
                onChange={(e) =>
                  setUsuario((u) => ({ ...u, username: e.target.value }))
                }
                className={usuario.username ? "has-value" : ""}
              />
              <label htmlFor="username">Username</label>
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
                value={usuario.password}
                onChange={(e) =>
                  setUsuario((u) => ({ ...u, password: e.target.value }))
                }
                className={usuario.password ? "has-value" : ""}
              />
              <label htmlFor="password">Contraseña</label>
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
          <div className="form-group">
            <div className="input-wrapper password-wrapper">
              <input
                type={mostrarConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                required
                autoComplete="new-password"
                placeholder="Confirmar contraseña"
                value={usuario.confirmPassword}
                onChange={(e) =>
                  setUsuario((u) => ({ ...u, confirmPassword: e.target.value }))
                }
                className={usuario.confirmPassword ? "has-value" : ""}
              />
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <button
                type="button"
                className="password-toggle"
                id="confirmPasswordToggle"
                aria-label="Mostrar/ocultar contraseña"
                aria-pressed={mostrarConfirmPassword}
                title={
                  mostrarConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                onClick={() => setMostrarConfirmPassword((v) => !v)}
              >
                <span
                  className={`eye-icon${mostrarConfirmPassword ? " show-password" : ""}`}
                ></span>
              </button>
            </div>
            <span className="error-message" id="passwordError"></span>
          </div>

          <div className="form-options" style={{ display: "none" }}></div>

          <button type="submit" className="form-btn" disabled={enviando}>
            <span className="btn-text">Registrarse</span>
            <span className="btn-loader"></span>
          </button>
        </form>

        <div className="signup-link">
          <p>
            ¡Ya tengo una cuenta! <Link to="/login">Iniciar sesión</Link>
          </p>
        </div>

        <div className="success-message" id="successMessage">
          <div className="success-icon">✓</div>
          <h3>¡Inicio de sesión exitoso!</h3>
          <p>Redirigiendo al home…</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
