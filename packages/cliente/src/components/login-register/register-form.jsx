import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./form.css";  
import "./register-form.css"

const RegisterForm = () => {
	 const [email, setEmail] = useState("");
	 const [username, setUsername] = useState("");
	 const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [mostrarPassword, setMostrarPassword] = useState(false);
	const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
	
		return (
			<div className="register-container">
				<div className="register-card">
					<div className="register-header">
						<h2>Crear Cuenta</h2>
					</div>
	
					<form className="register-form" id="registerForm" noValidate>
						<div className="form-group">
							<div className="input-wrapper">
												<input
													type="email"
													id="email"
													name="email"
													required
													autoComplete="email"
													placeholder="Email"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													className={email ? "has-value" : ""}
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
													value={username}
													onChange={(e) => setUsername(e.target.value)}
												className={username ? "has-value" : ""}
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
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													className={password ? "has-value" : ""}
												/>
												<label htmlFor="password">Contraseña</label>
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
							<div className="form-group">
							<div className="input-wrapper password-wrapper">
												
											<input
												type={mostrarConfirmPassword ? "text" : "password"}
												id="confirm-password"
												name="confirm-password"
												required
												autoComplete="new-password"
												placeholder="Confirmar contraseña"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												className={confirmPassword ? "has-value" : ""}
											/>
												<label htmlFor="confirm-password">Confirmar Contraseña</label>
								<button
									type="button"
									className="password-toggle"
										id="confirmPasswordToggle"
									aria-label="Mostrar/ocultar contraseña"
										aria-pressed={mostrarConfirmPassword}
										title={mostrarConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
										onClick={() => setMostrarConfirmPassword((v) => !v)}
								>
										<span className={`eye-icon${mostrarConfirmPassword ? " show-password" : ""}`}></span>
								</button>
							</div>
							<span className="error-message" id="passwordError"></span>
						</div>
	
						<div className="form-options" style={{ display: "none" }}></div>
	
						<button type="submit" className="form-btn">
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