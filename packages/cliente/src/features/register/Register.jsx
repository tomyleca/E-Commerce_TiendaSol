import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/login-register/register-form.jsx";
import "../../index.css";
import "../../features/login/Login.css";
import "./Register.css";

const Register = () => {
  return (
    <div className="auth-layout">
      {/* Panel izquierdo — identidad */}
      <div className="auth-side" aria-hidden="true">
        <div className="auth-side__inner">
          <img src="/tiendaSolLogo.png" alt="" className="auth-side__logo" />
          <h1 className="auth-side__brand">Tienda Sol</h1>
          <p className="auth-side__tagline">
            Creá tu cuenta y empezá a comprar y vender hoy mismo.
          </p>
          <div className="auth-side__dots">
            <span className="auth-dot" />
            <span className="auth-dot" />
            <span className="auth-dot auth-dot--active" />
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="auth-main">
        <div className="auth-main__inner">
          <Link to="/" className="auth-back">
            ← Volver al inicio
          </Link>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
