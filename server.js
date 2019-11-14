require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


var repopulate = false;
db.sequelize.sync({ force: repopulate }).then(function () {
  createDummyData(repopulate);
  
  app.listen(PORT, function () {
    console.log("listening on port " + PORT);
  });
});


















function createDummyData(shouldrun) {
  if (!shouldrun) {
    return;
  }
  db.Service.bulkCreate([
    { service_name: "wheel alignment" },
    { service_name: "tyre replacement" },
    { service_name: "battery replacement" },
    { service_name: "servicing" },
    { service_name: "window tinting" }
  ]).then(function () {
    console.log('#################### services done');
    db.MechanicCentre.bulkCreate([
      {
        centre_name: "rob's auto repairs",
        phone: "0410100100",
        email: "rob@gmail.com",
        address_street: "1 A Street",
        address_city: "AAA City",
        address_postcode: "2001",
        address_state: "NSW",
        address_country: "Australia",
        latitude: -30.3,
        longitude: 125.25,
        employee_count: 3
      },
      {
        centre_name: "mark's auto repairs",
        phone: "0420200200",
        email: "mark@gmail.com",
        address_street: "1 B Street",
        address_city: "BBB City",
        address_postcode: "2002",
        address_state: "NSW",
        address_country: "Australia",
        latitude: -30.3,
        longitude: 125.25,
        employee_count: 3
      },
      {
        centre_name: "paul's auto repairs",
        phone: "0430300300",
        email: "paul@gmail.com",
        address_street: "1 C Street",
        address_city: "CCC City",
        address_postcode: "2003",
        address_state: "NSW",
        address_country: "Australia",
        latitude: -30.3,
        longitude: 125.25,
        employee_count: 3
      },
      {
        centre_name: "john's auto repairs",
        phone: "0440400400",
        email: "john@gmail.com",
        address_street: "1 D Street",
        address_city: "DDD City",
        address_postcode: "2004",
        address_state: "NSW",
        address_country: "Australia",
        latitude: -30.3,
        longitude: 125.25,
        employee_count: 3
      },
      {
        centre_name: "luke's auto repairs",
        phone: "0450500500",
        email: "luke@gmail.com",
        address_street: "1 E Street",
        address_city: "EEE City",
        address_postcode: "2005",
        address_state: "NSW",
        address_country: "Australia",
        latitude: -30.3,
        longitude: 125.25,
        employee_count: 3
      }
    ]).then(function() {
      console.log('#################### mechanic centres done');
      db.MechanicCentreCredential.bulkCreate([
        { mechanic_centre_id: 1,
          user_username: "rob@gmail.com",
          user_password: "asdf1234"
        },
        { mechanic_centre_id: 2,
          user_username: "mark@gmail.com",
          user_password: "asdf1234"
        },
        { mechanic_centre_id: 3,
          user_username: "paul@gmail.com",
          user_password: "asdf1234"
        },
        { mechanic_centre_id: 4,
          user_username: "john@gmail.com",
          user_password: "asdf1234"
        },
        { mechanic_centre_id: 5,
          user_username: "luke@gmail.com",
          user_password: "asdf1234"
        }
      ]).then(function () {
        console.log('#################### credentials done');
        db.MechanicCentreService.bulkCreate([
          { mechanic_centre_id: 1,
            service_id: 1},
          { mechanic_centre_id: 1,
            service_id: 2},
          { mechanic_centre_id: 1,
            service_id: 3},
          { mechanic_centre_id: 1,
            service_id: 4},
          { mechanic_centre_id: 1,
            service_id: 5},
          { mechanic_centre_id: 2,
            service_id: 1},
          { mechanic_centre_id: 2,
            service_id: 2},
          { mechanic_centre_id: 2,
            service_id: 3},
          { mechanic_centre_id: 2,
            service_id: 4},
          { mechanic_centre_id: 2,
            service_id: 5},
          { mechanic_centre_id: 3,
            service_id: 1},
          { mechanic_centre_id: 3,
            service_id: 2},
          { mechanic_centre_id: 3,
            service_id: 3},
          { mechanic_centre_id: 3,
            service_id: 4},
          { mechanic_centre_id: 3,
            service_id: 5},
          { mechanic_centre_id: 4,
            service_id: 1},
          { mechanic_centre_id: 4,
            service_id: 2},
          { mechanic_centre_id: 4,
            service_id: 3},
          { mechanic_centre_id: 4,
            service_id: 4},
          { mechanic_centre_id: 4,
            service_id: 5},
          { mechanic_centre_id: 5,
            service_id: 1},
          { mechanic_centre_id: 5,
            service_id: 2},
          { mechanic_centre_id: 5,
            service_id: 3},
          { mechanic_centre_id: 5,
            service_id: 4},
          { mechanic_centre_id: 5,
            service_id: 5}
        ]).then(function () {
          console.log('#################### mechanic services done');
          db.MechanicCentreOrdinaryHour.bulkCreate([
            { mechanic_centre_id: 1,
              mon_start: "09:30:00",
              mon_end: "18:30:00",
              tue_start: "09:30:00",
              tue_end: "18:30:00",
              wed_start: "09:30:00",
              wed_end: "18:30:00",
              thu_start: "09:30:00",
              thu_end: "18:30:00",
              fri_start: "09:30:00",
              fri_end: "18:30:00",
              sat_start: "09:30:00",
              sat_end: "18:30:00",
              sun_start: "09:30:00",
              sun_end: "18:30:00"
            },
            { mechanic_centre_id: 2,
              mon_start: "09:30:00",
              mon_end: "18:30:00",
              tue_start: "09:30:00",
              tue_end: "18:30:00",
              wed_start: "09:30:00",
              wed_end: "18:30:00",
              thu_start: "09:30:00",
              thu_end: "18:30:00",
              fri_start: "09:30:00",
              fri_end: "18:30:00",
              sat_start: "09:30:00",
              sat_end: "18:30:00",
              sun_start: "09:30:00",
              sun_end: "18:30:00"
            },
            { mechanic_centre_id: 3,
              mon_start: "09:30:00",
              mon_end: "18:30:00",
              tue_start: "09:30:00",
              tue_end: "18:30:00",
              wed_start: "09:30:00",
              wed_end: "18:30:00",
              thu_start: "09:30:00",
              thu_end: "18:30:00",
              fri_start: "09:30:00",
              fri_end: "18:30:00",
              sat_start: "09:30:00",
              sat_end: "18:30:00",
              sun_start: "09:30:00",
              sun_end: "18:30:00"
            },
            { mechanic_centre_id: 4,
              mon_start: "09:30:00",
              mon_end: "18:30:00",
              tue_start: "09:30:00",
              tue_end: "18:30:00",
              wed_start: "09:30:00",
              wed_end: "18:30:00",
              thu_start: "09:30:00",
              thu_end: "18:30:00",
              fri_start: "09:30:00",
              fri_end: "18:30:00",
              sat_start: "09:30:00",
              sat_end: "18:30:00",
              sun_start: "09:30:00",
              sun_end: "18:30:00"
            },
            { mechanic_centre_id: 5,
              mon_start: "09:30:00",
              mon_end: "18:30:00",
              tue_start: "09:30:00",
              tue_end: "18:30:00",
              wed_start: "09:30:00",
              wed_end: "18:30:00",
              thu_start: "09:30:00",
              thu_end: "18:30:00",
              fri_start: "09:30:00",
              fri_end: "18:30:00",
              sat_start: "09:30:00",
              sat_end: "18:30:00",
              sun_start: "09:30:00",
              sun_end: "18:30:00"
            }
          ]).then(function () {
            console.log('#################### mechanic ordinary hours done');
            db.Appointment.bulkCreate([
              { mechanic_centre_id: 1,
                service_id: 1,
                appointment_date: "2019-11-30",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-30 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 1,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 1,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-29 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 1,
                service_id: 1,
                appointment_date: "2019-11-29",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-29 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },






              
              { mechanic_centre_id: 2,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 2,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 2,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 2,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },






              
              { mechanic_centre_id: 3,
                service_id: 3,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 3,
                service_id: 5,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 3,
                service_id: 2,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 3,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },






              
              { mechanic_centre_id: 4,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 4,
                service_id: 3,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 4,
                service_id: 4,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 4,
                service_id: 5,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },






              
              { mechanic_centre_id: 5,
                service_id: 1,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 5,
                service_id: 2,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 5,
                service_id: 3,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "aaa@gmail.com",
                car_plate: "AAA111",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              },
              { mechanic_centre_id: 5,
                service_id: 4,
                appointment_date: "2019-11-28",
                appointment_time: "12:00:00",
                appointment_datetime: "2019-11-28 12:00:00",
                phone: "0412341234",
                email: "ddd@gmail.com",
                car_plate: "DDD999",
                car_brand: "mazda",
                car_model: "model 1",
                additional_notes: "please fix quickly"
              }
            ]).then(function () {
              console.log('#################### appointments done');
            });
          });
        });
      });
    });
  });
}

module.exports = app;


