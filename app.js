const express = require('express');
const app = express();
const expressMongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const hpp = require('hpp');
const expressRateLimit = require('express-rate-limit');
const cookie = require("cookie-parser")

// express-mongo-sanitize use to user-supplied data to prevent MongoDB Operator Injection.
app.use(expressMongoSanitize());

// Using cors enable CORS with various options.

app.use(cors());

// hpp protect against HTTP Parameter Pollution attacks

app.use(hpp());

//Use to limit repeated requests to public APIs and/or endpoints such as password reset.

const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));

app.use(cookie());

app.get("/",async(req,res)=>{
    res.send("Server is running");
})

// public routes
const userRoute = require("./src/routes/userRoute");
app.use("/api/v1",userRoute);

// private route
const adminRoute = require("./src/routes/adminRoute");
app.use("/api/v1", adminRoute);







module.exports = app;
