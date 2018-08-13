var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var env = require('dotenv').load();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('Hazem', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },


});
sequelize.sync();

// sequelize.query("SELECT * FROM users").spread((results, metadata) => {
//     // Results will be an empty array and metadata will contain the number of affected rows.
//     console.log(results);
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
