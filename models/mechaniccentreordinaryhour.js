module.exports = function(sequelize, DataTypes) {
  var MechanicCentreOrdinaryHour = sequelize.define("MechanicCentreOrdinaryHour", {
    mechanic_centre_id: {
      type: DataTypes.INTEGER
    },
    mon_start: {
      type: DataTypes.STRING
    },
    mon_end: {
      type: DataTypes.STRING
    },
    tue_start: {
      type: DataTypes.STRING
    },
    tue_end: {
      type: DataTypes.STRING
    },
    wed_start: {
      type: DataTypes.STRING
    },
    wed_end: {
      type: DataTypes.STRING
    },
    thu_start: {
      type: DataTypes.STRING
    },
    thu_end: {
      type: DataTypes.STRING
    },
    fri_start: {
      type: DataTypes.STRING
    },
    fri_end: {
      type: DataTypes.STRING
    },
    sat_start: {
      type: DataTypes.STRING
    },
    sat_end: {
      type: DataTypes.STRING
    },
    sun_start: {
      type: DataTypes.STRING
    },
    sun_end: {
      type: DataTypes.STRING
    }
  });
  return MechanicCentreOrdinaryHour;
};