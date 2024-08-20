const jwt = require("jsonwebtoken");

const createWebToken = (data, key, expiresIn) => {
    const token = jwt.sign(data, key, { expiresIn });
    return token;
};

module.exports = { createWebToken };
