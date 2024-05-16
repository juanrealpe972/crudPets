import { pool } from "../databases/conexion.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const response = await pool.query(`INSERT INTO categories (name) VALUES ('${name}')`)
        if (response.length > 0) {
            res.status(200).json("category creadada con exito")
        } else {
            res.status(404).json("Error al crear la category")
        }
    } catch (error) {
        res.status(500).json("Error en el sistema" + error)
    }
}

export const listarCategory = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM categories');
        if (response.length > 0) {
            res.status(200).json({ message: "category listadas con exito", data: response })
        } else {
            res.status(404).json("Error al listar las categories")
        }
    } catch (error) {
        res.status(500).json("Error en el sistema" + error)
    }
}