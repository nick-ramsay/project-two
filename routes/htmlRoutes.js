// var moment = require("moment");

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
    res.render("mechanicdetails");
  });

  //page after submitting service request with details
  app.get("/done", function (req, res) {
    res.render("servicesubmitted");
  });

  //server gives recommended mechanics
  app.get("/recmechanic", function (req, res) {
    res.render("mechanicdetails");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

    /*db.query('SELECT * FROM automender.mechanics; SELECT * FROM automender.services; SELECT * FROM automender.mechaniccentres;',
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
  });*/

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     res.render("index");
//   });

//   // mechanics dashboard page
//   app.get("/profile/:mechaniccentreid", function(req, res) {
//     res.render("mechanicprofile");
//   });

//   //customer inputs requests
//   app.get("/requests", function(req, res) {
//     res.render("brokendetails");
//   });

//   //customer inpts contact details
//   app.get("/contactdetails", function(req, res) {
//     res.render("customerdetails");
//   });

//   //server gives recommended mechanics
//   app.get("/recmechanic", function(req, res) {
//     res.render("mechanicdetails");
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
