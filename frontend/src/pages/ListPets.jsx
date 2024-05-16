import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bg from "../../src/assets/bg.jpg";
import btnAdd from "../../src/assets/btn-add.jpg";
import iconClose from "../../src/assets/btn-close.jpg";
import dog from "../../src/assets/photo-sm-1.jpg";
import lupa from "../../src/assets/btn-show.jpg";
import iconEdit from "../../src/assets/btn-edit.jpg";
import iconDelete from "../../src/assets/btn-delete.jpg";

const ListarMascota = () => {
  const [mode, setmode] = useState([]);
  const [abrirPage, setabrirPage] = useState(false);

  const navigate = useNavigate();

  const actualizar = () => {
    navigate("/actualizar");
  };
  const ajajja = () => {
    navigate("/actualizar");
  };

  const consultar = () => {
    navigate("/consultar");
  };

  const logout = () => {
    navigate("/registerPet");
    alert("Logout")
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex my-12 justify-center">
        <p className="text-white font-semibold">
          Administrar Mascotas
        </p>
        <div className="ml-12">
          <img className="rounded-full cursor-pointer" src={iconClose} onClick={() => logout()} />
        </div>
      </div>
      <div className="">
        <img
          className="rounded-full cursor-pointer"
          src={btnAdd}
          onClick={() => navigate('/registerPet')}
        />
      </div>
      <div className="flex items-center bg-slate-300 mt-4 w-[360px] rounded-2xl h-24">
        <div>
          <img className="rounded-full ml-3" src={dog} alt="" />
        </div>
        <div className="flex flex-col ml-4">
          <label> Karsten </label>
          <label> Bulldog </label>
        </div>
        <div className="flex flex-row ml-20">
          <img
            className="rounded-full mr-2 cursor-pointer"
            src={lupa}
            onClick={consultar}
            alt=""
          />
          <img
            className="rounded-full mr-2 cursor-pointer"
            src={iconEdit}
            onClick={() => ajajja()}
            alt=""
          />
          <img
            className="rounded-full mr-2 cursor-pointer"
            src={iconDelete}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ListarMascota;
