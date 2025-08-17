const PostModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  const file = req.file;
  // console.log(file, "file received");

  const base64ImageFile = new Buffer.from(file.buffer).toString("base64");

  // console.log(base64ImageFile, "base64ImageFile");

  const caption = await generateCaption(base64ImageFile);

  const result = await uploadFile(file.buffer, `${uuidv4()}`);

  const post = await PostModel.create({
    caption: caption,
    image: result.url,
    user: req.user._id, // assuming req.user is set by authMiddleware
  });

  res.json({
    post,
    message: "Caption generated successfully",
    user: req.user.id,
  });
}



module.exports = {
  createPostController,
};
