
//var sequelize = require('sequelize');
var sequelize =require('sequelize');
var Branch = require('../models').branch;

//var Branch = sequelize.model('Branch');
var Restaurant = require('../models').restaurant;


module.exports=
{
    SearchRestasurant: (req, res, next) => {
        console.log("here", req.query["qrcode"]);
        var qrcode = req.query["qrcode"];
        var arr = qrcode.split(" ");
        global.globalBranchId = arr[0];    
        global.globalTableNum= arr[1];
        console.log("hi", globalBranchId,globalTableNum);
        Branch.findOne({where: { "id": globalBranchId }}).then( branch=> {
            if (!branch) {
                return res
                  .status(404)
                  .json({ err: null, msg: 'branch not found', data: null });
              }
        
              //console.log(req.decodedToken.user._id);
            res.status(200).json({
                err: null,
                msg: 'retaurant id retrieved successfully.',
                data: branch.restaurant_id
        
              });
            }).catch(err=>{
                return next(err);
            });
            
        
        }    ,


        isLoggedIn : async (req, res, next) =>
        {
         console.log(req.session.user);
         if(req.session.user)
            return res.status(201).json({
            err: null,
            msg: 'Logged In.',
        });
    
    return res.status(403).json({ error: "Not Logged In" });   
     },





           /* SearchExpert: (req, res, next) => {
                var username = req.body.username;
                var user =  Expert.findOne({ "username": username });
                if (user) {
                    return res.status(201).json({
                        data: username
                    });
                }
                else
                    return res.status(403).json({ error: "not found " });}*/
                
                
                
                
                
                
                }




 //module.exports = BranchController;