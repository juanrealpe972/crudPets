import { Router } from "express";
import { createUser, validarUser } from "../controllers/user.controller.js";

const routerUser = Router()

routerUser.post('/login', validarUser)
routerUser.post('/create', createUser)

export default routerUser