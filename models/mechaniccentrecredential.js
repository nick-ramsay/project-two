module.exports = function(sequelize, DataTypes) {
  var MechanicCentreCredential = sequelize.define("MechanicCentreCredential", {
    mechanic_centre_id: {
      type: DataTypes.INTEGER
    },
    user_username: {
      type: DataTypes.STRING
    },
    user_password: {
      type: DataTypes.STRING
    }
  });
  return MechanicCentreCredential;
};