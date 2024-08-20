const express = require("express");
const router = express.Router();

// user controller
const userController = require("../controllers/userController");


router.get("/all/user", userController.allUser);
router.get("/single/user/:id" , userController.singleUser );



module.exports = router;