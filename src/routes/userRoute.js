const express = require("express");
const router = express.Router();

// auth controller
const authController = require("../controllers/authController");

// user controller
const userController = require("../controllers/userController");
const { isLogOut, isLogIn } = require("../moddleware/isLogindMiddleware");
const upload = require("../moddleware/imageUploadMiddleware");
const { validateUserRegistration } = require("../validator/authValidator");
const { runVAlidation } = require("../validator/validatorErrorMsg");

router.get("/all/user", userController.allUser )
router.post("/seed/user",authController.seedUser)

router.post("/user/sign-up",upload.single("image"), validateUserRegistration, 
runVAlidation,
authController.signUp);

router.post("/activate/user", authController.verifyAccount);
router.post("/user/sign-in", isLogOut,  authController.signInUser);
router.get("/user/log-out", isLogIn, authController.handleLogout);

module.exports = router;