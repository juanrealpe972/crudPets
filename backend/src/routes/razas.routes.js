import { Router } from "express";
import { listarRaces } from "../controllers/razas.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routerRazas = Router()

routerRazas.get("/razas", verificarUserToken, listarRaces)
 
export default routerRazas