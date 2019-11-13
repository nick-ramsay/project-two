module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    mechanic_centre_id: {
      type: DataTypes.INTEGER
    },
    service_id: {
      type: DataTypes.INTEGER
    },
    appointment_date: {
      type: DataTypes.STRING
    },
    appointment_time: {
      type: DataTypes.STRING
    },
    appointment_datetime: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    car_plate: {
      type: DataTypes.STRING
    },
    car_brand: {
      type: DataTypes.STRING
    },
    car_model: {
      type: DataTypes.STRING
    },
    additional_notes: {
      type: DataTypes.STRING
    }
  });
  return Appointment;
};