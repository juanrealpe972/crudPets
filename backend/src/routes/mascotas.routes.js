import { Router } from "express";
import { registrarMascota, listarMascotas, actualizarMascota, eliminarMascota, buscarMascota, cargarImagen } from "../controllers/mascotas.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routeMascotas = Router()

routeMascotas.get('/pets', verificarUserToken, listarMascotas)
routeMascotas.post('/pets', verificarUserToken, cargarImagen, registrarMascota)
routeMascotas.put('/pets/:id', verificarUserToken, actualizarMascota)
routeMascotas.get('/pets/:id', verificarUserToken, buscarMascota)
routeMascotas.delete('/pets/:id', verificarUserToken, eliminarMascota)

export default routeMascotas