import { Router } from "express";
import { createUser, validarUser } from "../controllers/user.controller.js";

const routerUser = Router()

routerUser.post("/create_user", createUser)
routerUser.post("/login", validarUser)

export default routerUser