const express = require("express");

const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

/* POST 

/ REGISTER
 */

// register route

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user" , authMiddleware , async(req , res) => {
  const user = req.user;
  res.status(200).send({
    user: {
      id: user._id,
      username: user.username,
    },
  });
})

module.exports = router;
