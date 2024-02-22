import jwt from "jsonwebtoken";

const SECRET_KEY = "secretkeyait";
function authToken(req, res, next) {
  const authHeader = req.headers(["authorization"]);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (Err, user) => {
    if (Err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
