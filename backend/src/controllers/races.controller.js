import { pool } from "../databases/conexion.js";

export const createRaces = async (req, res) => {
    try {
        const { name } = req.body
        const response = await pool.query(`INSERT INTO races (name) VALUES ('${name}')`)
        if (response.length > 0) {
            res.status(200).json("race creada con exito")
        } else {
            res.status(404).json("Error al crear la race")
        }
    } catch (error) {
        res.status(500).json("Error en el sistema" + error)
    }
}

export const listarRaces = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM races');
        if (response.length > 0) {
            res.status(200).json({ message: "races listadas con exito", data: response })
        } else {
            res.status(404).json("Error al listar los races")
        }
    } catch (error) {
        res.status(500).json("Error en el sistema" + error)
    }
}