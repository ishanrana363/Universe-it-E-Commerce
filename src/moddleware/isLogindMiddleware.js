const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.LOGIN_KEY;

const isLogIn = async (req,res,next)=>{
    try {
        let token = req.cookies.accessToken;
        if(!token){
            return  res.status(401).json({
                status:"fail",
                msg : "Access token not found."
            });
        };
        let decode = jwt.verify(token,key);
        req.user = decode.user;
        if(!decode){
            return res.status(401).json({
                status:"fal",
                msg : "Invalid access token. Please login"
            })
        }
        next()
    } catch (error) {
        console.log(error)
        return next();
    }
};

const isLogOut = async (req,res,next)=>{
    try {
        let accessToken = req.cookies.accessToken;
        if(accessToken){
            let decodeToken = jwt.verify(accessToken,key);
            if(decodeToken){
                return res.status(400).json({
                    status:"success",
                    msg : "User already login"
                });
            }else{
                return res.status(401).json({
                    status:"fail",
                    msg : "user token expired"
                });
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString()
        });
    }
};

const isAdmin = async (req,res,next)=>{
    try {
        if(!req.user.isAdmin){
            return res.status(403).json({
                status : "fail",
                msg : "You hove not permission"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString()
        });
    }
}

module.exports = {isLogIn,isLogOut,isAdmin}
