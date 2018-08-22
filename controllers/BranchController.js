
//var sequelize = require('sequelize');
var sequelize =require('sequelize');
var Branch = require('../models').branch;

//var Branch = sequelize.model('Branch');
var Restaurant = require('../models').restaurant;


module.exports=
{
    SearchRestasurant: (req, res, next) => {
        var qrcode = req.query.qrcode;
        var arr = qrcode.split(" ");
        var branchid = arr[0];
        var branch =  Branch.findOne({ "branchid": branch_id });
        if (branch) {
            return res.status(200).json({
                err: null,
                data: branch,
            });
        }
        else
            return res.status(403).json({ error: "not found " });
        
        },


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