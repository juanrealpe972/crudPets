import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import routerUser from "./src/routes/user.routes.js"
import routerCategory from "./src/routes/category.routes.js";
import routerGenders from "./src/routes/genders.routes.js";
import routerRaces from "./src/routes/races.routes.js";
import routerPets from "./src/routes/pets.routes.js";

const app = express()
app.use(cors())
app.use(bodyParser.json());

const PORT = 4002

app.use("/v1", routerUser)
app.use("/v1", routerCategory)
app.use("/v1", routerGenders)
app.use("/v1", routerRaces)
app.use("/v1", routerPets)

app.use(express.static('./public'))

app.listen(PORT, () => {
    console.log("Servidor se esta ejecutando en el puerto: ", PORT);
})