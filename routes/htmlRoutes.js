// var db = require("./connection.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // mechanics dashboard page
  app.get("/profile/:mechaniccentreid", function(req, res) {
    res.render("mechanicprofile");
  });

  //customer inputs requests
  app.get("/requests", function(req, res) {
    res.render("brokendetails");
  });

  //customer inpts contact details
  app.get("/contactdetails", function(req, res) {
    res.render("customerdetails");
  });

  //server gives recommended mechanics
  app.get("/recmechanic", function(req, res) {
    res.render("mechanicdetails");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
