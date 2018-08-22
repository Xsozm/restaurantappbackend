'use strict';
module.exports = (sequelize, DataTypes) => {
  var role = sequelize.define('role', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
  },
    name: DataTypes.STRING,
    features: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
  };
  return role;
};