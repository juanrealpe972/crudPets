import axiosClient from "./axiosClient"

export const getMascotas = () => axiosClient.get("/v1/pets")
export const getMascotaForId = (id) => axiosClient.get(`/v1/petsid/${id}`)
export const createMascota = (data) => axiosClient.post("/v1/pets", data)
export const updateMascota = (id, data) => axiosClient.put(`/v1/pets/${id}`, data)
export const eliminarMascota = (id) => axiosClient.delete(`/v1/pets/${id}`)

export const getGenders = () => axiosClient.get("/v1/gender")
export const getRaces = () => axiosClient.get("/v1/razas")
export const getCategory = () => axiosClient.get("/v1/category")