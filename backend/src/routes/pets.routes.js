import { Router } from "express";
import { actualizarPets, buscarPets, cargarImagen, createPets, eliminarPets, listarPets } from "../controllers/pets.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routerPets = Router();

routerPets.get("/pets", verificarUserToken, listarPets);
routerPets.post("/pets", verificarUserToken, cargarImagen, createPets);
routerPets.put("/pets/:id", verificarUserToken, actualizarPets);
routerPets.delete("/pets/:id", verificarUserToken, eliminarPets);
routerPets.get("/petsid/:id", verificarUserToken, buscarPets);

export default routerPets;
