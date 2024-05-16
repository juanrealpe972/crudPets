import { pool } from "../databases/conexion.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const validarUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    const [rows] = await pool.query(sql);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Email incorrecto" });
    }
    const user = rows[0]; // Obtener el primer usuario de los resultados
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign({ rows }, process.env.AUT_SECRET, {
      expiresIn: process.env.AUT_EXPIRET,
    });
    res.status(200).json({ user, token, message: "Usuario validado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const bcryptPassword = bcrypt.hashSync(password, 12);
    const response = await pool.query(`INSERT INTO users(fullname, email, password) VALUES ('${fullname}', '${email}', '${bcryptPassword}')`);
    if (response.length > 0) {
      res.status(200).json("Usuario creado con exito");
    } else {
      res.status(404).json("Error al crear el usuario");
    }
  } catch (error) {
    res.status(500).json("Error en el sistema" + error);
  }
};

export const verificarUserToken = async (req, res, next) => {
  try {
    const token_client = req.headers["token"];
    if (!token_client) {
      res.status(404).json({ message: "No autorizado" });
    } else {
      jwt.verify(token_client, process.env.AUT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Token no valido" });
        } else {
          console.log(decoded);
          next();
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
