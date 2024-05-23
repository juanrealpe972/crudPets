import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

import img from "../assets/bg.jpg";
import iconClose from "../assets/btn-close.jpg";
import { useHelpsContext } from "../context/HelpsContext";

const ConsultarMascota = () => {
  const { mascota, getMascotasId } = useHelpsContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    getMascotasId(id);
  }, [id]);

  if (!mascota) {
    return <div>Cargando...</div>;
  }

  useEffect(() => {
    if (mascota && mascota.imagen) {
      const fetchImage = async () => {
        const imgPath = `http://localhost:4001/img/${mascota.imagen}`;
        const uploadsPath = `http://localhost:4001/imguploads/${mascota.imagen}`;

        try {
          const imgResponse = await fetch(imgPath, { method: 'HEAD' });
          if (imgResponse.ok) {
            setImagePath(imgPath);
          } else {
            const uploadsResponse = await fetch(uploadsPath, { method: 'HEAD' });
            if (uploadsResponse.ok) {
              setImagePath(uploadsPath);
            } else {
              setImagePath(''); 
            }
          }
        } catch (error) {
          console.error('Error fetching images:', error);
          setImagePath(''); 
        }
      };
      fetchImage();
    }
  }, [mascota]);

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        backgroundImage: `url(${img})  `,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex mt-28 items-center justify-between">
        <FaAngleLeft
          className="mr-20 flex text-white text-xl cursor-pointer"
          onClick={() => navigate("/listpets")}
        />
        <p className="flex mr-20 text-white font-semibold">
          Consultar mascota
        </p>
        <img
          className="flex justify-between rounded-full"
          src={iconClose}
          alt=""
        />
      </div>
      <div className="mt-16 mb-16">
        {imagePath ? (
          <img className="rounded-full w-40" src={imagePath} alt={mascota.imagen} />
        ) : (
          <p>Imagen no disponible</p>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row mb-2">
          <div className="bg-[#8090AC] h-11 w-28 flex pl-3 items-center rounded-l-xl">
            <p className="text-white text-lg font-semibold">Nombre: </p>
          </div>
          <div className="bg-[#ABB5C7] h-11 w-56 flex pl-3 items-center rounded-r-xl">
            <p className="text-[#2C4674] text-lg font-semibold">
              {mascota.nombre_mascota}
            </p>
          </div>
        </div>
        <div className="flex flex-row mb-2">
          <div className="bg-[#8090AC] h-11 w-28 flex pl-3 items-center rounded-l-xl">
            <p className="text-white text-lg font-semibold">Raza: </p>
          </div>
          <div className="bg-[#ABB5C7] h-11 w-56 flex pl-3 items-center rounded-r-xl">
            <p className="text-[#2C4674] text-lg font-semibold">
              {mascota.nombre_raza}
            </p>
          </div>
        </div>
        <div className="flex flex-row mb-2">
          <div className="bg-[#8090AC] h-11 w-28 flex pl-3 items-center rounded-l-xl">
            <p className="text-white text-lg font-semibold">
              Categoria:
            </p>
          </div>
          <div className="bg-[#ABB5C7] h-11 w-56 flex pl-3 items-center rounded-r-xl">
            <p className="text-[#2C4674] text-lg font-semibold">
              {mascota.nombre_categoria}
            </p>
          </div>
        </div>
        <div className="flex flex-row mb-2">
          <div className="bg-[#8090AC] h-11 w-28 flex pl-3 items-center rounded-l-xl">
            <p className="text-white text-lg font-semibold">Genero: </p>
          </div>
          <div className="bg-[#ABB5C7] h-11 w-56 flex pl-3 items-center rounded-r-xl">
            <p className="text-[#2C4674] text-lg font-semibold">
              {mascota.nombre_genero}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultarMascota;
