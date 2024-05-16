import { Router } from "express";
import { createGenders, listarGenders } from "../controllers/genders.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routerGenders = Router()

routerGenders.post("/gender", verificarUserToken, createGenders)
routerGenders.get("/gender", verificarUserToken, listarGenders)

export default routerGenders