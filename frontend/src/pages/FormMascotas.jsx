import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import img from "../assets/bg.jpg";
import photoIcon from "../assets/photo-lg-0.jpg";
import iconClose from "../assets/btn-close.jpg";
import save from "../assets/btn-save.jpg";
import modificar from "../assets/btn-update.jpg";
import iconCamera from "../assets/iconCameraPng.png";
import { useHelpsContext } from "../context/HelpsContext.jsx";
import axiosClient from "../api/axiosClient.js";

const FormMascotas = () => {
  const [generos, setGeneros] = useState([]);
  const [razas, setRazas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { idMascota, mode, mascota, getMascotasId } = useHelpsContext();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    image: "",
    raza: "",
    genero: "",
  });

  useEffect(() => {
    axiosClient.get("/v1/generos").then((response) => {
      setGeneros(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get("/v1/razas").then((response) => {
      setRazas(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get("/v1/categorias").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  useEffect(() => {
    if (mode === "update" && idMascota) {
      getMascotasId(idMascota);
    }
  }, [mode, idMascota]);

  useEffect(() => {
    if (mascota && mode === "update") {
      setFormData({
        nombre: mascota.nombre_mascota || "",
        categoria: mascota.id_categoria || "",
        image: mascota.image || "",
        genero: mascota.id_genero || "",
        raza: mascota.id_raza || "",
      });
    }
  }, [mascota, mode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const createMascotas = async (data) => {
    try {
      axiosClient.post("/v1/mascotas", data).then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          navigate("/listpets");
        } else {
          alert(response.data.message);
        }
      });
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const updateMascotas = (id, data) => {
    try {
      axiosClient.put(`/v1/mascotas/${id}`, data).then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          navigate("/listpets");
        } else {
          alert(response.data.message);
        }
      });
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosSubmit = new FormData();
    datosSubmit.append("nombre", formData.nombre);
    datosSubmit.append("raza", formData.raza);
    datosSubmit.append("categoria", formData.categoria);
    datosSubmit.append("image", formData.image);
    datosSubmit.append("genero", formData.genero);
    try {
      if (mode === "update") {
        updateMascotas(idMascota, datosSubmit);
      } else {
        datosSubmit.append("fk_user", user.id_user);
        createMascotas(datosSubmit);
      }
    } catch (error) {
      console.log("Error del servidor" + error);
    }
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
          {mode === "create" ? "Adicionar mascota" : "Actualizar mascota"}
        </label>
        <img
          className="flex justify-between rounded-full"
          src={iconClose}
          alt=""
        />
      </div>
      <div className="mt-16">
        <img
          className={`rounded-full ${mode === "update" ? "w-40 h-40" : ""}`}
          src={
            mode === "create"
              ? photoIcon
              : `http://localhost:4001/img/${mascota.image}`
          }
          alt="Foto de mascota"
        />
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm pt-24">
        <div className="mb-4">
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-[355px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 bg-transparent focus:outline-none ml-4 placeholder-blue-950"
            style={{ height: "40px", width: "90%" }}
            required
          />
        </div>
        <div className="mb-4">
          <select
            className="w-[350px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 bg-transparent focus:outline-none ml-4 placeholder-blue-950"
            value={formData.raza}
            onChange={handleChange}
            name="raza"
            id="raza"
          >
            <option value="" hidden>
              Seleccione la raza...
            </option>
            {razas.map((race) => (
              <option key={race.id_raza} value={race.id_raza}>
                {race.nombre_raza}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="w-[350px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 bg-transparent focus:outline-none ml-4 placeholder-blue-950"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            id="categoria"
          >
            <option value="" hidden>
              Seleccione categoria...
            </option>
            {categorias.map((category) => (
              <option key={category.id_categoria} value={category.id_categoria}>
                {category.nombre_categoria}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mb-4 flex justify-center">
          <input
            placeholder="Imagen de usuario"
            type="file"
            name="image"
            className="hidden"
            id="fileInput"
            onChange={handleChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer items-center w-[345px] flex bg-[#8d9db9] rounded-full"
          >
            <div className="flex items-center w-[200px] h-10 transition duration-300">
              <span className="text-blue-950 w-full ml-4">
                Seleccionar imagen
              </span>
            </div>
          </label>
          <img
            src={iconCamera}
            alt="camera"
            className="absolute top-0 right-8 mt-3 ml-3 rounded-full"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="mb-4">
          <div className="relative">
            <select
              className="w-[350px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 bg-transparent focus:outline-none ml-4 placeholder-blue-950"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              id="genero"
            >
              <option value="" hidden>
                Seleccione genero...
              </option>
              {generos.map((gender) => (
                <option key={gender.id_genero} value={gender.id_genero}>
                  {gender.nombre_genero}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button>
          {mode === "create" ? (
            <img
              className="rounded-full ml-5 cursor-pointer"
              style={{ width: "90%" }}
              src={save}
              alt=""
              onSubmit={handleSubmit}
            />
          ) : (
            <img
              className="rounded-full ml-5 cursor-pointer"
              style={{ width: "90%" }}
              src={modificar}
              alt=""
              onSubmit={handleSubmit}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default FormMascotas;
