const {body} = require("express-validator");
const validateUserRegistration = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.Please! enter your name")
    .isLength({min:3,max:31})
    .withMessage("Name should be at least 3 to 31 character long"),
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email required.Please! enter your name")
    .isEmail()
    .withMessage("Invalid email"),
    body("password")
    .notEmpty()
    .trim()
    .withMessage("Password required,Please! enter your password")
    .isLength({min:6})
    .withMessage("Password should be at least 6 character long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Password should be contain at least one uppercase one lowercase one number and one special character"),
    body("address")
    .trim()
    .notEmpty()
    .withMessage("Address required.Please enter your address")
    .isLength({min:6})
    .withMessage("Address should be 6 character long"),
    body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone number required.Please enter your phone number")
    .matches(/^(?:\+88|88)?01[3-9]\d{8}$/)
    .withMessage("Must be valid phone number")
];

module.exports = {validateUserRegistration};