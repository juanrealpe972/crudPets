import { Router } from "express";
import { listarCategorias } from "../controllers/categoria.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const routeCategorias = Router();

routeCategorias.get("/categorias", validarToken, listarCategorias);

export default routeCategorias;
