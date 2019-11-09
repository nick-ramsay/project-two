module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
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
};
