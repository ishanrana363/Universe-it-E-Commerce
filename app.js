const express = require('express');
const app = express();
const expressMongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const hpp = require('hpp');
const expressRateLimit = require('express-rate-limit');

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

app.get("/",()=>{
    res.send("Server is running");
})

// public routes
const publicRoute = require("./src/routes/publicRoute");
app.use("/api/v1",publicRoute);

// private route
const privateRoute = require("./src/routes/privateRoute");
app.use("/api/v1", privateRoute);







module.exports = app;
