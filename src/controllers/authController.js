const { createWebToken } = require("../helpers/jsonToken");
const userModel = require("../models/userModel");
const sendMail = require("../helpers/email")
require("dotenv").config();

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
    
}


const authController = new authClass();

module.exports = authController;