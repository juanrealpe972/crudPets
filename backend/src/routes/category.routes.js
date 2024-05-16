import { Router } from "express";
import { createCategory, listarCategory } from "../controllers/category.controller.js";
import { verificarUserToken } from "../controllers/user.controller.js";

const routerCategory = Router()

routerCategory.post("/category", verificarUserToken, createCategory)
routerCategory.get("/category", verificarUserToken, listarCategory)

export default routerCategory