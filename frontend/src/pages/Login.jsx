import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ImagenUser from "../assets/bg-login.svg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:4001/v1/login";
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(URL, data);
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("¡Inicio de sesión éxitoso!");
        navigate("/listpets");
      } else {
        setError("Usuario no registrado");
        setErrorVisible(true);
        setTimeout(() => {
          setErrorVisible(false);
        }, 3000);
      }
    } catch (error) {
      setError("Error en el servidor");
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 5000);
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${ImagenUser})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {errorVisible && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-96 pt-24">
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[40px] w-[90%] text-black bg-white px-3 py-2 rounded-3xl bg-opacity-40 focus:outline-none ml-5"
            required
          />
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              className="h-[40px] w-[90%] text-black bg-white px-3 py-2 rounded-3xl border border-gray-400 bg-opacity-40 focus:outline-none ml-5"
              required
            />
            <div className="absolute inset-y-0 right-3 flex items-center mr-6">
              {showPassword ? (
                <FaEyeSlash
                  className="text-gray-500 cursor-pointer"
                  onClick={handleTogglePassword}
                />
              ) : (
                <FaEye
                  className="text-gray-500 cursor-pointer"
                  onClick={handleTogglePassword}
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="h-[40px] w-[90%] bg-blue-950 rounded-3xl text-white py-2 ml-5 px-4 hover:bg-blue-900"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
