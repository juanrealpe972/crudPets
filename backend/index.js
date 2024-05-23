import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import routeMascotas from './src/routes/mascotas.routes.js'
import routeUser from './src/routes/user.routes.js'
import routeCategorias from './src/routes/categorias.routes.js'
import routeGeneros from './src/routes/generos.routes.js'
import routeRazas from './src/routes/razas.routes.js'

const app = express()
app.use(cors())
const PORT = 4001

app.use(body_parser.json())
app.use(body_parser.urlencoded({extend: false}))

app.use('/v1', routeUser)
app.use('/v1', routeMascotas)
app.use('/v1', routeCategorias)
app.use('/v1', routeGeneros)
app.use('/v1', routeRazas)

app.set("view engine", "ejs")
app.set("views", "./view")

app.use(express.static('./public'))

app.get("/documents", (req, res) => {
    res.render("document.ejs")
})

app.listen(4001, () => {
    console.log(`app se esta ejecutando en el puerto: ${PORT}`);
})