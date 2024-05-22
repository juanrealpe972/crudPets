import React, { createContext, useContext, useState } from "react";
import {
  createMascota,
  eliminarMascota,
  getCategory,
  getGenders,
  getMascotaForId,
  getMascotas,
  getRaces,
  updateMascota,
} from "../api/api.js";

export const HelpsContext = createContext();

export const useHelpsContext = () => {
    const context = useContext(HelpsContext)
    if (!context) {
      throw new Error('Debes usar HelpsProvider en el App')
    }
    return context;
  }

export const HelpsProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState([]);
  const [idMascota, setIdMascota] = useState(0);

  const [generos, setGeneros] = useState([]);
  const [razas, setRazas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const getTodasMascotas = async () => {
    try {
      const response = await getMascotas();
      setMascotas(response.data);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const getGeneros = async () => {
    try {
      const response = await getGenders();
      setGeneros(response.data.data);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  }

  const getRazas = async () => {
    try {
      const response = await getRaces();
      setRazas(response.data.data);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  }

  const getCategorias = async () => {
    try {
      const response = await getCategory();
      setCategorias(response.data.data);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  }

  const getMascota = async (id) => {
    try {
      const response = await getMascotaForId();
      setMascota(response.data);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const createMascotas = async (data) => {
    try {
      const response = await createMascota(data);
      alert(response.data.message);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const updateMascotas = async (id, data) => {
    try {
      const response = await updateMascota(id, data);
      alert(response.data.message);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const deleteMascotas = async (id) => {
    try {
      const response = await eliminarMascota(id);
      getTodasMascotas()
      alert(response.data.message);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  return (
    <HelpsContext.Provider
      value={{
        getTodasMascotas,
        getMascota,
        createMascotas,
        updateMascotas,
        deleteMascotas,

        getGeneros,
        getRazas,
        getCategorias,

        generos,
        razas,
        categorias,

        mascotas,
        mascota,
        idMascota, 
        setIdMascota,
      }}
    >
      {children}
    </HelpsContext.Provider>
  );
};
