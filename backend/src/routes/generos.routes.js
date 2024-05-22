import { Router } from "express";
import { listarGenders } from "../controllers/generos.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routerGeneros = Router()

routerGeneros.get("/gender", verificarUserToken, listarGenders)

export default routerGeneros