var sequelize =require('sequelize');
var Order = require('../models').order;


module.exports=
{

    addOrder:(req, res, next) => {
        var c=req.body.content;
        var service=0.12;
        var taxes=0.14;
        var subtotal=0;
        console.log(c.length);
        for(var i =0;i<c.length;i++){
            subtotal=subtotal+c[i].price;
        }
        total=subtotal+(subtotal*service);
        total=total+(total*taxes);
        Order.create({ Status:'pending' ,content: c, table_number: globalTableNum, branch_id: globalBranchId, client: 1/* auth user*/,total:total,subTotal:subtotal }).then(product => {
            res.status(200).json({
                err: null,
                msg: 'order is added successfully.',
                data: Order
            });


          }).catch(err=>{
            return next(err);
        });
              },
              getOrdersOfUser: (req, res, next) => {
                var userId = 1; //to be changed with authorized user
                Order.findAll({
                    where: {
                        client: userId,
                    },
                  }).then( orders=> {
                    //   console.log(products);
                      if (!orders) {
                        return res
                          .status(404)
                          .json({ err: null, msg: 'You have no orders', data: null });
                      }
                      else if(orders.length===0){
                        res.status(200).json({
                            err: null,
                            msg: 'No orders',
                    
                          });
                      }
                      //console.log(req.decodedToken.user._id);
                    res.status(200).json({
                        err: null,
                        msg: 'Orders retrieved successfully.',
                        data: orders
                
                      });
                
                     
                    }).catch(err=>{
                        return next(err);
                    });
                        
                        
                        },
          
                                
}