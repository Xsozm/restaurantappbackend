'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('order', {
    Status: DataTypes.STRING,
    content: DataTypes.JSON,
   // quantity: DataTypes.INTEGER,
    table_number: DataTypes.INTEGER,
    branch_id: DataTypes.INTEGER,
    client: DataTypes.INTEGER,
    total:DataTypes.DECIMAL,
    subTotal:DataTypes.DECIMAL,
  }, {
        createdAt: 'created_at',
  updatedAt: 'updated_at',});
   Order.associate = function(models) {
/*     models.Order.belongsTo(models.table, {
       onDelete: "CASCADE",
       foreignKey: {
         allowNull: false
       },
       as:'table_number'
     });
     models.Order.belongsTo(models.branch, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        },
        as:'branch_id'
      });
     models.Order.belongsTo(models.User, {
       
       // onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        },
        as:'client'
      });*/
   };
  return Order;
};