const express = require("express");
const router = express.Router();

// auth controller
const authController = require("../controllers/authController");

// user controller
const userController = require("../controllers/userController");

router.get("/all/user", userController.allUser )
router.post("/seed/user",authController.seedUser)
router.post("/user/sign-up", authController.signUp);
router.post("/activate/user", authController.verifyAccount)

module.exports = router;