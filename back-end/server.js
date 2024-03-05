import express from "express"
import cors from "cors";
import { loginUser,registerUser } from "./controllers/userController.js";
import {authToken} from "./middlewares/authTokens.js";
import {authRole} from "./middlewares/authRoles.js";
import AdminProductRoutes from "../back-end/routes/productRoutes/adminProductRoutes.js"
import adminRoutes from "../back-end/routes/adminRouter.js"
import userProductRoutes from "../back-end/routes/productRoutes/userProductRoutes.js"

const app = express()
const port = 5001;
app.use(express.json())
app.use(cors())
app.post("/api/login",loginUser)
app.post("/api/register",registerUser)
app.use("/api/admin", authToken, authRole("admin"), adminRoutes);
app.use(
  "/api/admin/products",
  authToken,
  authToken,
  authRole("admin"),
  AdminProductRoutes
);
app.use(
  "/api/user/products",
  authToken,
  userProductRoutes
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
