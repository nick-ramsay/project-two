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
    res.render("mechanicdetails", {
      id: req.params.id, 
      mechanic: mechaniccentreservices.mechanic_centre_id,
      services: mechaniccentreservices.service_id,
      mechaniccenter: mechaniccentres.centre_name
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};


