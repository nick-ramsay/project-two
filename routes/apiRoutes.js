var db = require("./connection.js");
var moment = require("moment");

module.exports = function (app) {
  app.get("/api/services", function (req, res) {
    db.query("SELECT * FROM Services", function (error, results) {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  app.get("/api/mechaniccentres", function (req, res) {
    db.query("SELECT * FROM MechanicCentres", function (error, results) {
      res.json(results);
    });
  });
  app.get("/api/mechaniccentres/:id", function (req, res) {
    db.query(
      "SELECT * FROM MechanicCentres WHERE ?",
      { id: req.params.id },
      function (error, results) {
        res.json(results);
      }
    );
  });
  app.post("/api/mechaniccentres", function (req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO MechanicCentres (centre_name, phone, email, user_username, user_password, address_street, address_city, address_postcode, address_state, address_country, latitude, longitude, employee_count, created_date, created_time, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        "ppp's auto repairs",
        "0410500100",
        "brian@gmail.com",
        "brian@gmail.com",
        "asdf1234",
        "1 E Street",
        "Eee City",
        "2000",
        "NSW",
        "Australia",
        10.1,
        10.1,
        3,
        currDateTime.format("YYYY-MM-DD"),
        currDateTime.format("HH:mm:ss"),
        currDateTime.format("YYYY-MM-DD HH:mm:ss"),
        currDateTime.format("YYYY-MM-DD HH:mm:ss")
      ],
      function (error, results) {
        res.json(results);
      }
    );
  });

  //////////////////////////////////////////////////////////////////////////////

  app.put("/api/mechaniccentres/:id", function (req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "UPDATE MechanicCentres SET centre_name = ?, phone = ?, email = ?, address_street = ?, address_city = ?, address_postcode = ?, address_state = ?, address_country = ?, latitude = ?, longitude = ?, employee_count = ?, updatedAt = ? WHERE id = ?",
      [
        "ppp's auto repairs",
        "0410500100",
        "brian@gmail.com",
        "1 E Street",
        "Eee City",
        "2000",
        "NSW",
        "Australia",
        10.1,
        10.1,
        3,
        currDateTime.format("YYYY-MM-DD HH:mm:ss"),
        req.body.id
      ],
      function (error, result) {
        if (error) {
          return res.status(500).end();
        };
        res.json(result);
      }
    );
  });

  //////////////////////////////////////////////////////////////////////////////

  app.get("/api/mechaniccenterservices", function (req, res) {
    db.query("SELECT * FROM MechanicCentreServices", function (error, results) {
      res.json(results);
    });
  });
  app.get("/api/mechaniccenterservices", function (req, res) {
    db.query("SELECT * FROM MechanicCentreServices", function (error, results) {
      res.json(results);
    });
  });
  app.post("/api/mechaniccenterservices", function (req, res) {
    // var currDateTime = new moment();
    db.query("INSERT INTO MechanicCentres () VALUES (?, ?)", [], function (
      error,
      results
    ) {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  app.get("/api/mechaniccenterordinaryhours", function (req, res) {
    db.query("SELECT * FROM MechanicCentreOrdinaryHours", function (
      error,
      results
    ) {
      res.json(results);
    });
  });
  app.get("/api/mechaniccenterordinaryhours/:mechanicid", function (req, res) {
    db.query(
      "SELECT * FROM MechanicCentreOrdinaryHours WHERE ?",
      { mechanicid: req.params.id },
      function (error, results) {
        res.json(results);
      }
    );
  });
  app.post("/api/mechaniccenterservices", function (req, res) {
    // var currDateTime = new moment();
    db.query("INSERT INTO MechanicCentres () VALUES (?, ?)", [], function (
      error,
      results
    ) {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  app.get("/api/appointments", function (req, res) {
    db.query("SELECT * FROM Appointments", function (error, results) {
      res.json(results);
    });
  });
  app.get("/api/appointments/customer/:customerid", function (req, res) {
    db.query(
      "SELECT * FROM Appointments WHERE ?",
      { customerid: req.params.id },
      function (error, results) {
        res.json(results);
      }
    );
  });
  app.get("/api/appointments/mechanic/:mechanicid", function (req, res) {
    db.query(
      "SELECT * FROM Appointments WHERE ?",
      { mechanicid: req.params.id },
      function (error, results) {
        res.json(results);
      }
    );
  });
  app.post("/api/mechaniccenterservices", function (req, res) {
    // var currDateTime = new moment();
    db.query("INSERT INTO MechanicCentres () VALUES (?, ?)", [], function (
      error,
      results
    ) {
      res.json(results);
    });
  });

  app.get("/api/formrequests", function (req, res) {
    db.query("SELECT * FROM Appointments", function (error, results) {
      res.json(results);
    });
  });

  app.post("/api/formrequests", function (req, res) {
    db.query("INSERT INTO appointments SET phone = ?, email = ?, car_brand = ?, car_model = ?, car_plate = ?, additional_notes = ?",
      [
        req.body.customerEmail,
        req.body.customerPhone,
        req.body.carMake,
        req.body.carModel,
        req.body.carPlate,
        req.body.serviceRequest,
        req.body.customerNotes
      ],
      function (err, result) {
        if (err) { throw err };
        res.json(result);
      }
    );
  });
};


app.put("/api/formrequests", function (req, res) {
  db.query("UPDATE WHERE... INTO appointments SET phone = ?, email = ?, car_brand = ?, car_model = ?, car_plate = ?, additional_notes = ?",
    [
      req.body.id,

    ],
    function (err, result) {
      if (err) { throw err };
      console.log(result)
      res.json(result);
    }
  );
});
};