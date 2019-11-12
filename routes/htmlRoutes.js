var db = require("./connection.js");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/login", function (req, res) {
    res.render("mechaniclogin");
  });

  app.get("/create-account", function (req, res) {
    res.render("mechanicaccountcreate");
  });

  app.get("/account", function (req, res) {
    res.render("mechanicaccount");
  });

  app.get("/schedule", function (req, res) {
    res.render("mechanicschedule");
  });

  app.get("/form", function (req, res) {
    res.render("formdetails");
  });

  //server gives recommended mechanics
  app.get("/recmechanic/:id", function (req, res) {
    
    db.query('SELECT * FROM automender.mechanics; SELECT * FROM automender.services; SELECT * FROM automender.mechaniccentres;',
      function (err, results, fields) {
        console.log(results);
        // console.log(fields);
      
          res.render("mechanicdetails", {
            id: req.params.id, 
            mechanics: results[0],
            services: results[1],
            centers: results[2]
          });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};


