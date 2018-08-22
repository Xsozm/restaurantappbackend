var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var http = require("http");
var cors = require('cors');
var app = express();
var env = require('dotenv').load();

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('project', 'root', 123456, {
//     host: 'localhost',
//     dialect: 'mysql',
//     operatorsAliases: false,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },


// });

// sequelize.sync();

var server = app.listen(3232, function () {
    console.log("app running on port.", server.address().port);
});


/*http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(3232);*/

app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE']
    })
  );


// sequelize.query("SELECT * FROM users").spread((results, metadata) => {
//     // Results will be an empty array and metadata will contain the number of affected rows.
//     console.log(results);
// })



// app.use('/api', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.routes();
 routes(app);


module.exports = app;