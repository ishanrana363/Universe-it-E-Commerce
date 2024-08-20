const mongoose = require("mongoose");

require("dotenv").config();

const db = process.env.DB_PORT;

const connectDB = ()=>{
    try {
        mongoose.connect(db);
        console.log(`---database connected---`)
    } catch (error) {
        console.log(`---database connected fail---`)
    }
};

module.exports = connectDB;