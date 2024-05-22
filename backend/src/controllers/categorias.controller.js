import { pool } from "../database/conexion.js";

export const listarCategory = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM categorias");
    if (response.length > 0) {
      res.status(200).json({ message: "categorias listadas con exito", data: response });
    } else {
      res.status(404).json("Error al listar las categorias");
    }
  } catch (error) {
    res.status(500).json("Error en el sistema" + error);
  }
};