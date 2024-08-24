const {validationResult} = require("express-validator");

const runVAlidation = async(req,res,next)=>{
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                status:"fail",
                msg : errors.array()[0].msg
            });
        }
        next()
    } catch (error) {
        res.status(500).json({
            status:"fail",
            msg : error.toString()
        });
    }
};


module.exports = {runVAlidation}