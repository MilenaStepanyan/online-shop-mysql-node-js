import express from "express";
import { assignRole } from "../controllers/adminController.js"
import { authRole } from "../middlewares/authRoles.js";

const router = express.Router();

router.post("/assign-role", assignRole);
router.get("/protected-page", authRole("admin"), (req, res) => {
    res.status(200).json({ message: "Welcome to the protected admin page!" });
  });
export default router;
