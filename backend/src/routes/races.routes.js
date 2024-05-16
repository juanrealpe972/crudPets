import { Router } from "express";
import { createRaces, listarRaces } from "../controllers/races.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routerRaces = Router()

routerRaces.post("/races", verificarUserToken, createRaces)
routerRaces.get("/races", verificarUserToken, listarRaces)

export default routerRaces