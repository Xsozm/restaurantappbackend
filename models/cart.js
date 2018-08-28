// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var Cart = sequelize.define('Cart', {
//     description: DataTypes.STRING,
//     quantity: DataTypes.INTEGER,
//     UserId: DataTypes.INTEGER,
//     ProductId: DataTypes.INTEGER
//   }, {});
//    Cart.associate = function(models) {
//      models.Cart.belongsTo(models.User, {
//        onDelete: "CASCADE",
//        foreignKey: {
//          allowNull: false
//        }
//      });
//
//    };
//   return Cart;
// };