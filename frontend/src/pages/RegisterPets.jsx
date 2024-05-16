import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

import axiosClient from "../api/axios";

import img from "../../src/assets/bg.jpg";
import photoIcon from "../../src/assets/photo-lg-0.jpg";
import iconClose from "../../src/assets/btn-close.jpg";
import save from "../../src/assets/btn-save.jpg";
import iconCamera from "../../src/assets/iconCameraPng.png";
import HelpContext from "../context/HelpContext";

const RegisterPets = ({ mode }) => {
  const navigate = useNavigate();
  const {
    getGeneros,
    getCategorias,
    getRazas,
    generos,
    razas,
    categorias,
    createPet,
  } = useContext(HelpContext);

  const [formData, setFormData] = useState({
    nombre: "",
    raza: "",
    categoria: "",
    imagen: "",
    genero: "",
  });

  useEffect(() => {
    getGeneros();
    getCategorias();
    getRazas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const data = {
        nombre: formData.nombre,
        genero: formData.genero,
        categoria: formData.categoria,
        raza: formData.raza,
        imagen: formData.imagen,
      };
      if (mode === "create") {
        createPet(data);
      }
    } catch (error) {}
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex mt-12 items-center justify-between">
        <FaAngleLeft
          className="mr-20 flex text-white text-xl cursor-pointer"
          onClick={() => navigate("/listpets")}
        />
        <label className="flex mr-20 text-white font-semibold">
          {mode === "create" ? "Adicionar Mascota" : "Modificar Mascota"}
        </label>
        <img
          className="flex justify-between rounded-full"
          src={iconClose}
          alt=""
        />
      </div>
      <div className="mt-10">
        {mode === "update" && typeof formData.imagen === "object" ? (
          <img
            src={URL.createObjectURL(formData.imagen)}
            alt="user"
            className="h-36 w-36 object-cover rounded-full mx-auto"
          />
        ) : (
          <img
            src={photoIcon}
            alt="user"
            className="h-36 w-36 object-cover rounded-full mx-auto"
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm pt-14">
        <div className="mb-4">
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre de la mascota"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950"
            style={{ height: "40px", width: "90%" }}
            required
          />
        </div>
        <div className="mb-4">
          <select
            className="w-[345px] bg-slate-500 px-3 py-2 text-slate-800 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5"
            name="raza"
            id="raza"
            value={formData.raza}
            onChange={handleChange}
          >
            <option value="" hidden>
              Seleccionar la raza...
            </option>
            {razas.map((race) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="w-[345px] bg-slate-500 px-3 py-2 text-slate-800 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="" hidden>
              Seleccionar la categoría...
            </option>
            {categorias.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mb-4">
          <input
            placeholder="Imagen de usuario"
            type="file"
            name="image"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer items-center w-[345px] flex justify-center bg-slate-500 rounded-full border-gray-400 border ml-5"
          >
            {formData.imagen ? (
              <div className="relative">
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 bg-slate-500 rounded-full"
                  onClick={() => setFormData({ ...formData, imagen: "" })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center text-slate-800 w-[345px] h-10 border  rounded-full bg-transparent focus:outline-none transition duration-300">
                <span className="text-black text-left">
                  Seleccionar imagen
                </span>
              </div>
            )}
          </label>
          <img
            src={iconCamera}
            alt="iconCamera"
            className="absolute top-0 right-8 mt-3 ml-3 rounded-full"
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <div className="mb-4">
          <select
            className="w-[345px] bg-slate-500 px-3 py-2 text-slate-800 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
          >
            <option value="" hidden>
              Seleccionar el género...
            </option>
            {generos.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">
          <img
            className="rounded-full ml-5 cursor-pointer"
            style={{ width: "90%" }}
            src={save}
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default RegisterPets;
