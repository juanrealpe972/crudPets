import { pool } from "../databases/conexion.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, imf, cd) {
    cd(null, "public/pets");
  },
  filename: function (req, img, cd) {
    cd(null, img.originalname);
  },
});

const upload = multer({ storage: storage });
export const cargarImagen = upload.single("photo");

export const createPets = async (req, res) => {
  try {
    const { name_pet, race_id, category_, gender_id, fk_user } = req.body;
    let photo =  req.file.originalname
    const response = await pool.query(
      `INSERT INTO pets (name_pet, race_id, category_, photo, gender_id, fk_user) VALUES ('${name_pet}', '${race_id}', '${category_}', '${photo}', '${gender_id}', '${fk_user}')`
    );
    if (response.length > 0) {
      res.status(200).json("pet creado con exito");
    } else {
      res.status(404).json("Error al crear el pet");
    }
  } catch (error) {
    res.status(500).json("Error en el sistema" + error);
  }
};

export const listarPets = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM pets");
    if (response.length > 0) {
      res
        .status(200)
        .json({ message: "pets listados con exito", data: response });
    } else {
      res.status(404).json("Error al listar los pets");
    }
  } catch (error) {
    res.status(500).json("Error en el sistema" + error);
  }
};

export const actualizarPets = async (req, res) => {
  try {
    const { id } = req.params;
    const { race_id, category_, photo, gender_id, fk_user } = req.body;

    let sql = `UPDATE pets SET race_id = '${race_id}', category_ = '${category_}', photo = '${photo}', gender_id = '${gender_id}', fk_user = '${fk_user}' WHERE id = '${id}';`;

    const [rows] = await pool.query(sql);

    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Se actualizo con exito la mascota" });
    } else {
      res.status(404).json({ message: "Error al actualizar la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};

export const eliminarPets = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`DELETE FROM pets WHERE id = '${id}'`);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: "Mascota eliminada con éxito" });
    } else {
      res.status(404).json({ message: "Error al eliminar la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};

export const buscarPets = async (req, res) => {
  try {
    const { id } = req.params;

    let sql = `
        SELECT p.* nombre AS raza 
        FROM pets p
        JOIN razas ON raza = id, nombre AS categoria 
        JOIN categorias ON categoria = id, nombre AS genero 
        JOIN generos ON genero = id, nombre AS dueño 
        JOIN user ON dueno = id FROM mascotas 
        WHERE id = '${id}'
    `;

    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No se encontraron mascotas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" + error });
  }
};
