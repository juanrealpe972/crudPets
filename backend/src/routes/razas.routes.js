import { Router } from "express";
import { listarRazas } from "../controllers/raza.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const routeRazas = Router();

routeRazas.get("/razas", validarToken, listarRazas);

export default routeRazas;
