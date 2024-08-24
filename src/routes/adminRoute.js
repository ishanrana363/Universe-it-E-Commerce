const express = require("express");
const router = express.Router();
const {isLogIn, isAdmin} = require("../moddleware/isLogindMiddleware")
// user controller
const userController = require("../controllers/userController");


router.get("/all/user", isLogIn, isAdmin, userController.allUser);
router.get("/single/user/:id" , isLogIn,  userController.singleUser );



module.exports = router;