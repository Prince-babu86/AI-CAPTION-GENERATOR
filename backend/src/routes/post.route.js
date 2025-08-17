const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createPostController,
} = require("../controllers/createPost.Controller");
const router = express.Router();
const multer = require("multer");
const PostModel = require("../models/post.model");

const upload = multer({ storage: multer.memoryStorage() });

// protected route
router.post(
  "/",
  authMiddleware, // req.user = userdata
  upload.single("image"), // for image upload
  createPostController /// post request to create a post
);

router.get("/", authMiddleware, async (req, res) => {
 const user = req.user._id;
 const posts = await PostModel.find({user})
  res.status(200).send({
   posts
  });
});

module.exports = router;
