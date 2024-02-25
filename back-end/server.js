import express from "express"
import { loginUser,registerUser } from "./controllers/userController.js";
import cors from "cors";
import { authToken } from "./middlewares/authTokens.js";
import AdminProductRoutes from "./routes/productRoutes/adminProductRoutes.js"
import { authRole } from "./middlewares/authRoles.js";


const app = express();
const port = 5001;
app.use(express.json())
app.use(cors())
app.post("/api/login",loginUser)
app.post("/api/register",registerUser)
app.use("/api/admin/products", authToken, authRole("admin"),AdminProductRoutes );


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
