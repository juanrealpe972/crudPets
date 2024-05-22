import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

import bg from "../assets/bg.jpg";
import photoIcon from "../assets/photo-lg-0.jpg";
import iconoClose from "../assets/btn-close.jpg";
import save from "../assets/btn-save.jpg";
import update from "../assets/btn-update.jpg";
import iconCamera from "../assets/iconCameraPng.png";

import { useHelpsContext } from "../context/HelpsContext.jsx";

const FormMascotas = () => {
  const {
    createMascotas,
    updateMascotas,
    idMascota,
    generos,
    getGeneros,
    getRazas,
    razas,
    getCategorias,
    categorias,
  } = useHelpsContext();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    nombre: "",
    raza: "",
    categoria: "",
    image: "",
    genero: "",
  });

  const mode = ""

  useEffect(() => {
    getGeneros();
    getCategorias();
    getRazas();
  }, []);

  useEffect(() => {
    if (mode === "update" && idMascota) {
      setFormData({
        nombre: idMascota.nombre_mascota,
        raza: idMascota.raza,
        categoria: idMascota.categoria,
        image: idMascota.imagen,
        genero: idMascota.genero,
      });
      console.log("Datos mascota:", idMascota);
    }
  }, [mode, idMascota]);

  const logout = () => {
    localStorage.clear();
    alert("Cierre de sesión éxitoso");
    navigate(`/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosSubmit = new FormData();
    datosSubmit.append("nombre_mascota", formData.nombre);
    datosSubmit.append("fk_raza", formData.raza);
    datosSubmit.append("fk_categoria", formData.categoria);
    datosSubmit.append("imagen", formData.image);
    datosSubmit.append("fk_genero", formData.genero);
    datosSubmit.append("fk_user", user.id);
    try {
      if (mode === "update") {
        await updateMascotas(idMascota, datosSubmit);
      } else {
        await createMascotas(datosSubmit);
      }
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex mt-14 items-center justify-between">
        <FaAngleLeft
          className="mr-20 flex text-white text-xl cursor-pointer"
          onClick={() => navigate("/listpets")}
        />
        <label className="flex mr-20 text-white font-semibold">
          {mode === "create" ? "Adicionar mascota" : "Actualizar mascota"}
        </label>
        <img
          className="flex justify-between rounded-full cursor-pointer"
          src={iconoClose}
          onClick={() => logout()}
          alt=""
        />
      </div>
      <div className="mt-10">
        <img className="rounded-full" src={photoIcon} alt="" />
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm pt-12">
        <div className="mb-4">
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre de la mascota"
            value={formData.nombre}
            onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  nombre: e.target.value,
                }))
            }
            className="w-full bg-[#96a2ba] px-3 py-2 rounded-2xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950"
            style={{ height: "40px", width: "90%" }}
            required
          />
        </div>
        <div className="mb-4">
          <select
            className="w-[355px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 bg-transparent focus:outline-none ml-4 placeholder-blue-950"
            name="raza"
            id="raza"
            onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  raza: e.target.value,
                }))
            }
            value={formData.raza}
          >
            <option value="" hidden>
              Seleccionar la raza...
            </option>
            {razas.map((race, i) => (
              <option key={i} value={race.id_razas}>
                {race.nombre_razas}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="w-[355px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 bg-transparent focus:outline-none ml-4 placeholder-blue-950"
            name="categoria"
            value={formData.categoria}
            onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  categoria: e.target.value,
                }))
            }
          >
            <option value="" hidden>
              Seleccionar la categoría...
            </option>
            {categorias.map((category, i) => (
              <option key={i} value={category.id_categorias}>
                {category.nombre_categorias}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mb-4 w-[355px] ml-4 bg-[#96a2ba] p-2 rounded-2xl">
          <input type="file" className="opacity-0 w-0 h-0" />
          <label htmlFor="fileInput" className="cursor-pointer text-blue-950">
            Seleccionar imagen
          </label>
          <img
            src={iconCamera}
            alt="iconCamera"
            className="absolute top-0 right-2 mt-3 ml-3 rounded-full"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="mb-4">
          <select
            className="w-[355px] bg-[#96a2ba] px-2 py-2 rounded-2xl text-blue-950 border border-gray-400 bg-transparent focus:outline-none ml-4 placeholder-blue-950"
            name="genero"
            value={formData.genero}
            onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  genero: e.target.value,
                }))
            }
          >
            <option value="" hidden>
              Seleccionar el género...
            </option>
            {generos.map((gender, i) => (
              <option key={i} value={gender.id_generos}>
                {gender.nombre_generos}
              </option>
            ))}
          </select>
        </div>
        <button>
          {mode === "create" ? (
            <img
              src={save}
              alt="Guardar"
              onSubmit={handleSubmit}
              style={{ width: "90%" }}
              className="rounded-full ml-5 cursor-pointer"
            />
          ) : (
            <img
              src={update}
              alt="Modificar"
              onSubmit={handleSubmit}
              style={{ width: "90%" }}
              className="rounded-full ml-5 cursor-pointer"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default FormMascotas;
