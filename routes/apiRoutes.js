var db = require("./connection.js");

module.exports = function(app) {
  app.get("/api/mechanics", function(req, res) {
    db.query("SELECT * FROM Mechanics", function(error, results) {
      console.log(results);
      res.json(results);
    });
  });
};
