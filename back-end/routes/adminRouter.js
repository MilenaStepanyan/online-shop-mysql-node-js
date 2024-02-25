import express from "express";
import { assignRole } from "../controllers/adminController.js"

const router = express.Router();

router.post("/assign-role", assignRole);

export default router;
