module.exports = function(sequelize, DataTypes) {
  var MechanicCentreService = sequelize.define("MechanicCentreService", {
    mechanic_centre_id: {
      type: DataTypes.INTEGER
    },
    service_id: {
      type: DataTypes.INTEGER
    }
  });
  return MechanicCentreService;
};