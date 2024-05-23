import { Router } from "express";
import {
  registrarMascota,
  listarMascotas,
  actualizarMascota,
  eliminarMascota,
  buscarMascota,
  cargarImagen,
  cargarImagenUploads,
} from "../controllers/mascotas.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const routeMascotas = Router();

routeMascotas.get("/mascotas", validarToken, listarMascotas);
routeMascotas.post("/mascotas", validarToken, cargarImagen, registrarMascota);
routeMascotas.put("/mascotas/:id", validarToken, cargarImagenUploads, actualizarMascota);
routeMascotas.get("/mascotas/:id", validarToken, buscarMascota);
routeMascotas.delete("/mascotas/:id", validarToken, eliminarMascota);

export default routeMascotas;
