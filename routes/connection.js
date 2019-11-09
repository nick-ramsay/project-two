var keys = require("./keys.js");

var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: keys.dbPassword,
  database: keys.dbName
});

module.exports = pool;
