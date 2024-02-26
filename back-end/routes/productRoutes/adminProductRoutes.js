import express from "express";
import { authRole } from "../../middlewares/authRoles.js";
import { authToken } from "../../middlewares/authTokens.js";
import { pool } from "../../db/db.js";

const router = express.Router();

router.post("/", authToken, authRole("admin"), async (req, res) => {
  const { name, description, price, picture, quantity, category, rating } =
    req.body;
  const finalRating = typeof rating === "undefined" ? 0 : rating;
  if (!name || !description || !price || !quantity) {
    res.status(400).json({ massage: "Missing fields" });
    return;
  }
  try {
    let product = await pool.query(
      `INSERT INTO products (name,description,price,image_url,available_quantity,category,rating) VALUES (?,?,?,?,?,?,?)`,
      [name, description, price, picture, quantity, category, finalRating]
    );
    const newProductId = product[0].insertId;

    let newProduct = {
      id: newProductId,
      name,
      description,
      price,
      picture,
      quantity,
      category,
      rating: finalRating,
    };
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM products`);
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error getting products");
  }
});
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [productById] = await pool.query(
      "SELECT * FROM products WHERE id=?",[id]
    );
    
    if (productById.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(productById[0]);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(404).send("Product not found");
  }
});
router.put("/:id",async(req,res)=>{
  const id = parseInt(req.params.id)
  const {name, description, price, picture, quantity, category, rating } = req.body
  try{
    let rows = await pool.query(
      "UPDATE products SET name=?,description=?,price=?,image_url=?,available_quantity=?,category=?,rating=?  WHERE id = ?",
      [name,description,price,picture,quantity,category,rating,id]
    )

    if (rows[0].affectedRows === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const updatedProduct = {
      id: id,
      name: name,
      description: description,
      price: price,
      picture: picture,
      quantity: quantity,
      category: category,
      rating: 0,
    };
    res.json({msg:"product updated succesfully",product:updatedProduct})
  }catch(error){
    console.log(error);
  }
})
export default router;
