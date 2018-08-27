'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
  //  models.User.hasMany(models.Cart);
  //  models.User.hasMany(models.Order, { onDelete: 'CASCADE' });

  };
  
  return User;
};