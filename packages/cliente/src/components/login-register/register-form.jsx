import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import "./register-form.css";
import { crearUsuario } from "../../services/usuarioService.js";
import toast from "react-hot-toast";
import InputField from "../../components/input-field/InputField.jsx";

const RegisterForm = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //para evitar doble envio
    if (enviando) return;

    // Validación mínima en cliente
    if (
      !usuario.email?.trim() ||
      !usuario.username?.trim() ||
      !usuario.password
    ) {
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

        <form
          className="register-form"
          id="registerForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            value={usuario.email}
            onChange={(e) =>
              setUsuario((u) => ({ ...u, email: e.target.value }))
            }
            autoComplete="email"
            required
            errorId="emailError"
          />

          <InputField
            id="username"
            name="username"
            type="text"
            label="Username"
            placeholder="Username"
            value={usuario.username}
            onChange={(e) =>
              setUsuario((u) => ({ ...u, username: e.target.value }))
            }
            autoComplete="username"
            required
            errorId="usernameError"
          />

          <InputField
            id="password"
            name="password"
            label="Contraseña"
            placeholder="Contraseña"
            value={usuario.password}
            onChange={(e) =>
              setUsuario((u) => ({ ...u, password: e.target.value }))
            }
            autoComplete="current-password"
            required
            errorId="passwordError"
            showPasswordToggle
          />

          <InputField
            id="confirm-password"
            name="confirm-password"
            label="Confirmar Contraseña"
            placeholder="Confirmar contraseña"
            value={usuario.confirmPassword}
            onChange={(e) =>
              setUsuario((u) => ({ ...u, confirmPassword: e.target.value }))
            }
            autoComplete="new-password"
            required
            errorId="confirmPasswordError"
            showPasswordToggle
          />

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
