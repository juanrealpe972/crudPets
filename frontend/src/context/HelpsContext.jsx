import React, { createContext, useContext, useState } from "react";
import axiosClient from "../api/axiosClient.js";

export const HelpsContext = createContext();

export const useHelpsContext = () => {
  const context = useContext(HelpsContext)
  if (!context) {
    throw new Error('Debes usar HelpsProvider en el App')
  }
  return context;
}

export const HelpsProvider = ({ children }) => {
  const [mascota, setMascota] = useState([]);
  const [idMascota, setIdMascota] = useState(0);
  const [mode, setMode] = useState("create");

  const getMascotasId = async (id) => {
    try {
      const response = await axiosClient.get(`/v1/mascotas/${id}`);
      setMascota(response.data[0]);
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };
  return (
    <HelpsContext.Provider
      value={{
        idMascota,
        mascota,
        mode,
        setMode,
        setMascota,
        setIdMascota,
        getMascotasId,
      }}
    >
      {children}
    </HelpsContext.Provider>
  );
};
