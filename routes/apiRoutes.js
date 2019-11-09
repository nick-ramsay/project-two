var db = require("./connection.js");
var moment = require("moment");

module.exports = function(app) {
  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                SERVICES
  //////////////////////////////////////////////////////////////////////////
  //########################################################################

  // query to get ALL SERVICES
  app.get("/api/services", function(req, res) {
    db.query("SELECT * FROM Services", function(error, results) {
      res.json(results);
    });
  });
  // query to get ALL SERVICES
  app.post("/api/services", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO Services SET ?",
      {
        service_name: "asdf",
        createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                MECHANIC CENTRES
  //////////////////////////////////////////////////////////////////////////
  //########################################################################

  // query to get ALL MECHANIC CENTRES
  app.get("/api/mechaniccentres", function(req, res) {
    db.query("SELECT * FROM MechanicCentres", function(error, results) {
      res.json(results);
    });
  });

  // query to get ALL MECHANIC CENTRES
  app.post("/api/login", function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    db.query(
      "SELECT * FROM MechanicCentres WHERE ? AND ?",
      [
        {
          user_username: req.body.username
        },
        {
          user_password: req.body.password
        }
      ],
      function(error, results) {
        res.json(results);
      }
    );
  });

  // query to get SINGLE MECAHNIC CENTRE by ID
  app.get("/api/mechaniccentres/:id", function(req, res) {
    db.query(
      "SELECT * FROM MechanicCentres WHERE ?",
      {
        id: req.params.id
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  // query to CREATE A NEW MECHANIC CENTRE
  app.post("/api/mechaniccentres", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO MechanicCentres SET ?",
      {
        centre_name: "aaa's auto repairs",
        phone: "0410500100",
        email: "brian@gmail.com",
        user_username: "brian@gmail.com",
        user_password: "asdf1234",
        address_street: "1 E Street",
        address_city: "Eee City",
        address_postcode: "2000",
        address_state: "NSW",
        address_country: "Australia",
        latitude: 10.1,
        longitude: 10.1,
        employee_count: 3,
        created_date: currDateTime.format("YYYY-MM-DD"),
        created_time: currDateTime.format("HH:mm:ss"),
        createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  // query to UPDATE A NEW MECHANIC CENTRE
  app.put("/api/mechaniccentres", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "UPDATE MechanicCentres SET ? WHERE ?",
      [
        {
          centre_name: "ASDF's auto repairs",
          phone: "0410500100",
          email: "brian@gmail.com",
          user_username: "brian@gmail.com",
          user_password: "asdf1234",
          address_street: "1 E Street",
          address_city: "Eee City",
          address_postcode: "2000",
          address_state: "NSW",
          address_country: "Australia",
          latitude: 10.1,
          longitude: 10.1,
          employee_count: 3,
          updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
        },
        {
          id: 1
        }
      ],
      function(error, results) {
        res.json(results);
      }
    );
  });

  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                MECHANIC CENTRES SERVICES
  //////////////////////////////////////////////////////////////////////////
  //########################################################################

  // query to get ALL SERVICES of ALL MECHANIC CENTRES
  app.get("/api/mechaniccentreservices", function(req, res) {
    db.query("SELECT * FROM MechanicCentreServices", function(error, results) {
      res.json(results);
    });
  });

  // query to get MECHANICS THAT PROVIDE A SPECIFIC SERVICE
  app.get("/api/mechaniccentreservices/:servicename", function(req, res) {
    db.query(
      "SELECT * FROM MechanicCentreServices LEFT OUTER JOIN Services ON MechanicCentreServices.service_id = Services.id WHERE ?",
      {
        service_name: req.params.servicename
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  // query to get ADD A SERVICE TO A MECHANIC CENTRE
  app.post("/api/mechaniccentreservices", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO MechanicCentreServices SET ?",
      {
        mechanic_centre_id: 5,
        service_id: 2,
        available: true,
        createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  // query to DELETE A SERVICE FROM A MECHANIC CENTRE
  app.put("/api/mechaniccentreservicesupdate", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "UDPATE MechanicCentreServices SET ? WHERE ?",
      [
        {
          available: false,
          updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
        },
        {
          mechanic_centre_id: 5,
          service_id: 2
        }
      ],
      function(error, results) {
        res.json(results);
      }
    );
  }); ///////////////////////////////////////////

  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                MECHANIC CENTRES ORDINARY HOURS
  //////////////////////////////////////////////////////////////////////////
  //########################################################################

  // query to get ALL ORDINARY HOURS of ALL MECHANIC CENTRES
  app.get("/api/mechaniccenterordinaryhours", function(req, res) {
    db.query("SELECT * FROM MechanicCentreOrdinaryHours", function(
      error,
      results
    ) {
      res.json(results);
    });
  });

  // query to get ALL ORDINARY HOURS of A SINGLE MECHANIC CENTRE
  app.get("/api/mechaniccenterordinaryhours/:mechaniccentreid", function(
    req,
    res
  ) {
    db.query(
      "SELECT * FROM MechanicCentreOrdinaryHours WHERE ?",
      {
        mechanic_centre_id: req.params.mechaniccentreid
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  // query to CREATE ORDINARY HOURS for a SINGLE MECAHNIC CENTRE
  app.post("/api/mechaniccenterordinaryhours", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO MechanicCentreOrdinaryHours SET ?",
      {
        mechanic_centre_id: 6,
        mon_start: "09:20:00",
        mon_end: "18:30:00",
        tue_start: "09:20:00",
        tue_end: "18:30:00",
        wed_start: "09:20:00",
        wed_end: "18:30:00",
        thu_start: "09:20:00",
        thu_end: "18:30:00",
        fri_start: "09:20:00",
        fri_end: "18:30:00",
        sat_start: "00:00:00",
        sat_end: "00:00:00",
        sun_start: "00:00:00",
        sun_end: "00:00:00",
        createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  // query to UPDATE ORDINARY HOURS for a SINGLE MECAHNIC CENTRE
  app.put("/api/mechaniccenterordinaryhours", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "UPDATE MechanicCentreOrdinaryHours SET ? WHERE ?",
      [
        {
          mon_start: "09:20:00",
          mon_end: "18:30:00",
          tue_start: "09:20:00",
          tue_end: "18:30:00",
          wed_start: "09:20:00",
          wed_end: "18:30:00",
          thu_start: "09:20:00",
          thu_end: "18:30:00",
          fri_start: "09:20:00",
          fri_end: "18:30:00",
          sat_start: "00:00:00",
          sat_end: "00:00:00",
          sun_start: "00:00:00",
          sun_end: "00:00:00",
          updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
        },
        {
          mechanic_centre_id: 5
        }
      ],
      function(error, results) {
        res.json(results);
      }
    );
  });

  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                APPOINTMENTS
  //////////////////////////////////////////////////////////////////////////
  //########################################################################

  // query to get ALL APPOINTMENTS
  app.get("/api/appointments", function(req, res) {
    db.query("SELECT * FROM Appointments", function(error, results) {
      res.json(results);
    });
  });
  app.get("/api/appointments/customer/:appointmentid", function(req, res) {
    db.query(
      "SELECT * FROM Appointments WHERE ?",
      {
        id: req.params.appointmentid
      },
      function(error, results) {
        res.json(results);
      }
    );
  });
  app.get("/api/appointments/mechanic/:mechaniccentreid", function(req, res) {
    db.query(
      "SELECT * FROM Appointments WHERE ?",
      {
        mechanic_centre_id: req.params.mechaniccentreid
      },
      function(error, results) {
        res.json(results);
      }
    );
  });
  app.post("/api/appointments", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO Appointments SET ?",
      {
        mechanic_centre_id: 1,
        required_service_id: 2,
        appointment_date: "2019-11-13",
        appointment_time: "11:30:00",
        phone: "0410500100",
        email: "brian@gmail.com",
        car_plate: "ABC123",
        car_brand: "mazda",
        car_model: "model 11",
        additional_notes: "make it fancy",
        createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
      },
      function(error, results) {
        res.json(results);
      }
    );
  });

  // currently not able to update appointments

  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                CUSTOM QUERIES
  //////////////////////////////////////////////////////////////////////////
  //########################################################################

  // query to get MECHANICS THAT PROVIDE A SPECIFIC SERVICE
  app.get("/api/mechaniccentresfilter", function(req, res) {
    console.log(req.query.servicename);
    console.log(req.query.km);
    console.log(req.query.lat);
    console.log(req.query.lon);
    var servicename = "wheel alignment";
    var km = 5;
    console.log(km);
    db.query(
      "SELECT * FROM MechanicCentreServices LEFT OUTER JOIN Services ON MechanicCentreServices.service_id = Services.id WHERE ?",
      {
        "Services.service_name": servicename
      },
      function(error, results) {
        var mechanicCentresArr = results.filter(function(curr) {
          // do some calulation for lat and lon
          if (curr) {
            return true;
          }
          return true;
        });
        res.json(mechanicCentresArr);
      }
    );
  });
  // query to get SPECIFIC MECHANIC AND THEIR ORDINARY HOURS
  app.get("/api/mechaniccentresandordinaryhours/:id", function(req, res) {
    db.query(
      "SELECT * FROM MechanicCentres LEFT OUTER JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id WHERE ?",
      {
        "MechanicCentres.id": req.params.id
      },
      function(error, results) {
        var mechanicCentresArr = results.map(function(curr) {
          // do some calulation for lat and lon
          return curr;
        });
        res.json(mechanicCentresArr);
      }
    );
  });
};
