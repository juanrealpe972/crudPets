import { pool } from "../database/conexion.js";

export const listarGenders = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM generos");
    if (response.length > 0) {
      res.status(200).json({ message: "generos listados con exito", data: response });
    } else {
      res.status(404).json("Error al listar los genders");
    }
  } catch (error) {
    res.status(500).json("Error en el sistema" + error);
  }
};