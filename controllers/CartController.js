var sequelize =require('sequelize');
var Cart = require('../models').Cart;
var Product = require('../models').product;

module.exports=
{
    addToCart:(req, res, next) => {
        console.log(req.body.description);
        console.log(req.body.productId);
        Cart.create({ description: req.body.description, quantity: 1, UserId: 1, ProductId: req.body.productId }).then(product => {
            res.status(200).json({
                err: null,
                msg: 'Product is added to your cart successfully.',
                data: product
            });


          }).catch(err=>{
            return next(err);
        });
              },




    getProductsInCart: (req, res, next) => {
        var userId = 1; //to be changed with authorized user
        Cart.findAll({
            where: {
                UserId: userId,
            },
          }).then( products=> {
            //   console.log(products);
              if (!products) {
                return res
                  .status(404)
                  .json({ err: null, msg: 'there are nothing in the cart', data: null });
              }
        
              //console.log(req.decodedToken.user._id);
            res.status(200).json({
                err: null,
                msg: 'Products retrieved successfully.',
                data: products
        
              });
        
             
            }).catch(err=>{
                return next(err);
            });
                
                
                },
               updateProductsInCart: (req, res, next) => {
                    var userId = 1; //to be changed with authorized user
                    var productId = req.body.ProductId;
                    console.log(req.body.ProductId,req.body.quantity,req.body.description);
                    Cart.findOne({
                        where: {
                            UserId: userId,
                            ProductId: productId
                        },
                      }).then( product=> {
                        //   console.log(products);
                          if (!product) {
                            return res
                              .status(404)
                              .json({ err: null, msg: 'there are nothing in the cart', data: null });
                          }
                    
                          //console.log(req.decodedToken.user._id);
                          
                          product.update({
                            quantity: req.body.quantity,
                            description: req.body.description
                          }).then(() => {
                            res.status(200).json({
                                err: null,
                                msg: 'Cart updated successfully.',
                                data: product
                        
                          }).catch(err=>{
                            return next(err);
                        });
                    
                         
                        }).catch(err=>{
                            return next(err);
                        });
                            
                            
                            });
                        }
            }
        