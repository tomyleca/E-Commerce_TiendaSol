import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import "./login-form.css";
import { loginUsuario } from "../../services/usuarioService.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import InputField from "../../components/input-field/InputField.jsx";


const LoginForm = () => {
  const [usuario, setUsuario] = useState({ email: "", password: "" });
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
          <InputField
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            label="Email o Nombre de Usuario"
            placeholder="Email o Nombre de Usuario"
            value={usuario.email || usuario.username || ""}
            onChange={(e) => {
              if (e.target.value.includes("@")) {
                setUsuario((u) => ({ ...u, email: e.target.value, username: null }));
              } else {
                setUsuario((u) => ({ ...u, username: e.target.value, email: null }));
              }
            }}
            autoComplete="username"
            required
            errorId="emailError"
          />

          <InputField
            id="password"
            name="password"
            label="Contraseña"
            placeholder="Contraseña"
            value={usuario.password}
            onChange={(e) => setUsuario((u) => ({ ...u, password: e.target.value }))}
            autoComplete="current-password"
            required
            errorId="passwordError"
            showPasswordToggle
          />

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
