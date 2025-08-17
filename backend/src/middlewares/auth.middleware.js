const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
