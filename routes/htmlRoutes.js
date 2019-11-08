module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    res.render("mechaniclogin");
  });

  app.get("/create-account", function(req, res) {
    res.render("createmechanicaccount");
  });

  app.get("/account", function(req, res) {
    res.render("mechanicaccount");
  });

  app.get("/schedule", function(req, res) {
    res.render("mechanicschedule");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
