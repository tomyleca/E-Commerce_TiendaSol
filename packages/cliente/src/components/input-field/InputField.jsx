import React, { useState } from "react";
import "./InputField.css";

const InputField = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  required = false,
  errorId,
  showPasswordToggle = false,
}) => {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const inputType = showPasswordToggle
    ? mostrarPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="form-group">
      <div
        className={`input-wrapper ${showPasswordToggle ? "password-wrapper" : ""}`}
      >
        <input
          type={inputType}
          id={id}
          name={name}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-label={label}
          value={value}
          onChange={onChange}
          className={value ? "has-value" : ""}
        />
        <label htmlFor={id}>{label}</label>

        {showPasswordToggle && (
          <button
            type="button"
            className="password-toggle"
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
        )}
      </div>
      <span className="error-message" id={errorId}></span>
    </div>
  );
};

export default InputField;
