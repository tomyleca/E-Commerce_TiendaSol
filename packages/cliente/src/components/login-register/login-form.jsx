import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./form.css";  
import "./login-form.css"
 
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa tus credenciales para acceder a tu cuenta</p>
                </div>

                <form className="login-form" id="loginForm" noValidate>
                    <div className="form-group">
                        <div className="input-wrapper">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                autoComplete="email"
                                                placeholder="Email"
                                                aria-label="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                            <button
                                type="button"
                                className="password-toggle"
                                id="passwordToggle"
                                aria-label="Mostrar/ocultar contraseña"
                                aria-pressed={mostrarPassword}
                                title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                onClick={() => setMostrarPassword((v) => !v)}
                            >
                                <span className={`eye-icon${mostrarPassword ? " show-password" : ""}`}></span>
                            </button>
                        </div>
                        <span className="error-message" id="passwordError"></span>
                    </div>

                    <div className="form-options" style={{ display: "none" }}></div>

                    <button type="submit" className="form-btn">
                        <span className="btn-text">Iniciar Sesión</span>
                        <span className="btn-loader"></span>
                    </button>
                </form>

                <div className="signup-link">
                    <p>
                        ¿No tienes una cuenta? <Link to="/register">Crea una</Link>
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

export default LoginForm;