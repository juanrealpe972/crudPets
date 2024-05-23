import { pool } from "../database/conexion.js";

export const listarGeneros = async (req, res) => {
  try {
    let sql = "SELECT * FROM generos";
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Error al listar los generos." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};
