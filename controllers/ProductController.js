var sequelize =require('sequelize');
var Category = require('../models').category;
var Product = require('../models').product;

module.exports=
{
    getProducts: (req, res, next) => {
        var categoryId = req.query["category_id"];
        console.log(categoryId);
        Product.findAll({
            where: {
                category_id: categoryId,
            },
      //      attributes: { exclude: ['createdAt','updatedAt'] }
          }).then( products=> {
            //   console.log(products);
              if (!products) {
                return res
                  .status(404)
                  .json({ err: null, msg: 'there are no products', data: null });
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
                
                
                }

            }
