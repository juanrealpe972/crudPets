import { pool } from "../database/conexion.js";

export const listarRazas = async (req, res) => {
  try {
    let sql = "SELECT * FROM razas";
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Error al listar las razas." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro del servidor" + error });
  }
};
