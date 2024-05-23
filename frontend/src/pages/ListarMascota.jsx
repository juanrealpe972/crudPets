import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import img from "../assets/bg.jpg";
import buttonAdd from "../assets/btn-add.jpg";
import iconClose from "../assets/btn-close.jpg";
import lupa from "../assets/btn-show.jpg";
import iconEdit from "../assets/btn-edit.jpg";
import iconDelete from "../assets/btn-delete.jpg";

import { useHelpsContext } from "../context/HelpsContext.jsx";
import axiosClient from "../api/axiosClient.js";

const ListarMascota = () => {
  const [mascotas, setMascotas] = useState([]);
  const { getMascotasId, setIdMascota, setMode } = useHelpsContext();
  const navigate = useNavigate();

  useEffect(() => {
    getMascotas();
  }, []);

  const getMascotas = () => {
    axiosClient.get(`/v1/mascotas`).then((response) => {
      setMascotas(response.data);
    });
  };

  const deleteMascotas = (id) => {
    try {
      axiosClient.delete(`/v1/mascotas/${id}`).then((response) => {
        if (response.status == 200) {
          alert(response.data.message);
          getMascotas();
        } else {
          alert(response.data.message);
        }
      });
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
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
      <div className="flex flex-row mt-28 justify-center">
        <label className="text-white font-semibold">Administrar Mascotas</label>
        <div className="ml-10">
          <img
            className="rounded-full cursor-pointer"
            src={iconClose}
            onClick={() => logout()}
            alt="Cerrar"
          />
        </div>
      </div>
      <div className="mt-10">
        <img
          className="rounded-full cursor-pointer"
          src={buttonAdd}
          onClick={() => {
            setMode("create");
            navigate("/register");
          }}
          alt="Agregar"
        />
      </div>
      <div
        className="flex flex-col items-center w-[400px] max-w-4xl overflow-hidden mt-6"
        style={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {mascotas.length > 0 ? (
          mascotas.map((mascota) => (
            <div
              key={mascota.id}
              className="flex items-center bg-slate-300 mt-4 w-[360px] rounded-2xl h-24"
            >
              <div className="flex w-[90px] h-20 overflow-hidden rounded-l-2xl">
                <img
                  className="object-cover rounded-full ml-2"
                  alt={mascota.imagen}
                  src={`http://localhost:4001/img/${mascota.image}`}
                />
              </div>
              <div className="flex text-sm flex-col justify-center ml-2 w-24">
                <label className="truncate">{mascota.nombre_mascota}</label>
                <label className="truncate">{mascota.nombre_raza}</label>
              </div>
              <div className="flex flex-row ml-auto mr-4">
                <img
                  className="rounded-full mr-2 cursor-pointer"
                  src={lupa}
                  onClick={() => {
                    getMascotasId(mascota.id);
                    navigate(`/consultar/${mascota.id}`);
                  }}
                  alt="Consultar"
                />
                <img
                  className="rounded-full mr-2 cursor-pointer"
                  src={iconEdit}
                  onClick={() => {
                    setMode("update");
                    navigate(`/actualizar/${mascota.id}`);
                    setIdMascota(mascota.id);
                  }}
                  alt="Actualizar"
                />
                <img
                  className="rounded-full mr-2 cursor-pointer"
                  src={iconDelete}
                  alt="Eliminar"
                  onClick={() => deleteMascotas(mascota.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No hay mascotas registradasd</p>
        )}
      </div>
    </div>
  );
};

export default ListarMascota;
