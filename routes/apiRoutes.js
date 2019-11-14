// var oldDB = require("./connection.js");
var db = require('../models');
var moment = require("moment");
var geolib = require("geolib");

module.exports = function (app) {
  // ########################################################################
  // SERVICES
  // ########################################################################
  // query to get ALL SERVICES
  app.get("/api/services", function (req, res) {
    db.Service.findAll({}).then(function (results) {
      res.json(results);
    });
  });
  // ########################################################################
  // SERVICES of MECHANIC CENTRES
  // ########################################################################
  // >>> UNUSED <<<
  // query to get ALL MECAHNIC CENTRE SERVICES
  // app.get("/api/mechaniccentreservices", function(req, res) {
  //   db.sequelize.query(
  //     "SELECT * FROM MechanicCentreServices JOIN Services ON MechanicCentreServices.service_id = Services.id",
  //     { type: db.sequelize.QueryTypes.SELECT }
  //   ).then(function (results) {
  //     res.json(results);
  //   });
  // });
  // query to get A SINGLE MECAHNIC CENTRE'S SERVICES
  app.get("/api/mechaniccentreservices/:mechaniccentreid", function (req, res) {
    db.sequelize.query(
      "SELECT * FROM MechanicCentreServices JOIN Services ON MechanicCentreServices.service_id = Services.id WHERE mechanic_centre_id = :mechaniccentreid",
      { replacements: { mechaniccentreid: req.params.mechaniccentreid }, type: db.sequelize.QueryTypes.SELECT }
    ).then(function (results) {
      console.log(results);
      res.json(results);
    });
  });
  // ########################################################################
  // MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE <<<
  // query to get ALL MECHANIC CENTRES
  // app.get("/api/mechaniccentres", function (req, res) {
  //   db.MechanicCentre.findAll().then(function (results) {
  //     res.json(results);
  //   });
  // });

  // >>> PRIVATE <<<
  // query to get ALL MECHANIC CENTRES and THEIR ORDINARY HOURS
  // app.get("/api/mechaniccentresandordinaryhours", function (req, res) {
  //   db.sequelize.query(
  //     "SELECT * FROM MechanicCentres JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id",
  //     { type: db.sequelize.QueryTypes.SELECT }
  //   ).then(function (results) {
  //     res.json(results);
  //   });
  // });
  // query to get SINGLE MECHANIC CENTRE DETAILS
  app.get("/api/mechaniccentres/:mechaniccentreid", function (
    req,
    res
  ) {
    db.MechanicCentre.findOne({
      where: {
        id: req.params.mechaniccentreid
      }
    }).then(function (results) {
      res.json(results);
    });
  });
  // query to get SINGLE MECHANIC CENTRE and THEIR ORDINARY HOURS
  app.get("/api/mechaniccentresandordinaryhours/:mechaniccentreid", function (
    req,
    res
  ) {
    db.sequelize.query(
      "SELECT * FROM MechanicCentres JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id WHERE mechanic_centre_id = :mechaniccentreid",
      { replacements: { mechaniccentreid: req.params.mechaniccentreid }, type: db.sequelize.QueryTypes.SELECT }
    ).then(function (results) {
      res.json(results);
    });
  });
  // query to CREATE A NEW MECHANIC CENTRE
  app.post("/api/mechaniccentres", function (req, res) {
    // basic details
    var mechanicCentreData = {};
    if (
      req.body.name && req.body.phone && req.body.email && req.body.address1 &&
      req.body.city && req.body.postcode && req.body.state && req.body.mechanicCount
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
    } else {
      console.log("something missing", typeof req.body.state === "undefined");
      res.send("fail").end();
      return;
    }

    // credentials
    var mechanicCentreCredentialsData = {};
    if (req.body.email && req.body.password) {
      mechanicCentreCredentialsData.user_username = req.body.email;
      mechanicCentreCredentialsData.user_password = req.body.password;
      console.log(mechanicCentreCredentialsData);
    } else {
      console.log("something missing", typeof req.body.state === "undefined");
      res.send("fail").end();
      return;
    }

    // working hours
    var mechanicCentreOrdinaryHoursData = {
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
    };

    // services offered by mechanic centre
    var mechanicCentreServicesArr = [];


    // create queries
    db.MechanicCentre.create(mechanicCentreData).then(function (result) {
      console.log("######### mechanic id", result.dataValues.id);
      mechanicCentreCredentialsData.mechanic_centre_id = result.dataValues.id;
      db.MechanicCentreCredential.create(mechanicCentreCredentialsData).then(function (result) {
        console.log("######### mechanic credentials", result.dataValues);
      });

      mechanicCentreOrdinaryHoursData.mechanic_centre_id = result.dataValues.id;
      db.MechanicCentreOrdinaryHour.create(mechanicCentreOrdinaryHoursData).then(function (result) {
        console.log("######### mechanic hours", result.dataValues.id);
      });

      mechanicCentreServicesArr.push({ mechanic_centre_id: result.dataValues.id, service_id: 1 });
      mechanicCentreServicesArr.push({ mechanic_centre_id: result.dataValues.id, service_id: 2 });
      mechanicCentreServicesArr.push({ mechanic_centre_id: result.dataValues.id, service_id: 3 });
      mechanicCentreServicesArr.push({ mechanic_centre_id: result.dataValues.id, service_id: 4 });
      mechanicCentreServicesArr.push({ mechanic_centre_id: result.dataValues.id, service_id: 5 });

      db.MechanicCentreService.bulkCreate(mechanicCentreServicesArr).then(function (result) {
        console.log("######### mechanic services", result.dataValues);
      });

      res.json(result);
    });
  });
  // ########################################################################
  // CREDENTIALS of MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE - VERY SENSITIVE INFORMATION <<<
  // query to get ALL MECHANIC CENTRE CREDENTIALS
  // app.get("/api/mechaniccentrecredentials", function(req, res) {
  //   db.MechanicCentreCredential.findAll().then(function(results) {
  //     res.json(results);
  //   });
  // });
  // query to CHECK AGAINST EXISTING USERNAMES
  app.post("/api/checkifusernameexists", function (req, res) {
    console.log(req.body.username);
    db.MechanicCentreCredential.findAll({
      where: {
        user_username: "rob@gmail.com"
      }
    }).then(function (results) {
      console.log(results[0].timeslots);
      var schedule = [];
      for (i = 0; i < results[0].timeslots; i++) {
        var slot = {
          startTime: "09:00",
          endTime: "09:30"
        };
        schedule.push(slot);
      }
      console.log(schedule);
      res.json(schedule);
    });
    // oldDB.query(
    //   "SELECT user_username FROM MechanicCentreCredentials WHERE ?",
    //   { user_username: "rob@gmail.com" },
    //   function (error, results) {
    //     if (error) {
    //       throw error;
    //     } else {
    //       console.log(results[0].timeslots);
    //       var schedule = [];
    //       for (i = 0; i < results[0].timeslots; i++) {
    //         var slot = {
    //           startTime: "09:00",
    //           endTime: "09:30"
    //         };
    //         schedule.push(slot);
    //       }
    //       console.log(schedule);
    //       res.json(schedule);
    //     }
    //   }
    // );
  });

  app.post("/api/noduplicateusernames", function (req, res) {
    db.MechanicCentreCredential.findAll({
      where: {
        user_username: req.body.username
      }
    }).then(function (results) {
      var searchResult = { usernameAlreadyExists: true };
      if (results.length === 0) {
        searchResult.usernameAlreadyExists = false;
      }
      res.json(searchResult);
    });
  });

  // ########################################################################
  // ORDINARY HOURS of MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE <<<
  // query to get ALL MECHANIC CENTRE ORDINARY HOURS
  // app.get("/api/mechaniccentreordinaryhours", function(req, res) {
  //   db.MechanicCentreOrdinaryHour.findAll().then(function(results) {
  //     res.json(results);
  //   });
  // });
  // query to get SINGLE MECHANIC CENTRE ORDINARY HOURS
  app.get("/api/mechaniccentreordinaryhours/:mechaniccentreid", function (
    req,
    res
  ) {
    db.MechanicCentreOrdinaryHour.findAll({
      where: {
        mechanic_centre_id: req.params.mechaniccentreid
      }
    }).then(function (results) {
      console.log(req.params.scheduledate);
      var scheduleDate = moment();
      var currentDOW = scheduleDate.day();
      var openingTime;
      var closingTime;

      switch (currentDOW) {
        case 0:
          openingTime = results[0].sun_start;
          closingTime = results[0].sun_end;
          break;
        case 1:
          openingTime = results[0].mon_start;
          closingTime = results[0].mon_end;
          break;
        case 2:
          openingTime = results[0].tue_start;
          closingTime = results[0].tue_end;
          break;
        case 3:
          openingTime = results[0].wed_start;
          closingTime = results[0].wed_end;
          break;
        case 4:
          openingTime = results[0].thu_start;
          closingTime = results[0].thu_end;
          break;
        case 5:
          openingTime = results[0].fri_start;
          closingTime = results[0].fri_end;
          break;
        case 6:
          openingTime = results[0].sat_start;
          closingTime = results[0].sat_end;
          break;
      }
      console.log(openingTime);
      console.log(closingTime);

      var dailyHours = moment(closingTime, "HH:mm:ss").diff(moment(openingTime, "HH:mm:ss"), "minutes");
      var slotCount = dailyHours / 30;
      console.log(slotCount);

      var appointmentSlots = [];
      var slotStart = moment(openingTime, "HH:mm:ss").format("HH:mm:ss");
      var slotEnd = moment(openingTime, "HH:mm:ss").add(30, "minutes").format("HH:mm:ss");
      console.log(slotStart);
      console.log(slotEnd);

      for (i = 0; i < slotCount; i++) {
        var currentSlot = {
          slotID: i,
          slotDate: scheduleDate.format("YYYY-MM-DD"),
          startTime: slotStart,
          endTime: slotEnd
        };
        appointmentSlots.push(currentSlot);
        slotStart = moment(slotStart, "HH:mm:ss").add(30, "minutes").format("HH:mm:ss");
        slotEnd = moment(slotEnd, "HH:mm:ss").add(30, "minutes").format("HH:mm:ss");
      }

      console.log(appointmentSlots);

      res.json(appointmentSlots);
    });
    // oldDB.query(
    //   "SELECT * FROM MechanicCentreOrdinaryHours WHERE ?",
    //   {
    //     mechanic_centre_id: req.params.mechaniccentreid
    //   },
    //   function (error, results) {
    //     console.log(req.params.scheduledate);
    //     var scheduleDate = moment();
    //     var currentDOW = scheduleDate.day();
    //     var openingTime;
    //     var closingTime;

    //     switch (currentDOW) {
    //       case 0:
    //         openingTime = results[0].sun_start;
    //         closingTime = results[0].sun_end;
    //         break;
    //       case 1:
    //         openingTime = results[0].mon_start;
    //         closingTime = results[0].mon_end;
    //         break;
    //       case 2:
    //         openingTime = results[0].tue_start;
    //         closingTime = results[0].tue_end;
    //         break;
    //       case 3:
    //         openingTime = results[0].wed_start;
    //         closingTime = results[0].wed_end;
    //         break;
    //       case 4:
    //         openingTime = results[0].thu_start;
    //         closingTime = results[0].thu_end;
    //         break;
    //       case 5:
    //         openingTime = results[0].fri_start;
    //         closingTime = results[0].fri_end;
    //         break;
    //       case 6:
    //         openingTime = results[0].sat_start;
    //         closingTime = results[0].sat_end;
    //         break;
    //     }
    //     console.log(openingTime);
    //     console.log(closingTime);

    //     var dailyHours = moment(closingTime, "HH:mm:ss").diff(moment(openingTime, "HH:mm:ss"), "minutes");
    //     var slotCount = dailyHours / 30;
    //     console.log(slotCount);

    //     var appointmentSlots = [];
    //     var slotStart = moment(openingTime, "HH:mm:ss").format("HH:mm:ss");
    //     var slotEnd = moment(openingTime, "HH:mm:ss").add(30, "minutes").format("HH:mm:ss");
    //     console.log(slotStart);
    //     console.log(slotEnd);

    //     for (i = 0; i < slotCount; i++) {
    //       var currentSlot = {
    //         slotID: i,
    //         slotDate: scheduleDate.format("YYYY-MM-DD"),
    //         startTime: slotStart,
    //         endTime: slotEnd
    //       };
    //       appointmentSlots.push(currentSlot);
    //       slotStart = moment(slotStart, "HH:mm:ss").add(30, "minutes").format("HH:mm:ss");
    //       slotEnd = moment(slotEnd, "HH:mm:ss").add(30, "minutes").format("HH:mm:ss");
    //     }

    //     console.log(appointmentSlots);

    //     res.json(appointmentSlots);
    //   }
    // );
  });
  // ########################################################################
  // APPOINTMENTS of MECHANIC CENTRES
  // ########################################################################
  // >>> PRIVATE <<<
  // // query to get ALL MECHANIC CENTRE APPOINTMENTS
  // app.get("/api/appointments", function (req, res) {
  //   db.Appointment.findAll().then(function (results) {
  //     console.log('asdf');
  //     res.json(results);
  //   });
  // });
  // query to get SINGLE APPOINTMENT DETAILS
  app.get("/api/appointments/customer/:appointmentid", function (req, res) {
    var appointmentid = "00000001";
    appointmentid = parseInt(appointmentid, 10);
    db.Appointment.findAll({ where: { id: appointmentid } }).then(function (results) {
      res.json(results);
    });
  });
  // query to get APPOINTMENT COUNT by MECHANIC CENTRE ID
  // // SELECT appointment_date, appointment_time, appointment_datetime, count(appointment_datetime) FROM Appointments WHERE mechanic_centre_id = 4 GROUP BY appointment_date, appointment_time, appointment_datetime ORDER BY appointment_datetime;
  // // SELECT appointment_datetime, count(appointment_datetime) FROM Appointments WHERE mechanic_centre_id = 4 GROUP BY appointment_datetime ORDER BY appointment_datetime;
  app.get("/api/appointmentscounttoday/:mechaniccentreid", function (req, res) {
    db.Appointment.findAll({
      attributes: ['appointment_date', 'appointment_time', 'appointment_datetime', [db.sequelize.fn('COUNT', db.sequelize.col('appointment_datetime')), 'same_datetime']],
      where: {
        mechanic_centre_id: req.params.mechaniccentreid
      },
      order: [
        ["appointment_datetime"]
      ],
      group: ['appointment_datetime', 'appointment_date', 'appointment_time']
    }).then(function (results) {
      res.json(results);
    });
  });
  app.get("/api/appointmentscount/:mechaniccentreid", function (req, res) {
    var curr = new moment();
    var currDateTime = new moment(curr.format("YYYY-MM-DD")).add(2, "days");
    db.Appointment.findAll({
      attributes: ['appointment_date', 'appointment_time', 'appointment_datetime', [db.sequelize.fn('COUNT', db.sequelize.col('appointment_datetime')), 'same_datetime']],
      where: {
        mechanic_centre_id: req.params.mechaniccentreid,
        appointment_datetime: {
          [db.Sequelize.Op.gte]: currDateTime.format("YYYY-MM-DD 00:00:00")
        }
      },
      order: [
        ["appointment_datetime"]
      ],
      group: ['appointment_datetime', 'appointment_date', 'appointment_time']
    }).then(function (results) {
      res.json(results);
    });
  });
  // query to CREATE A NEW APPOINTMENTS
  app.post("/api/appointments", function (req, res) {
    console.log(req.body);
    db.Appointment.create({
      mechanic_centre_id: 5,
      service_id: 5,
      appointment_date: "2019-12-01",
      appointment_time: "11:30:00",
      appointment_datetime: "2019-12-01 11:30:00",
      phone: "0410500100",
      email: "adam@gmail.com",
      car_plate: "ABC123",
      car_brand: "mazda",
      car_model: "model 11",
      additional_notes: "make it fancy",
    }).then(function (result) {
      res.json(result);
    });
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
  app.post("/api/login", function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    db.sequelize.query(
      "SELECT * FROM MechanicCentres LEFT OUTER JOIN MechanicCentreCredentials ON MechanicCentres.id = MechanicCentreCredentials.mechanic_centre_id WHERE user_username = :username AND user_password = :password",
      { replacements: { username: req.body.username, password: req.body.password }, type: db.sequelize.QueryTypes.SELECT }
    ).then(function (results) {
      console.log(results);
      res.json(results);
    });
  });
  // ########################################################################
  // AUTHENTICATED ACTIONS - VIEWING INFORMATION
  // ########################################################################
  // query to get AUTHENTICATED ACCESS TO MECHANIC CENTRE DASHBOARD
  app.post("/api/viewmechaniccentreappointments", function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    if (!req.body.username || !req.body.password) {
      res.send('fail').end();
    } else {
      db.sequelize.query(
        "SELECT * FROM MechanicCentres LEFT OUTER JOIN MechanicCentreCredentials ON MechanicCentres.id = MechanicCentreCredentials.mechanic_centre_id WHERE user_username = :username AND user_password = :password",
        { replacements: { username: req.body.username, password: req.body.password }, type: db.sequelize.QueryTypes.SELECT }
      ).then(function (result) {
        console.log('mechanic_centre_id', result[0].id);
        // db.Appointment.findAll({ where: { mechanic_centre_id: result[0].mechanic_centre_id } }).then(function (results) {
        //   res.json(results);
        // });
        db.sequelize.query(
          "SELECT * FROM Appointments LEFT OUTER JOIN Services ON Appointments.service_id = Services.id WHERE mechanic_centre_id = :mechaniccentreid",
          { replacements: { mechaniccentreid: result[0].mechanic_centre_id }, type: db.sequelize.QueryTypes.SELECT }
        ).then(function (results) {
          res.json(results);
        });
      });
    }
  });

  // ########################################################################
  // AUTHENTICATED ACTIONS - UPDATING INFORMATION
  // ########################################################################
  app.put("/api/changepassword", function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.newpassword);

    db.MechanicCentreCredential.findAll({
      where: {
        // user_username: "rob@gmail.com",
        // user_password: "efef"
        user_username: req.body.username,
        user_password: req.body.password
      }
    }
    ).then(function (results) {
      if (results.length !== 0) {
        db.MechanicCentreCredential.update(
          {
            // user_password: "efef"
            user_password: req.body.newpassword
          },
          {
            where: {
              mechanic_centre_id: results[0].mechanic_centre_id
            }
          }
        ).then(function (result) {
          res.json(result);
        });
      }
    });
  });
  // query to UPDATE A SINGLE MECHANIC CENTRE
  app.put("/api/updatemechaniccentre", function (req, res) {
    var mechanicCentreData = {};
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
      mechanicCentreData.employee_count = req.body.mechanicCount;
      // mechanicCentreData.latitude = -27.3818;
      // mechanicCentreData.longitude = 152.713;
    } else {
      console.log("something missing");
      res.send("fail").end();
      return;
    }

    db.MechanicCentreCredential.findOne({
      where: {
        user_username: req.body.username,
        user_password: req.body.password
      }
    }).then(function (result) {
      var mechanicCentreId = result.mechanic_centre_id;
      db.MechanicCentre.update(
        mechanicCentreData,
        {
          where: {
            id: mechanicCentreId
          }
        }
      ).then(function (results) {
        console.log(results);
        // res.json(results);
        res.json({ successful: true });
      });
    });
  });
  // query to UPDATE A SINGLE MECHANIC CENTRE HOURS
  app.get("/api/updatemechaniccentreordinaryhours", function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    db.MechanicCentreCredential.findAll({
      where: {
        // user_username: "rob@gmail.com",
        user_username: req.body.username,
        // user_password: "efef",
        user_password: req.body.password,
      }
    }).then(function (results) {
      console.log(results);
      db.MechanicCentreOrdinaryHour.update(
        {
          mon_start: req.body.monStart || "00:00:00",
          mon_end: req.body.monEnd || "18:30:00",
          tue_start: req.body.tueStart || "00:00:00",
          tue_end: req.body.tueEndt || "18:30:00",
          wed_start: req.body.wedStart || "09:20:00",
          wed_end: req.body.wedEnd || "18:30:00",
          thu_start: req.body.thuStart || "00:00:00",
          thu_end: req.body.thuEnd || "18:30:00",
          fri_start: req.body.friStart || "00:00:00",
          fri_end: req.body.friEnd || "00:00:00",
          sat_start: req.body.satStart || "00:00:00",
          sat_end: req.body.satEnd || "00:00:00",
          sun_start: req.body.sunStart || "00:00:00",
          sun_end: req.body.sunEnd || "00:00:00"
        },
        {
          where: {
            mechanic_centre_id: results[0].mechanic_centre_id
          }
        }
      ).then(function (result) {
        res.json(result);
      });
    });
  });
  // query to DELETE SERVICES FROM A SINGLE MECHANIC CENTRE
  app.put("/api/deletemechaniccentreservices", function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    db.MechanicCentreCredential.findAll({
      where: {
        user_username: "mark@gmail.com",
        user_password: "asdf1234"
        // user_username: req.body.username,
        // user_password: req.body.password
      }
    }).then(function (results) {
      var deleteServicesArr = [1, 2, 3, 4, 5];
      if (deleteServicesArr.length !== 0) {
        db.MechanicCentreService.destroy({
          where: {
            [db.Sequelize.Op.or]: [
              { [db.Sequelize.Op.and]: [{ mechanic_centre_id: results[0].mechanic_centre_id }, { service_id: 1 }] },
              { [db.Sequelize.Op.and]: [{ mechanic_centre_id: results[0].mechanic_centre_id }, { service_id: 2 }] },
              { [db.Sequelize.Op.and]: [{ mechanic_centre_id: results[0].mechanic_centre_id }, { service_id: 3 }] },
              { [db.Sequelize.Op.and]: [{ mechanic_centre_id: results[0].mechanic_centre_id }, { service_id: 4 }] },
              { [db.Sequelize.Op.and]: [{ mechanic_centre_id: results[0].mechanic_centre_id }, { service_id: 5 }] }
            ]
          }
        });
      }
    });
  });
  // query to INSERT SERVICES FOR A SINGLE MECHANIC CENTRE
  app.get("/api/createmechaniccentreservices", function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    db.MechanicCentreCredential.findAll({
      where: {
        user_username: "mark@gmail.com",
        user_password: "asdf1234"
        // user_username: req.body.username,
        // user_password: req.body.password
      }
    }).then(function (results) {
      var createServicesArr = [1, 2, 3, 4, 5];
      if (createServicesArr.length !== 0) {
        var createServicesArr = createServicesArr.map(function (curr) {
          return { mechanic_centre_id: results[0].mechanic_centre_id, service_id: curr };
        });
        db.MechanicCentreService.bulkCreate(createServicesArr).then(function (results) {
          res.json(results);
        });
      }
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
  // ########################################################################
  // CUSTOM QUERIES
  // ########################################################################
  // query to get MECHANICS THAT PROVIDE A SPECIFIC SERVICES AND WITHIN SPECIFIC RANGE
  app.get("/api/mechaniccentresfilter", function (req, res) {
    var townhallstationposition = {
      latitude: -33.873539,
      longitude: 151.2047353
    };

    // console.log(req.query.servicename);
    // console.log(req.query.metres);
    // console.log(req.query.lat);
    // console.log(req.query.lon);

    var servicename = req.query.servicename || "wheel alignment";
    var metres = req.query.metres || 10000000;

    var userPosition = {
      latitude: req.query.lat || townhallstationposition.latitude,
      longitude: req.query.lon || townhallstationposition.longitude
    };

    db.sequelize.query(
      "SELECT * FROM Services LEFT OUTER JOIN MechanicCentreServices ON Services.id = MechanicCentreServices.service_id LEFT OUTER JOIN MechanicCentres ON MechanicCentreServices.mechanic_centre_id = MechanicCentres.id LEFT OUTER JOIN MechanicCentreOrdinaryHours ON MechanicCentres.id = MechanicCentreOrdinaryHours.mechanic_centre_id WHERE Services.service_name = :servicename",
      { replacements: { servicename: servicename }, type: db.sequelize.QueryTypes.SELECT }
    ).then(function (results) {
      var mechanicCentresArr = results.filter(function (curr) {
        var distance = geolib.getDistance(userPosition, {
          latitude: curr.latitude,
          longitude: curr.longitude
        });
        curr.distance_metres = distance;
        console.log(distance);
        if (distance <= metres) {
          return true;
        }
        return false;
      });
      res.json(mechanicCentresArr);
    });
  });


  app.get("/api/formrequests", function (req, res) {
    db.Appointment.findAll().then(function (results) {
      res.json(results);
    });
  });

  app.post("/api/formrequests", function (req, res) {
    db.Appointment.create({
      mechanic_centre_id: 5,
      service_id: 5,
      appointment_date: "2019-12-01",
      appointment_time: "11:30:00",
      appointment_datetime: "2019-12-01 11:30:00",
      phone: "0410500100",
      email: "adam@gmail.com",
      car_plate: "ABC123",
      car_brand: "mazda",
      car_model: "model 11",
      additional_notes: "make it fancy"
    }).then(function (results) {
      res.json(results);
    });
  });
};
