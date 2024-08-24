const { createWebToken } = require("../helpers/jsonToken");
const userModel = require("../models/userModel");
const sendMail = require("../helpers/email")
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
class authClass {
    seedUser = async(req,res)=>{
        try {
            let reqBody = req.body;
            let data = await userModel.create(reqBody);
            return res.status(201).json({
            status :"success",
            data : data
        });
        } catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    signUp = async(req,res)=>{
        const key = process.env.JWT_KEY;
        const clientUrl = process.env.ClIENT_URL
        try {
            let {name,email,password,address,phone_number} = req.body;

            let userEmailExists = await userModel.findOne({email:email});
            if(userEmailExists)return res.status(409).json({
                status :"fail",
                msg : "User email already exists"
            })
            
            const token = createWebToken(
                {name,email,password,address,phone_number},
                key,
                "10m"
            )

            const emailData = {
                email  ,
                subject : "Account activate email",
                html : `
                    <p>
                        hello ${name} please click here 
                        <a href = "${clientUrl}/api/v1/users/activate/${token}" >
                            Activate your account
                        </a>
                    </p>
                `
            }
            await sendMail(emailData);

            return res.status(201).json({
                status : "user create successfully",
                msg : ` send email activate your account ${email} `,
                payload : {
                    token
                }
            });
        } catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    verifyAccount = async (req,res)=>{
        const jwtKey = process.env.JWT_KEY;
        try {
            let token = req.body.token;
            const decodeToken = jwt.verify(token,jwtKey);
            const userEmailAlreadyExists = await userModel.exists({email:decodeToken.email});
            
            if(userEmailAlreadyExists){
                return res.status(409).json({
                    status:"fail",
                    msg : "User email already exists"
                });
            }
            
            await userModel.create(decodeToken);

            return res.status(201).json({
                status:"success",
                msg : "User created successfully "
            })

        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    signInUser = async (req,res)=>{
        let {email,password} = req.body;
        try {
            let user = await userModel.findOne({email:email});
            if(!user){
                return res.status(404).json({
                    status : "fail",
                    msg : "User not exists in this email"
                })
            }
            let matchPassword = bcrypt.compareSync(password,user.password);
            if(!matchPassword){
                return res.status(403).json({
                    status : "fail",
                    msg : "password not match"
                });
            }
            if(user.isBand){
                return res.status(403).json({
                    status : "fail",
                    msg : "You can not login. please contact authority"
                });
            }
            let key = process.env.LOGIN_KEY;
            // access token
            let token = createWebToken(
                { user },
                key,
                "1m"
            );
            res.cookie("accessToken",token,{
                maxAge : 1*60*1000,
                httpOnly : true,
                secure : true,
                sameSite : 'none'
            });
            //refresh token
            const refreshKey = process.env.REFRESH
            let refreshToken = createWebToken(
                { user },
                refreshKey,
                "7d"
            );
            res.cookie("refreshToken",refreshToken,{
                maxAge : 7*24*60*60*1000,
                httpOnly : true,
                secure : true,
                sameSite : 'none'
            });
            return res.status(200).json({
                status:"success",
                msg : "User login successfully"
            })
        } catch (error) {
            res.status(500).json({
                status:"fail",
                msg : error.toString()
            })
        }
    };
    handleLogout = async(req,res)=>{
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({
                status : "success",
                msg : "User logout successfully"
            })
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    }

    handleRefreshToken = async(req,res)=>{
            try {
            let oldToken = req.cookies.refreshToken;
            let refreshKey = process.env.REFRESH;
            const accessToken = jwt.verify(oldToken,refreshKey);
            if(!accessToken){
                return res.status(401).json({
                    status:"fail",
                    msg : "Invalid token please login"
                })
            }
            let key = process.env.LOGIN_KEY;
            let token = createWebToken(
                accessToken.user,
                key,
                "1m"
            );
            res.cookie("accessToken",token,{
                maxAge : 1*60*1000,
                httpOnly : true,
                secure : true,
                sameSite : 'none'
            });

            return res.status(200).json({
                status:"success",
                msg : "token create successfully"
            });

        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString(),
                msg : "Internal server error"
            });
        }
    };

    handleProtectedRoute = async (req,res)=>{
        try {
            let accessToken = req.cookies.accessToken;
        } catch (error) {
            
        }
    }

}


const authController = new authClass();

module.exports = authController;