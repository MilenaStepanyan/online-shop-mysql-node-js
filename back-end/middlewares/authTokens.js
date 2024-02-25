import jwt from "jsonwebtoken";
import { pool } from "../db/db.js";
export const SECRET_KEY = "secretKeyAit"
export const authToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY  );
    const userId = decoded.user.id;

    const connection = await pool.getConnection();
    const [userRow] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    connection.release();

    req.user = userRow[0];
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
