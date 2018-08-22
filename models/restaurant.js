'use strict';
/*module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('Restaurant', {
    id: DataTypes.INT,
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    logo: DataTypes.STRING,
    admin: DataTypes.ID
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
  };
  return Restaurant;
};*/
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('restaurant', {
    id:{
        type:  DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
  }, 
  name:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
},
logo:{
    type: DataTypes.STRING,
    allowNull: false,
},

});

// Restaurant.associate = function(models) {
//   Restaurant.hasMany(models.Branch, {
//       foreignKey: 'restaurant_id',
//       as: 'restaurant_id',//as: 'todoItems' means that every time we query for a todo and include it's todo items, they'll be included under the key
//       // todoItems instead of TodoItems (Sequelize defaults to using the pluralized model name). 
//     });
//     };
  return Restaurant;
};