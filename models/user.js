'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    id:{

    type: DataTypes.INTEGER,
    primaryKey: true,
  
  },
    name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    isVerified :DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Cart);
  };
  return User;
};