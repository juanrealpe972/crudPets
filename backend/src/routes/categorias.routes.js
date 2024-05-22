import { Router } from "express";
import { listarCategory } from "../controllers/categorias.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routerCategorias = Router()

routerCategorias.get("/category", verificarUserToken, listarCategory)

export default routerCategorias