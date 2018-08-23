module.exports = (sequelize, DataTypes) => {
    var Category = sequelize.define('category', {
  name:{
      type:  DataTypes.STRING,
      allowNull: false,
    }, 
  restaurant_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps:false
});
  
  
    return Category ;
  };