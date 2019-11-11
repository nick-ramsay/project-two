var db = require("./connection.js");
var moment = require("moment");
var geolib = require("geolib");

module.exports = function(app) {
  // ########################################################################
  // SERVICES
  // ########################################################################
  // query to get ALL SERVICES
  app.get("/api/services", function(req, res) {
    db.query("SELECT * FROM Services", function(error, results) {
      res.json(results);
    });
  });
  // ########################################################################
  // SERVICES of MECHANIC CENTRES
  // ########################################################################
  // >>> UNUSED <<<
  // query to get ALL MECAHNIC CENTRE SERVICES
  // app.get("/api/mechaniccentreservices", function(req, res) {
  //   db.query(
  //     "SELECT * FROM MechanicCentreServices JOIN Services ON MechanicCentreServices.service_id = Services.id",
  //     function(error, results) {
  //       res.json(results);
  //     }
  //   );
  // });
  // query to get A SINGLE MECAHNIC CENTRE'S SERVICES
  app.get("/api/mechaniccentreservices/:mechaniccentreid", function(req, res) {
    db.query(
      "SELECT * FROM MechanicCentreServices JOIN Services ON MechanicCentreServices.service_id = Services.id WHERE ?",
      {
        mechanic_centre_id: req.params.mechaniccentreid
      },
      function(error, results) {
        res.json(results);
      }
    );
  });
  // ########################################################################
  // MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE <<<
  // query to get ALL MECHANIC CENTRES
  // app.get("/api/mechaniccentres", function(req, res) {
  //   db.query("SELECT * FROM MechanicCentres", function(error, results) {
  //     res.json(results);
  //   });
  // });
  // >>> PRIVATE <<<
  // query to get ALL MECHANIC CENTRES and THEIR ORDINARY HOURS
  // app.get("/api/mechaniccentresandordinaryhours", function(req, res) {
  //   db.query(
  //     "SELECT * FROM MechanicCentres JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id",
  //     function(error, results) {
  //       res.json(results);
  //     }
  //   );
  // });
  // query to get SINGLE MECHANIC CENTRE and THEIR ORDINARY HOURS
  app.get("/api/mechaniccentresandordinaryhours/:mechaniccentreid", function(
    req,
    res
  ) {
    db.query(
      "SELECT * FROM MechanicCentres JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id WHERE ?",
      {
        mechanic_centre_id: req.params.mechaniccentreid
      },
      function(error, results) {
        res.json(results);
      }
    );
  });
  // query to CREATE A NEW MECHANIC CENTRE
  app.post("/api/mechaniccentres", function(req, res) {
    // console.log(req.body);
    var currDateTime = new moment();
    var mechanicCentreData = {
      created_date: currDateTime.format("YYYY-MM-DD"),
      created_time: currDateTime.format("HH:mm:ss"),
      createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
    };
    if (
      req.body.name &&
      req.body.phone &&
      req.body.email &&
      req.body.address1 &&
      req.body.city &&
      req.body.postcode &&
      req.body.state &&
      req.body.mechanicCount
    ) {
      mechanicCentreData.centre_name = req.body.name;
      mechanicCentreData.phone = req.body.phone;
      mechanicCentreData.email = req.body.email;
      mechanicCentreData.address_street = req.body.address1;
      mechanicCentreData.address_city = req.body.city;
      mechanicCentreData.address_postcode = req.body.postcode;
      mechanicCentreData.address_state = req.body.state;
      mechanicCentreData.address_country = "Australia";
      mechanicCentreData.employee_count = req.body.mechanicCount;
      mechanicCentreData.latitude = -27.3818;
      mechanicCentreData.longitude = 152.713;
      console.log(mechanicCentreData);
    } else {
      console.log("something missing", typeof req.body.state === "undefined");
      res.send("fail").end();
      return;
    }
    var mechanicCentreCredentialsData = {
      createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
    };
    if (req.body.email && req.body.password) {
      mechanicCentreCredentialsData.user_username = req.body.email;
      mechanicCentreCredentialsData.user_password = req.body.password;
      console.log(mechanicCentreCredentialsData);
    } else {
      res.send("fail").end();
      return;
    }
    var mechanicCentreOrdinaryHoursData = {
      createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
    };
    // var mechanicCentreServicesArr = {};

    db.query("INSERT INTO MechanicCentres SET ?", mechanicCentreData, function(
      error,
      results
    ) {
      if (error) {
        console.log(error);
      }
      console.log("mechanic centre created", results);
      mechanicCentreCredentialsData.mechanic_centre_id = results.insertId;
      db.query(
        "INSERT INTO MechanicCentreCredentials SET ?",
        mechanicCentreCredentialsData,
        function(error, results) {
          if (error) {
            console.log(error);
          }
          console.log("credentials created", results);
        }
      );
      mechanicCentreOrdinaryHoursData.mechanic_centre_id = results.insertId;
      db.query(
        "INSERT INTO MechanicCentreOrdinaryHours SET ?",
        {
          mechanic_centre_id: results.insertId,
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
          sun_end: "00:00:00"
        },
        function(error, results) {
          if (error) {
            console.log(error);
          }
          console.log("ordinary hours created", results);
        }
      );

      var queryStr =
        "INSERT INTO MechanicCentreServices (mechanic_centre_id, service_id, createdAt, updatedAt) VALUES ";
      var servicesArr = [1, 2, 3, 4, 5];
      servicesArr.forEach(function(curr, i, arr) {
        var str =
          "(" +
          results.insertId +
          ", " +
          curr +
          ", '" +
          currDateTime.format("YYYY-MM-DD HH:mm:ss") +
          "', '" +
          currDateTime.format("YYYY-MM-DD HH:mm:ss") +
          "')";
        queryStr += str;
        if (i !== arr.length - 1) {
          queryStr += ",";
        }
      });
      db.query(queryStr, function(error, results) {
        if (error) {
          console.log(error);
        }
        console.log("services created", results);
      });
      res.json(results);
    });
  });
  // ########################################################################
  // CREDENTIALS of MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE - VERY SENSITIVE INFORMATION <<<
  // query to get ALL MECHANIC CENTRE CREDENTIALS
  // app.get("/api/mechaniccentrecredentials", function(req, res) {
  //   db.query("SELECT * FROM MechanicCentreCredentials", function(
  //     error,
  //     results
  //   ) {
  //     res.json(results);
  //   });
  // });
  // query to CHECK AGAINST EXISTING USERNAMES
  app.post("/api/checkifusernameexists", function(req, res) {
    console.log(req.body.username);
    db.query(
      "SELECT user_username FROM MechanicCentreCredentials WHERE ?",
      { user_username: "rob@gmail.com" },
      function(error, results) {
        res.json(results);
        // if returned array is of length 0, good
      }
    );
  });
  // ########################################################################
  // ORDINARY HOURS of MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE <<<
  // query to get ALL MECHANIC CENTRE ORDINARY HOURS
  // app.get("/api/mechaniccentreordinaryhours", function(req, res) {
  //   db.query("SELECT * FROM MechanicCentreOrdinaryHours", function(
  //     error,
  //     results
  //   ) {
  //     res.json(results);
  //   });
  // });
  // query to get SINGLE MECHANIC CENTRE ORDINARY HOURS
  app.get("/api/mechaniccentreordinaryhours/:mechaniccentreid", function(
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
  // ########################################################################
  // APPOINTMENTS of MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE <<<
  // // query to get ALL MECHANIC CENTRE APPOINTMENTS
  // app.get("/api/appointments", function(req, res) {
  //   db.query("SELECT * FROM Appointments", function(error, results) {
  //     res.json(results);
  //   });
  // });
  // query to get SINGLE APPOINTMENT DETAILS
  app.get("/api/appointments/customer/:appointmentid", function(req, res) {
    var appointmentid = "00000001";
    appointmentid = parseInt(appointmentid, 10);
    db.query(
      "SELECT * FROM Appointments WHERE ?",
      // { id: req.params.appointmentid },
      { id: appointmentid },
      function(error, results) {
        res.json(results);
      }
    );
  });
  // query to get APPOINTMENT COUNT by MECHANIC CENTRE ID
  // // SELECT appointment_date, appointment_time, appointment_datetime, count(appointment_datetime) FROM Appointments WHERE mechanic_centre_id = 4 GROUP BY appointment_date, appointment_time, appointment_datetime ORDER BY appointment_datetime;
  // // SELECT appointment_datetime, count(appointment_datetime) FROM Appointments WHERE mechanic_centre_id = 4 GROUP BY appointment_datetime ORDER BY appointment_datetime;
  app.get("/api/appointmentscounttoday/:mechaniccentreid", function(req, res) {
    db.query(
      "SELECT appointment_datetime, count(appointment_datetime) AS count FROM Appointments WHERE ? GROUP BY appointment_datetime ORDER BY appointment_datetime",
      // "SELECT appointment_date, appointment_time, appointment_datetime, count(appointment_datetime) AS count FROM Appointments WHERE ? GROUP BY appointment_date, appointment_time, appointment_datetime ORDER BY appointment_datetime",
      {
        mechanic_centre_id: req.params.mechaniccentreid
      },
      function(error, results) {
        console.log(JSON.stringify(results, null, 2));
        res.json(results);
      }
    );
  });
  app.get("/api/appointmentscount/:mechaniccentreid", function(req, res) {
    var curr = new moment();
    var currDateTime = new moment(curr.format("YYYY-MM-DD")).add(2, "days");
    console.log(currDateTime.format("YYYY-MM-DD 00:00:01"));
    db.query(
      // "SELECT appointment_date, appointment_time, appointment_datetime, count(appointment_datetime) AS count FROM Appointments WHERE ? GROUP BY appointment_date, appointment_time, appointment_datetime ORDER BY appointment_datetime",
      "SELECT appointment_date, appointment_time, appointment_datetime, count(appointment_datetime) AS count FROM Appointments WHERE ? AND appointment_datetime >= ? GROUP BY appointment_date, appointment_time, appointment_datetime ORDER BY appointment_datetime",
      [
        {
          mechanic_centre_id: req.params.mechaniccentreid
        },
        currDateTime.format("YYYY-MM-DDT00:00:01.000Z")
        // currDateTime.format("YYYY-MM-DD 00:00:00") // this is today midnight
      ],
      function(error, results) {
        console.log(JSON.stringify(results, null, 2));
        res.json(results);
      }
    );
  });
  // query to CREATE A NEW APPOINTMENTS
  app.post("/api/appointments", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO Appointments SET ?",
      {
        mechanic_centre_id: 5,
        service_id: 5,
        appointment_date: "2019-12-01",
        appointment_time: "11:30:00",
        appointment_time: "2019-12-01 11:30:00",
        phone: "0410500100",
        email: "adam@gmail.com",
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
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////

  // ########################################################################
  // AUTHENTICATED ACTIONS - LOGIN
  // ########################################################################
  // query to get AUTHENTICATED ACCESS TO MECHANIC CENTRE DASHBOARD
  app.post("/api/login", function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    db.query(
      "SELECT * FROM MechanicCentres LEFT OUTER JOIN MechanicCentreCredentials ON MechanicCentres.id = MechanicCentreCredentials.mechanic_centre_id WHERE ? AND ?",
      [
        {
          user_username: "mark@gmail.com"
        },
        {
          user_password: "asdf1234"
        }
      ],
      function(error, results) {
        res.json(results);
      }
    );
  });
  // ########################################################################
  // AUTHENTICATED ACTIONS - VIEWING INFORMATION
  // ########################################################################
  // query to get AUTHENTICATED ACCESS TO MECHANIC CENTRE DASHBOARD
  app.post("/api/viewmechaniccentreappointments", function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    db.query(
      "SELECT * FROM MechanicCentres LEFT OUTER JOIN MechanicCentreCredentials ON MechanicCentres.id = MechanicCentreCredentials.mechanic_centre_id WHERE ? AND ?",
      [
        {
          user_username: "kevin@gmail.com"
        },
        {
          user_password: "asdf1234"
        }
      ],
      function(error, results) {
        db.query(
          "SELECT * FROM Appointments WHERE ? ORDER BY appointment_datetime",
          {
            mechanic_centre_id: results[0].mechanic_centre_id
          },
          function(error, results) {
            res.json(results);
          }
        );
      }
    );
  });
  // ########################################################################
  // AUTHENTICATED ACTIONS - UPDATING INFORMATION
  // ########################################################################
  app.put("/api/changepassword", function(req, res) {
    // app.post("/api/login", function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    var currDateTime = new moment();
    db.query(
      "SELECT * FROM MechanicCentres LEFT OUTER JOIN MechanicCentreCredentials ON MechanicCentres.id = MechanicCentreCredentials.mechanic_centre_id WHERE ? AND ?",
      [
        {
          user_username: "mark@gmail.com"
        },
        {
          user_password: "asdf1234"
        }
      ],
      function(error, results) {
        console.log(results);
        console.log(results[0].mechanic_centre_id);
        db.query(
          "UPDATE MechanicCentreCredentials SET ? WHERE ?",
          [
            {
              user_password: "QWERTY",
              updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
            },
            {
              mechanic_centre_id: results[0].mechanic_centre_id
            }
          ],
          function(error, results) {
            res.json(results);
          }
        );
      }
    );
  });
  // query to UPDATE A SINGLE MECHANIC CENTRE
  app.put("/api/updatemechaniccentre", function(req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    var currDateTime = new moment();
    db.query(
      "SELECT * FROM MechanicCentreCredentials WHERE ? AND ?",
      [
        {
          user_username: "mark@gmail.com"
        },
        {
          user_password: "asdf1234"
        }
      ],
      function(error, results) {
        if (error) {
          console.log(error);
        }
        console.log("credentials valid", results);
        db.query(
          "UPDATE MechanicCentres SET ? WHERE ?",
          [
            {
              centre_name: "ASDF's auto repairs",
              phone: "0410500100",
              email: "ASDF@gmail.com",
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
              id: results[0].mechanic_centre_id
            }
          ],
          function(error, results) {
            res.json(results);
          }
        );
      }
    );
  });
  // query to UPDATE A SINGLE MECHANIC CENTRE HOURS
  app.put("/api/updatemechaniccentreordinaryhours", function(req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    var currDateTime = new moment();
    db.query(
      "SELECT * FROM MechanicCentreCredentials WHERE ? AND ?",
      [
        {
          user_username: "asdf"
        },
        {
          user_password: "asdf1234"
        }
      ],
      function(error, results) {
        if (error) {
          console.log(error);
        }
        console.log("credentials valid", results);

        db.query(
          "UPDATE MechanicCentreOrdinaryHours SET ? WHERE ?",
          [
            {
              mon_start: "00:00:00",
              mon_end: "18:30:00",
              tue_start: "00:00:00",
              tue_end: "18:30:00",
              wed_start: "09:20:00",
              wed_end: "18:30:00",
              thu_start: "00:00:00",
              thu_end: "18:30:00",
              fri_start: "00:00:00",
              fri_end: "00:00:00",
              sat_start: "00:00:00",
              sat_end: "00:00:00",
              sun_start: "00:00:00",
              sun_end: "00:00:00",
              updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
            },
            {
              mechanic_centre_id: results[0].mechanic_centre_id
            }
          ],
          function(error, results) {
            res.json(results);
          }
        );
      }
    );
  });
  // query to DELETE SERVICES FROM A SINGLE MECHANIC CENTRE
  app.put("/api/deletemechaniccentreservices", function(req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    db.query(
      "SELECT * FROM MechanicCentreCredentials WHERE ? AND ?",
      [
        {
          user_username: "brian@gmail.com"
        },
        {
          user_password: "asdf1234"
        }
      ],
      function(error, results) {
        if (error) {
          console.log(error);
        }
        console.log("credentials valid", results);

        var deleteServicesArr = [1, 2, 3, 4, 5];
        var mechanicArr = [];
        if (deleteServicesArr.length !== 0) {
          var queryStr = "DELETE FROM MechanicCentreServices WHERE";

          deleteServicesArr.forEach(function(curr, i, arr) {
            var str = " ? AND" + " service_id = " + curr;
            if (i !== arr.length - 1) {
              str += " OR";
            }
            queryStr += str;
            mechanicArr.push({
              mechanic_centre_id: results[0].mechanic_centre_id
            });
          });
          db.query(queryStr, mechanicArr, function(error, results) {
            res.json(results);
          });
        }
      }
    );
  });
  // query to INSERT SERVICES FOR A SINGLE MECHANIC CENTRE
  app.post("/api/createmechaniccentreservices", function(req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    db.query(
      "SELECT * FROM MechanicCentreCredentials WHERE ? AND ?",
      [
        {
          user_username: "brian@gmail.com"
        },
        {
          user_password: "asdf1234"
        }
      ],
      function(error, results) {
        if (error) {
          console.log(error);
        }
        console.log("credentials valid", results);

        var currDateTime = new moment();
        var insertServicesArr = [1, 2, 3, 4, 5];
        if (insertServicesArr.length !== 0) {
          var queryStr =
            "INSERT INTO MechanicCentreServices (mechanic_centre_id, service_id, createdAt, updatedAt) VALUES";

          insertServicesArr.forEach(function(curr, i, arr) {
            var str =
              " (" +
              results[0].mechanic_centre_id +
              ", " +
              curr +
              ", '" +
              currDateTime.format("YYYY-MM-DD HH:mm:ss") +
              "', '" +
              currDateTime.format("YYYY-MM-DD HH:mm:ss") +
              "')";
            if (i !== arr.length - 1) {
              str += ",";
            }
            queryStr += str;
          });
          db.query(queryStr, function(error, results) {
            res.json(results);
          });
        }
      }
    );
  });

  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  // ########################################################################
  // CUSTOM QUERIES
  // ########################################################################
  // query to get MECHANICS THAT PROVIDE A SPECIFIC SERVICES AND WITHIN SPECIFIC RANGE
  app.get("/api/mechaniccentresfilter", function(req, res) {
    var townhallstationposition = {
      latitude: -33.873539,
      longitude: 151.2047353
    };

    // console.log(req.query.servicename);
    // console.log(req.query.metres);
    // console.log(req.query.lat);
    // console.log(req.query.lon);

    var servicename = req.query.servicename || "wheel alignment";
    var metres = req.query.metres || 5000;

    var userPosition = {
      latitude: req.query.lat || townhallstationposition.latitude,
      longitude: req.query.lon || townhallstationposition.longitude
    };

    db.query(
      "SELECT * FROM Services" +
        " LEFT OUTER JOIN MechanicCentreServices ON Services.id = MechanicCentreServices.service_id" +
        " LEFT OUTER JOIN MechanicCentres ON MechanicCentreServices.mechanic_centre_id = MechanicCentres.id" +
        " LEFT OUTER JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id" +
        " WHERE ?",
      {
        "Services.service_name": servicename
      },
      function(error, results) {
        var mechanicCentresArr = results.filter(function(curr) {
          var distance = geolib.getDistance(userPosition, {
            latitude: curr.latitude,
            longitude: curr.longitude
          });
          curr.distance_metres = distance;
          if (distance <= metres) {
            return true;
          }
          return false;
        });
        res.json(mechanicCentresArr);
      }
    );
  });
  app.get("/api/calcdist", function(req, res) {
    var townhallstationposition = {
      latitude: -33.873539,
      longitude: 151.2047353
    };

    var lat2 = -33.8660077;
    var lon2 = 151.2033634;

    var distance = geolib.getDistance(townhallstationposition, {
      latitude: lat2,
      longitude: lon2
    });
    res.json({
      distance: distance
    });
  });
};

//////
// for inserting into the mechanics centre table
// {
//   centre_name: "aaa's auto repairs",
//   phone: "0410500100",
//   email: "brian@gmail.com",
//   address_street: "1 E Street",
//   address_city: "Eee City",
//   address_postcode: "2000",
//   address_state: "NSW",
//   address_country: "Australia",
//   latitude: -27.3818631,
//   longitude: 152.7130055,
//   employee_count: 3,
//   created_date: currDateTime.format("YYYY-MM-DD"),
//   created_time: currDateTime.format("HH:mm:ss"),
//   createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
//   updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
// },

// {
//   mechanic_centre_id: results.insertId,
//   user_username:
//     String(Math.floor(Math.random() * 10)) +
//     String(Math.floor(Math.random() * 10)) +
//     String(Math.floor(Math.random() * 10)) +
//     String(Math.floor(Math.random() * 10)),
//   user_password: "ddd",
//   createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
//   updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
// },
/////
