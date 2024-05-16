import React, { createContext, useEffect, useState } from "react";

import {
  createMascota,
  getGenders,
  getMascotaForId,
  getMascotas,
  getRaces,
  getCategory,
} from "../api/api.help";
import { useNavigate } from "react-router-dom";

const HelpContext = createContext();

export const HelpProvider = ({ children }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [idMascota, setIdMascota] = useState(0);

  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [razas, setRazas] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  const [mascotaForuser, setMascotaForUser] = useState([]);

  const getPets = async () => {
    try {
      const response = await getMascotas();
      setMascotas(response.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const getGeneros = async () => {
    try {
      const response = await getGenders();
      setGeneros(response.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const getCategorias = async () => {
    try {
      const response = await getCategory();
      setCategorias(response.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const getRazas = async () => {
    try {
      const response = await getRaces();
      setRazas(response.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const getPetsForUser = async (id) => {
    try {
      const response = await getMascotaForId(id);
      setMascotaForUser(response.data);
      getPets();
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const createPet = async (data) => {
    try {
      const response = await createMascota(data);
      setMascotas(response.data);
      Swal.fire({
        title: response.data.message,
        text: response.data.message,
        icon: "success",
        confirmButtonText: "Cool",
      });
      getPets();
      navigate("/listpets");
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updatePet = async (id, data) => {
    try {
      const response = await updateMascota(id, data);
      setMascotas(response.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };
  const deletePet = async (id) => {
    try {
      const response = await eliminarMascota(id);
      setMascotas(response.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <HelpContext.Provider
      value={{
        errors,
        mascotas,
        generos,
        categorias,
        razas,
        mascotaForuser,
        idMascota,
        setIdMascota,
        getPets,
        getPetsForUser,
        getGeneros,
        getCategorias,
        getRazas,
        createPet,
        updatePet,
        deletePet,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
};

export default HelpContext;
