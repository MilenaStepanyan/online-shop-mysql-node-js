import express from "express";
import { authRole } from "../../middlewares/authRoles.js";
import { authToken } from "../../middlewares/authTokens.js";
import { pool } from "../../db/db.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

router.post(
  "/",
  authToken,
  authRole("admin"),
  upload.single("picture"),
  async (req, res) => {
    const { name, description, price, quantity, category, rating } = req.body;
    const picture = req.file ? req.file.filename : null;
    const finalRating = typeof rating === "undefined" ? 0 : rating;
    if (!name || !description || !price || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
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
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Error adding product" });
    }
  }
);

router.get("/", authRole("admin"), async (req, res) => {
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
      "SELECT * FROM products WHERE id=?",
      [id]
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
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price, picture, quantity, category, rating } =
    req.body;
  try {
    let rows = await pool.query(
      "UPDATE products SET name=?,description=?,price=?,image_url=?,available_quantity=?,category=?,rating=?  WHERE id = ?",
      [name, description, price, picture, quantity, category, rating, id]
    );

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
    res.json({ msg: "product updated succesfully", product: updatedProduct });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteProduct = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (deleteProduct[0].affectedRows === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({
      msg: "Product deleted successfully",
      product: { id: id },
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/review/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const singleProductReview = await pool.query(
      "SELECT * FROM reviews WHERE id=?",
      [id]
    );
    res.json(singleProductReview);
  } catch (error) {
    res.send(400).json("Error getting review");
  }
});
router.delete("review/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteReview = await pool.query("DELETE FROM reviews WHERE id = ?", [
      id,
    ]);

    if (deleteReview[0].affectedRows === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({
      msg: "review deleted successfully",
      product: { id: id },
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;
