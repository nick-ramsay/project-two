module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define("Service", {
    service_name: {
      type: DataTypes.STRING
    }
  });
  return Service;
};