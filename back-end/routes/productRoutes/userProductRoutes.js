import express from "express";
import { authRole } from "../../middlewares/authRoles.js";
import { authToken } from "../../middlewares/authTokens.js";
import { pool } from "../../db/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let sql = "SELECT * FROM products WHERE 1=1";

    if (req.query.search) {
      sql += ` AND name LIKE '%${req.query.search}%'`;
    }

    if (req.query.minPrice) {
      sql += " AND price >= ?";
    }

    if (req.query.maxPrice) {
      sql += " AND price <= ?";
    }

    if (req.query.category) {
      sql += ` AND category = '${req.query.category}'`;
    }

    let sortBy = req.query.sortBy || "id";
    let sortOrder = req.query.sortOrder || "ASC";
    sql += ` ORDER BY ${sortBy} ${sortOrder}`;

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;
    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const [userRows] = await pool.query(sql, [
      req.query.minPrice,
      req.query.maxPrice,
    ]);

    res.json(userRows);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).send("Error getting products");
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [userRow] = await pool.query(`SELECT * FROM products WHERE id=?`, [
      id,
    ]);
    if (userRow.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(userRow[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error getting product" });
  }
});
router.post("/review/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;

  try {
    const [productRow] = await pool.query(`SELECT * FROM products WHERE id=?`, [
      id,
    ]);
    if (productRow.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await pool.query(`INSERT INTO reviews (product_id,content) VALUES (?,?)`, [
      id,
      content,
    ]);
    res.status(201).json({ msg: "Review added succesfully" });
  } catch (error) {
    res.status(400).json({ msg: "Failed to add review" });
  }
});
router.delete("/review/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let result = await pool.query(`DELETE FROM reviews WHERE product_id=?`, [
      id,
    ]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ msg: "review not found" });
    }

    res.json({
      msg: "review deleted successfully",
      review: { id: id },
    });
  } catch (error) {
    res.send("Error deleting review");
  }
});
router.get("/review/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      `SELECT * FROM reviews WHERE product_id = ?`,
      [id]
    );
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ msg: "review not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});
router.post("/:productId/ratings", async (req, res) => {
  const productId = req.params.productId;
  const { rating } = req.body;

  try {
    await pool.query(
      "UPDATE products SET rating = LEAST((rating * rating_count + ?) / (rating_count + 1), 5), rating_count = rating_count + 1 WHERE id = ?",
      [rating, productId]
    );

    res.status(201).json({ msg: "Product rated successfully" });
  } catch (error) {
    console.error("Error rating product:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});
router.post("/order", async (req, res) => {
  const { productName, quantity } = req.body;

  try {
    const result = await pool.query(
      "UPDATE products SET available_quantity = available_quantity - ? WHERE name = ?",
      [quantity, productName]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    console.log("Order processed successfully.");
    res.status(200).send("Order processed successfully.");
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).send("Error processing order.");
  }
});

export default router;
