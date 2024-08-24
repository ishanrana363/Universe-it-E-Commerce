const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

class userClass {

    allUser = async (req, res) => {
        try {
            let search = req.params.search || '';
            let pageNo = Number(req.params.pageNo || 1);
            const limit = Number(req.params.limit || 4);
            let searchRegex = new RegExp(".*" + search + ".*");
            const projection = {
                password: 0
            };
            let filter = {
                role: { $ne: "admin" },
                $or: [
                    { name: { $regex: searchRegex } },
                    { email: { $regex: searchRegex } }
                ],
                
            };

            let data = await userModel.find(filter,projection)
                                    .limit(limit)
                                    .skip((pageNo - 1) * limit);

            const userCount = await userModel.countDocuments(filter);
            if (!userCount) {
                return res.status(404).json({
                    status: "fail",
                    msg: "User not found"
                });
            }

            return res.status(200).json({
                status: "success",
                data: data,
                pagination : {
                    page : Math.ceil(userCount/limit),
                    currentPage : pageNo,
                    previousPage : pageNo-1>0 ? pageNo-1:null,
                    nextPage : pageNo+1<= Math.ceil(userCount/limit)? pageNo+1:null
                }
            });
        } catch (e) {
            return res.status(500).json({
                status: "fail",
                msg: e.toString()
            });
        }
    };

    singleUser = async (req, res) => {
        try {
            console.log(req.user);
            let id = req.params.id;
    
            // Find the user by ID
            let data = await userModel.findOne({_id : id});
    
            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "User not found"
                });
            };  
            return res.status(200).json({
                status: "success",
                data: data
            });
        } catch (e) {
            return res.status(500).json({
                status: "fail",
                msg: e.toString()
            });
        }
    };
    

}

const userController = new userClass();

module.exports = userController;
