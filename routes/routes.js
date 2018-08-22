var express = require('express');
var  router = express.Router();
var models = require('../models');
//var Branch = sequelize.model('Branch');
var BranchController = require('../controllers/BranchController');


const jwt = require('jsonwebtoken');
var appRouter = function (app) {
    app.get("/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.post('/login',function (req,res) {
        //el mafrod a check if the user exist
        let user = {
            id :1,
            email:"hazem@hazem",
            password:123456
        };
       let token= jwt.sign({user},'lololo',{ expiresIn: 60 * 60 },function(err,token){
           res.json({
              "token" :token
           });
       });
    });


    app.post('/hazem',verifyToken,function (req,res) {
        var decoded = jwt.verify(req.token, 'lololo',function (err,authData) {
            if (err){
                res.sendStatus(403);
            }else{
                res.send(authData.user);

            }
            
        });

    });

    app.post('/logout',verifyToken,function (req,res) {
        const bearerheader = req.headers['authorization']
            req.headers['authorization']=null;
            req.token=null;
            //res.send(req.headers['authorization']);


            res.sendStatus(200);
        });


   
    //middle ware function
    function verifyToken(req,res,next) {
        const bearerheader = req.headers['authorization']
        if (typeof bearerheader != 'undefined'){
            const  array = bearerheader.split(' ');
            let token =array[1];
            req.token=token;
            next();

        } else{
            res.sendStatus(403);
        }
        
    }
//------------------------------------------------------------------------------
app.get('/branch/searchRestaurant', BranchController.SearchRestasurant);


}

module.exports = appRouter;
