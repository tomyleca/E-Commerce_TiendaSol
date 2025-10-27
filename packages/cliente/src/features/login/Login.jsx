import { useState } from "react";
import "./Login.css";
import Navbar from "../../components/navbar/navbar.jsx";
import LoginForm from "../../components/login-register/login-form.jsx";
import "../../index.css";

const Login = () => {
        return (
            <>
                <Navbar minimalist />
        <div className="login-page">
            <LoginForm />
        </div>
        </>
    );
};
export default Login;