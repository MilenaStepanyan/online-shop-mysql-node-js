import { authRole } from "../../middlewares/authRoles.js";
import express from "express";
import { authToken } from "../../middlewares/authTokens.js";
import { pool } from "../../db/db.js";


const router = express.Router();

router.post("/", authToken, authRole("admin"), async (req, res) => {
  const [name, description, price, picture, quantity, category, rating] =
    req.body; 
    if (!name || !description || !price || !quantity) {
      res.status(400).json({ massage: "Missing fields" });
    }
  try {
   
    let product = await pool.query(
        `INSERT INTO products (name,description,price,image_url,available_quantity,category,rating) VALUES (?,?,?,?,?,?,?)`
        [name,description,price,picture,quantity,category,rating]
    )
    const newProductId = product[0].insertId;

    let newProduct = {
        id:newProductId,
        name,
        description,
        price,
        picture,
        quantity,
        category,
        rating:0
    }
    res.status(201).json(newProduct)
  } catch (error) {
    console.log(error);
  }
});
export default router