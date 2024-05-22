import { pool } from "../database/conexion.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
export const cargarImagen = upload.single("imagen");

export const registrarMascota = async (req, res) => {
  try {
    const { nombre_mascota, fk_raza, fk_genero, fk_categoria, fk_user } = req.body;
    let imagen = req.file.originalname;

    let sql = 
    `
      INSERT INTO mascotas 
      (nombre_mascota, fk_raza, fk_categoria, imagen, fk_genero, fk_user) 
      VALUES 
      ('${nombre_mascota}', '${fk_raza}', '${fk_categoria}', '${imagen}', '${fk_genero}', '${fk_user}')
    `;

    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Se registro con exito la mascota" });
    } else {
      res.status(404).json({ message: "No se pudo registrar la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};

export const listarMascotas = async (req, res) => {
  try {
    let sql = 
    `
      SELECT m.*, c.*, g.*, r.*
      FROM mascotas m 
      JOIN razas r ON fk_raza = id_razas
      JOIN categorias c ON fk_categoria = id_categorias
      JOIN generos g ON fk_genero = id_generos
    `;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No se encontraron mascotas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};

export const actualizarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { raza, genero, categoria } = req.body;

    let sql = `UPDATE mascotas SET fk_raza = ?, fk_genero = ?, fk_categoria = ? WHERE id = ?`;

    const [rows] = await pool.query(sql, [raza, genero, categoria, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Se actualizo con exito la mascota" });
    } else {
      res.status(404).json({ message: "Error al actualizar" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};

export const buscarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 
    `
      SELECT m.*, r.*, c.*, g.*
      FROM mascotas m
      JOIN razas r ON fk_raza = id_razas
      JOIN categorias c ON fk_categoria = id_categorias 
      JOIN generos g ON fk_genero = id_generos
      WHERE id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No se encontraro la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};

export const eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE FROM mascotas WHERE id = '${id}'`;
    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Se eliminó con éxito la mascota" });
    } else {
      res.status(404).json({ message: "Error al eliminar la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};