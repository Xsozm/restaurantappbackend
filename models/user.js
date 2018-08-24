'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id:{

    type: DataTypes.INTEGER,
    primaryKey: true,
  
  },
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Cart);
  };
  return User;
};