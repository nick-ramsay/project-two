var db = require("./connection.js");
var moment = require("moment");

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
  // query to get ALL MECAHNIC CENTRE SERVICES
  app.get("/api/mechaniccentreservices", function(req, res) {
    db.query(
      "SELECT * FROM MechanicCentreServices JOIN Services ON MechanicCentreServices.service_id = Services.id",
      function(error, results) {
        res.json(results);
      }
    );
  });
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
  // query to get ALL MECHANIC CENTRES
  // app.get("/api/mechaniccentres", function(req, res) {
  //   db.query("SELECT * FROM MechanicCentres", function(error, results) {
  //     res.json(results);
  //   });
  // });
  // query to get ALL MECHANIC CENTRES and THEIR ORDINARY HOURS
  app.get("/api/mechaniccentresandordinaryhours", function(req, res) {
    db.query(
      "SELECT * FROM MechanicCentres JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id",
      function(error, results) {
        res.json(results);
      }
    );
  });
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
  // query to CREATE A MECHANIC CENTRE
  app.post("/api/mechaniccentres", function(req, res) {
    // app.get("/api/mechaniccentresCREATE", function(req, res) {
    console.log(req.body);
    var currDateTime = new moment();
    db.query(
      "INSERT INTO MechanicCentres SET ?",
      {
        centre_name: "aaa's auto repairs",
        phone: "0410500100",
        email: "brian@gmail.com",
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
        if (error) {
          console.log(error);
        }
        console.log("mechanic centre created", results);
        db.query(
          "INSERT INTO MechanicCentreCredentials SET ?",
          {
            mechanic_centre_id: results.insertId,
            user_username: "asdf",
            user_password: "ddd",
            createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
          },
          function(error, results) {
            if (error) {
              console.log(error);
            }
            console.log("credentials created", results);
          }
        );
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
            sun_end: "00:00:00",
            createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
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
      }
    );
  });
  // ########################################################################
  // CREDENTIALS of MECHANIC CENTRES
  // ########################################################################
  // query to get ALL MECHANIC CENTRE CREDENTIALS
  //THIS ROUTE SHOULD BE PROTECTED
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
  // query to get ALL MECHANIC CENTRE APPOINTMENTS
  app.get("/api/appointments", function(req, res) {
    db.query("SELECT * FROM Appointments", function(error, results) {
      res.json(results);
    });
  });
  // query to get APPOINTMENTS by MECHANIC CENTRE ID
  app.get("/api/appointments/:mechaniccentreid", function(req, res) {
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
  // query to get APPOINTMENT COUNT by MECHANIC CENTRE ID
  app.get("/api/appointmentcount/:mechaniccentreid", function(req, res) {
    db.query(
      "SELECT * FROM Appointments JOIN MechanicCentres ON Appointments.mechanic_centre_id = MechanicCentres.id WHERE ?",
      {
        mechanic_centre_id: req.params.mechaniccentreid
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
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////

  // ########################################################################
  // AUTHENTICATED ACTIONS
  // ########################################################################
  // query to get AUTHENTICATED ACCESS TO MECHANIC CENTRE DASHBOARD
  app.post("/api/login", function(req, res) {
    // app.post("/api/login", function(req, res) {
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
  app.get("/api/calcdist", function(req, res) {
    var lat1 = 1;
    var lon1 = 1;
    var lat2 = 1;
    var lon2 = 1;

    res.json({
      distance: 3
    });
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
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////

  //   // query to get ALL SERVICES
  //   app.post("/api/services", function(req, res) {
  //     console.log(req.body);
  //     var currDateTime = new moment();
  //     db.query(
  //       "INSERT INTO Services SET ?",
  //       {
  //         service_name: "asdf",
  //         createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
  //         updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                MECHANIC CENTRES
  //////////////////////////////////////////////////////////////////////////
  //########################################################################

  //   // query to get SINGLE MECAHNIC CENTRE by ID
  //   app.get("/api/mechaniccentres/:id", function(req, res) {
  //     db.query(
  //       "SELECT * FROM MechanicCentres WHERE ?",
  //       {
  //         id: req.params.id
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });

  //   // query to UPDATE A NEW MECHANIC CENTRE
  //   app.put("/api/mechaniccentres", function(req, res) {
  //     console.log(req.body);
  //     var currDateTime = new moment();
  //     db.query(
  //       "UPDATE MechanicCentres SET ? WHERE ?",
  //       [
  //         {
  //           centre_name: "ASDF's auto repairs",
  //           phone: "0410500100",
  //           email: "brian@gmail.com",
  //           address_street: "1 E Street",
  //           address_city: "Eee City",
  //           address_postcode: "2000",
  //           address_state: "NSW",
  //           address_country: "Australia",
  //           latitude: 10.1,
  //           longitude: 10.1,
  //           employee_count: 3,
  //           updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
  //         },
  //         {
  //           id: 1
  //         }
  //       ],
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });

  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                MECHANIC CENTRES SERVICES
  //////////////////////////////////////////////////////////////////////////
  //########################################################################
  //   // query to get MECHANICS THAT PROVIDE A SPECIFIC SERVICE
  //   app.get("/api/mechaniccentreservices/:servicename", function(req, res) {
  //     db.query(
  //       "SELECT * FROM MechanicCentreServices LEFT OUTER JOIN Services ON MechanicCentreServices.service_id = Services.id WHERE ?",
  //       {
  //         service_name: req.params.servicename
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //   // query to get ADD A SERVICE TO A MECHANIC CENTRE
  //   app.post("/api/mechaniccentreservices", function(req, res) {
  //     console.log(req.body);
  //     var currDateTime = new moment();
  //     db.query(
  //       "INSERT INTO MechanicCentreServices SET ?",
  //       {
  //         mechanic_centre_id: 5,
  //         service_id: 2,
  //         createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
  //         updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //   // query to DELETE A SERVICE FROM A MECHANIC CENTRE
  //   app.put("/api/mechaniccentreservicesdelete", function(req, res) {
  //     console.log(req.body);
  //     var currDateTime = new moment();
  //     db.query(
  //       "DELETE FROM MechanicCentreServices WHERE ?",
  //       [
  //         {
  //           mechanic_centre_id: req.body.mechanic_centre_id
  //         }
  //       ],
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   }); ///////////////////////////////////////////
  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                MECHANIC CENTRES ORDINARY HOURS
  //////////////////////////////////////////////////////////////////////////
  //########################################################################
  //   // query to get ALL ORDINARY HOURS of A SINGLE MECHANIC CENTRE
  //   app.get("/api/mechaniccenterordinaryhours/:mechaniccentreid", function(
  //     req,
  //     res
  //   ) {
  //     db.query(
  //       "SELECT * FROM MechanicCentreOrdinaryHours WHERE ?",
  //       {
  //         mechanic_centre_id: req.params.mechaniccentreid
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //   // query to CREATE ORDINARY HOURS for a SINGLE MECAHNIC CENTRE
  //   app.post("/api/mechaniccenterordinaryhours", function(req, res) {
  //     console.log(req.body);
  //     var currDateTime = new moment();
  //     db.query(
  //       "INSERT INTO MechanicCentreOrdinaryHours SET ?",
  //       {
  //         mechanic_centre_id: 6,
  //         mon_start: "09:20:00",
  //         mon_end: "18:30:00",
  //         tue_start: "09:20:00",
  //         tue_end: "18:30:00",
  //         wed_start: "09:20:00",
  //         wed_end: "18:30:00",
  //         thu_start: "09:20:00",
  //         thu_end: "18:30:00",
  //         fri_start: "09:20:00",
  //         fri_end: "18:30:00",
  //         sat_start: "00:00:00",
  //         sat_end: "00:00:00",
  //         sun_start: "00:00:00",
  //         sun_end: "00:00:00",
  //         createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
  //         updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //   // query to UPDATE ORDINARY HOURS for a SINGLE MECAHNIC CENTRE
  //   app.put("/api/mechaniccenterordinaryhours", function(req, res) {
  //     console.log(req.body);
  //     var currDateTime = new moment();
  //     db.query(
  //       "UPDATE MechanicCentreOrdinaryHours SET ? WHERE ?",
  //       [
  //         {
  //           mon_start: "09:20:00",
  //           mon_end: "18:30:00",
  //           tue_start: "09:20:00",
  //           tue_end: "18:30:00",
  //           wed_start: "09:20:00",
  //           wed_end: "18:30:00",
  //           thu_start: "09:20:00",
  //           thu_end: "18:30:00",
  //           fri_start: "09:20:00",
  //           fri_end: "18:30:00",
  //           sat_start: "00:00:00",
  //           sat_end: "00:00:00",
  //           sun_start: "00:00:00",
  //           sun_end: "00:00:00",
  //           updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
  //         },
  //         {
  //           mechanic_centre_id: 5
  //         }
  //       ],
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //########################################################################
  //////////////////////////////////////////////////////////////////////////
  //#########                APPOINTMENTS
  //////////////////////////////////////////////////////////////////////////
  //########################################################################
  //   app.get("/api/appointments/customer/:appointmentid", function(req, res) {
  //     db.query(
  //       "SELECT * FROM Appointments WHERE ?",
  //       {
  //         id: req.params.appointmentid
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //   app.get("/api/appointments/mechanic/:mechaniccentreid", function(req, res) {
  //     db.query(
  //       "SELECT * FROM Appointments WHERE ?",
  //       {
  //         mechanic_centre_id: req.params.mechaniccentreid
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //   app.post("/api/appointments", function(req, res) {
  //     console.log(req.body);
  //     var currDateTime = new moment();
  //     db.query(
  //       "INSERT INTO Appointments SET ?",
  //       {
  //         mechanic_centre_id: 1,
  //         required_service_id: 2,
  //         appointment_date: "2019-11-13",
  //         appointment_time: "11:30:00",
  //         phone: "0410500100",
  //         email: "brian@gmail.com",
  //         car_plate: "ABC123",
  //         car_brand: "mazda",
  //         car_model: "model 11",
  //         additional_notes: "make it fancy",
  //         createdAt: currDateTime.format("YYYY-MM-DD HH:mm:ss"),
  //         updatedAt: currDateTime.format("YYYY-MM-DD HH:mm:ss")
  //       },
  //       function(error, results) {
  //         res.json(results);
  //       }
  //     );
  //   });
  //   // currently not able to update appointments
  //   //########################################################################
  //   //////////////////////////////////////////////////////////////////////////
  //   //#########                CUSTOM QUERIES
  //   //////////////////////////////////////////////////////////////////////////
  //   //########################################################################
  //   // query to get MECHANICS THAT PROVIDE A SPECIFIC SERVICE
  //   app.get("/api/mechaniccentresfilter", function(req, res) {
  //     console.log(req.query.servicename);
  //     console.log(req.query.km);
  //     console.log(req.query.lat);
  //     console.log(req.query.lon);
  //     var servicename = "wheel alignment";
  //     var km = 5;
  //     console.log(km);
  //     db.query(
  //       "SELECT * FROM MechanicCentreServices LEFT OUTER JOIN Services ON MechanicCentreServices.service_id = Services.id WHERE ?",
  //       {
  //         "Services.service_name": servicename
  //       },
  //       function(error, results) {
  //         var mechanicCentresArr = results.filter(function(curr) {
  //           // do some calulation for lat and lon
  //           if (curr) {
  //             return true;
  //           }
  //           return true;
  //         });
  //         res.json(mechanicCentresArr);
  //       }
  //     );
  //   });
  //   // query to get SPECIFIC MECHANIC AND THEIR ORDINARY HOURS
  //   app.get("/api/mechaniccentresandordinaryhours/:id", function(req, res) {
  //     db.query(
  //       "SELECT * FROM MechanicCentres LEFT OUTER JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id WHERE ?",
  //       {
  //         "MechanicCentres.id": req.params.id
  //       },
  //       function(error, results) {
  //         var mechanicCentresArr = results.map(function(curr) {
  //           // do some calulation for lat and lon
  //           return curr;
  //         });
  //         res.json(mechanicCentresArr);
  //       }
  //     );
  //   });
};
