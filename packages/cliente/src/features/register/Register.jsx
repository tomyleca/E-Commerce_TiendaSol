import { useState } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import RegisterForm from "../../components/login-register/register-form.jsx";
import "../../index.css";

const Register = () => {
        return (
            <>
            <Navbar minimalist />
        <div className="register-page">
            <RegisterForm />
        </div>
        </>
    );
};

export default Register;