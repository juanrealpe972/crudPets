import { pool } from "../databases/conexion.js";

export const createGenders = async (req, res) => {
    try {
        const { name } = req.body
        const response = await pool.query(`INSERT INTO genders (name) VALUES ('${name}')`)
        if (response.length > 0) {
            res.status(200).json("gender creado con exito")
        } else {
            res.status(404).json("Error al crear el gender")
        }
    } catch (error) {
        res.status(500).json("Error en el sistema" + error)
    }
}

export const listarGenders = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM genders');
        if (response.length > 0) {
            res.status(200).json({ message: "gender creado con exito", data: response })
        } else {
            res.status(404).json("Error al listar los genders")
        }
    } catch (error) {
        res.status(500).json("Error en el sistema" + error)
    }
}