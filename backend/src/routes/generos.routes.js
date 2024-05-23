import { Router } from "express";
import { listarGeneros } from "../controllers/genero.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const routeGeneros = Router();

routeGeneros.get("/generos", validarToken, listarGeneros);

export default routeGeneros;
