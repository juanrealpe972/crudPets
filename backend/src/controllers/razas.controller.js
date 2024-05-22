import { pool } from "../database/conexion.js";

export const listarRaces = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM razas');
        if (response.length > 0) {
            res.status(200).json({ message: "razas listadas con exito", data: response })
        } else {
            res.status(404).json("Error al listar las razas")
        }
    } catch (error) {
        res.status(500).json("Error en el sistema" + error)
    }
}