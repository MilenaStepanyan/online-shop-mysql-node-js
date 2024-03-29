// import { authToken } from "../middlewares/authTokens.js";
import bcrypt from "bcrypt";
import { pool } from "../db/db.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secretKeyAit";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    connection.release();
    const newUserId = result.insertId;

    const payload = {
      user: {
        id: newUserId,
      },
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

    res.status(201).json({ token });
  } catch (error) {
    console.log("Error while registering user", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const connection = await pool.getConnection();
    const [userRow] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    connection.release();
    if (userRow.length === 0)
      return res.status(401).json({ message: "Invalid Credentials" });
    const isPasswordMatch = await bcrypt.compare(password, userRow[0].password);

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: userRow[0].id,
      },
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

    res.json({ token, isAdmin: userRow[0].role === 'admin' });
  } catch (error) {
    console.error("Error while logging in user", error);
    res.status(500).json({ message: "Server error" });
  }
};
