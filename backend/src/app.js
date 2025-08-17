const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.route")
const cors = require("cors");
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle cookies
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // allow cookies
}));

// routes

app.use("/auth", authRoutes), 
app.use("/posts", postRoutes);


(module.exports = app);

