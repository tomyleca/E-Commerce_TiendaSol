import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import LoginForm from "../../components/login-register/login-form.jsx";
import "../../index.css";

const Login = () => {
  return (
    <div className="auth-layout">
      {/* Panel izquierdo — identidad */}
      <div className="auth-side" aria-hidden="true">
        <div className="auth-side__inner">
          <img src="/tiendaSolLogo.png" alt="" className="auth-side__logo" />
          <h1 className="auth-side__brand">Tienda Sol</h1>
          <p className="auth-side__tagline">
            Tu marketplace de confianza.<br />Compra y vende sin límites.
          </p>
          <div className="auth-side__dots">
            <span className="auth-dot auth-dot--active" />
            <span className="auth-dot" />
            <span className="auth-dot" />
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="auth-main">
        <div className="auth-main__inner">
          <Link to="/" className="auth-back">
            ← Volver al inicio
          </Link>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
