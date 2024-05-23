import { Router } from "express";
import { createUser, validar } from "../controllers/user.controller.js";

const routeUser = Router();

routeUser.post("/login", validar);
routeUser.post("/crearUser", createUser);

export default routeUser;
