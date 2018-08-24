var sequelize =require('sequelize');
var Cart = require('../models').Cart;
var Product = require('../models').product;

module.exports=
{
    addToCart:(req, res, next) => {
        Cart.create({ description: req.query["description"], quantity: 1, UserId: 1, ProductId: req.query["productId"] }).then(product => {
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
                    var productId = req.query["ProductId"];
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
                            quantity: req.query["quantity"],
                            description: req.query["description"]
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
        