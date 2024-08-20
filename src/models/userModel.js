const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User name required"],
        maxLength: [31, "The name of the user must be a maximum of 31 characters."],
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "User password required"],
        min: [6, "User password must be at least 6 characters long."],
        max: [6, "User password can be a maximum of 7 characters long."], // Adjusted maxLength
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    address: {
        type: String,
        required: [true, "User address is required."],
    },
    phone_number: {
        type: String,
        required: [true, "User phone number is required."],
        unique : true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isBand: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false });

const userModel = model("user", userSchema);

module.exports = userModel;
