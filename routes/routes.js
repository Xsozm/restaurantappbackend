var express = require('express');
var  router = express.Router();
var models = require('../models');
//var Branch = sequelize.model('Branch');
var BranchController = require('../controllers/BranchController');
var ProductController = require('../controllers/ProductController');
var CartController = require('../controllers/CartController');
var OrderController = require('../controllers/OrderController');
var auth = require('../controllers/AuthController');
const jwt = require('jsonwebtoken');


var appRouter = function (app) {
    app.get("/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    // app.post('/login',function (req,res) {
    //     //el mafrod a check if the user exist
    //     let user = {
    //         id :1,
    //         email:"hazem@hazem",
    //         password:123456
    //     };
    //    let token= jwt.sign({user},'lololo',{ expiresIn: 60 * 60 },function(err,token){
    //        res.json({
    //           "token" :token
    //        });
    //    });
    // });


    // app.post('/hazem',verifyToken,function (req,res) {
    //     var decoded = jwt.verify(req.token, 'lololo',function (err,authData) {
    //         if (err){
    //             res.sendStatus(403);
    //         }else{
    //             res.send(authData.user);
    //
    //         }
    //
    //     });
    //
    // });

    // app.post('/logout',verifyToken,function (req,res) {
    //     const bearerheader = req.headers['authorization']
    //         req.headers['authorization']=null;
    //         req.token=null;
    //         //res.send(req.headers['authorization']);
    //
    //
    //         res.sendStatus(200);
    //     });




    var isNotAuthenticated = function (req, res, next) {
        // Check that the request doesn't have the JWT in the authorization header
        var token = req.headers['authorization'];
        if (token) {
            return res.status(403).json({
                error: null,
                msg: 'You are already logged in.',
                data: null
            });
        }
        next();
    };

    var isAuthenticated = function (req, res, next) {
        // Check that the request has the JWT in the authorization header
        var token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({
                error: null,
                msg: 'You have to login first before you can access your lists.',
                data: null
            });
        }
        // Verify that the JWT is created using our server secret and that it hasn't expired yet
        jwt.verify(token, "secret", function (err, decodedToken) {
            if (err) {
                return res.status(401).json({
                    error: err,
                    msg: 'Login timed out, please login again.',
                    data: null
                });
            }
            req.decodedToken = decodedToken;
            next();
        });
    };

//---------------------
    router.post('/auth/login', isNotAuthenticated, auth.login);
    router.post('/auth/signup', isNotAuthenticated, auth.signup);
    router.get('/auth/verify/:token', isNotAuthenticated, auth.verify);


//------------------------------------------------------------------------------
app.get('/branch/searchRestaurant', BranchController.SearchRestasurant);



//-------------------------------------------------------------------------------
app.get('/category/getProducts', ProductController.getProducts);
app.post('/cart/addProduct', CartController.addToCart);
app.get('/cart/getProducts', CartController.getProductsInCart);
app.patch('/cart/updateProducts', CartController.updateProductsInCart);


//-------------------------------------------------------------------------------
app.post('/order/addOrder', OrderController.addOrder);
app.get('/order/getOrders', OrderController.getOrdersOfUser);

}

module.exports = appRouter;
