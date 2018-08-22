module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define('branch', {
latitude:{
    type:  DataTypes.DECIMAL,
    allowNull: false,
  }, 
longitude:{
    type:  DataTypes.DECIMAL,
    allowNull: false,
}, 
address:{
    type: DataTypes.STRING,
    allowNull: false,
},
branch_admin:{
  type:  DataTypes.INTEGER,
  allowNull: false,
},
restaurant_admin:{
  type:  DataTypes.INTEGER,
  allowNull: false,
},
restaurant_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
  },});


  return Branch ;
};