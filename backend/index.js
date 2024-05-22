import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'

import routeMascotas from './src/routes/mascotas.routes.js'
import routerUser from './src/routes/user.routes.js'
import routerCategorias from './src/routes/categorias.routes.js'
import routerRazas from './src/routes/razas.routes.js'
import routerGeneros from './src/routes/generos.routes.js'

const app = express()
app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({extend: false}))

const PORT = 4001

app.use('/v1', routerUser)
app.use('/v1', routeMascotas)
app.use('/v1', routerGeneros)
app.use('/v1', routerCategorias)
app.use('/v1', routerRazas)

app.set("view engine", "ejs")
app.set("views", "./view")

app.use(express.static('./public'))
app.get("/document", (req, res) => {
    res.render("document.ejs")
})

app.listen(4001, () => {
    console.log(`Servidor se esta ejecutando en el puerto: ${PORT}`);
})