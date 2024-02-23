import express from "express"
import { loginUser,registerUser } from "./controllers/userController.js";
import cors from "cors";
// import {authToken} from "./middlewares/authTokens.js";
// import {authRole} from "./middlewares/authRoles.js";
const app = express();
const port = 5001;
app.use(express.json())
app.use(cors())
app.post("/api/login",loginUser)
app.post("/api/register",registerUser)
// app.get('/api', (req, res) => {
//   res.send('Hello from Express API!');
// });
// app.get('/api/admin', authToken, authRole('admin'), (req, res) => {
//   res.send('Admin Dashboard');
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
