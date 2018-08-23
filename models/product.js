module.exports = (sequelize, DataTypes) => {
    var Product = sequelize.define('product', {
  image:{
      type:  DataTypes.STRING,
      allowNull: false,
    }, 
    description:{
        type:  DataTypes.STRING,
        allowNull: false,
      }, 
      content:{
        type:  DataTypes.STRING,
        allowNull: false,
      }, 
      name:{
        type:  DataTypes.STRING,
        allowNull: false,
      }, 
  category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    timestamps:false
});
  
  
    return Product ;
  };