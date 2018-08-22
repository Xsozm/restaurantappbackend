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
    // associations can be defined here
  };
  return User;
};