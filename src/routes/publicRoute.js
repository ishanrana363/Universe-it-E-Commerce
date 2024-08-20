const express = require("express");
const router = express.Router();

// auth controller
const authController = require("../controllers/authController");
// user controller
const userController = require("../controllers/userController");
router.post("/seed/user",authController.seedUser)
router.post("/user/sign-up", authController.signUp);
router.get("/all/user", userController.allUser )

module.exports = router;