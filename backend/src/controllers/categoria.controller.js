import { pool } from "../database/conexion.js";

export const listarCategorias = async (req, res) => {
  try {
    let sql = "SELECT * FROM categorias";
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Error al listar las categorias." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};
