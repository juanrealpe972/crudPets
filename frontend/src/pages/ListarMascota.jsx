import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bg from "../assets/bg.jpg";
import buttonAdd from "../assets/btn-add.jpg";
import iconClose from "../assets/btn-close.jpg";
import lupa from "../assets/btn-show.jpg";
import iconEdit from "../assets/btn-edit.jpg";
import iconDelete from "../assets/btn-delete.jpg";

import { useHelpsContext } from "../context/HelpsContext.jsx";

const ListarMascota = () => {
  const { setIdMascota, getTodasMascotas, mascotas, deleteMascotas } = useHelpsContext();
  const navigate = useNavigate();

  useEffect(() => {
    getTodasMascotas();
  }, []);

  const logout = () => {
    localStorage.clear();
    alert("Cierre de sesión éxitoso");
    navigate(`/`);
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
      <div className="flex my-2 justify-center mt-12">
        <p className="text-white font-semibold">Administrar Mascotas</p>
        <div className="ml-10">
          <img
            className="rounded-full cursor-pointer"
            src={iconClose}
            alt="Cerrar"
            onClick={() => logout()}
          />
        </div>
      </div>
      <div className="mt-2">
        <img
          className="rounded-full cursor-pointer"
          src={buttonAdd}
          onClick={() => navigate("/registerpet")}
          alt="Registrar"
        />
      </div>
      <div className="mt-4 w-[360px] max-w-md overflow-y-auto" style={{ maxHeight: "60vh" }}>
        {mascotas ? (
          mascotas.map((mascota) => (
            <div
              key={mascota.id}
              className="flex items-center bg-slate-300 mt-4 w-full rounded-2xl h-24"
            >
              <div className="flex w-[90px] h-20 overflow-hidden rounded-l-2xl">
                <img
                  className="object-cover rounded-full ml-2"
                  alt={mascota.imagen}
                  src={`http://localhost:4001/img/${mascota.imagen}`}
                />
              </div>
              <div className="flex flex-col justify-center ml-2 w-24">
                <label className="truncate">{mascota.nombre_mascota}</label>
                <label className="truncate">{mascota.raza}</label>
              </div>
              <div className="flex flex-row ml-auto mr-4">
                <img
                  className="rounded-full mr-2 cursor-pointer"
                  src={lupa}
                  onClick={() => {
                    navigate(`/listar`);
                    setIdMascota(mascota.id);
                  }}
                  alt="Listar"
                />
                <img
                  className="rounded-full mr-2 cursor-pointer"
                  src={iconEdit}
                  onClick={() => {
                    navigate(`/actualizar`);
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
          <p>No hay mascotas registradas</p>
        )}
      </div>
    </div>
  );
};

export default ListarMascota;
