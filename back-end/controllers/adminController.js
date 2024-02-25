import { pool } from "../db/db.js";

export const assignRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, userId]
    );

    res.status(200).json({ message: "Role assigned successfully" });
  } catch (error) {
    console.error("Error assigning role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

