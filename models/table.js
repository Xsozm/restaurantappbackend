'use strict';
module.exports = (sequelize, DataTypes) => {
  var Table = sequelize.define('table', {
    table_number: DataTypes.INTEGER,
    QRCode: DataTypes.STRING,
    branch_id: DataTypes.INTEGER,
  }, {});
   Table.associate = function(models) {
  //   models.Table.hasMany(models.order, {});

   };
  return Table;
};