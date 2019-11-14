module.exports = function(sequelize, DataTypes) {
  var MechanicCentre = sequelize.define("MechanicCentre", {
    centre_name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address_street: {
      type: DataTypes.STRING
    },
    address_city: {
      type: DataTypes.STRING
    },
    address_postcode: {
      type: DataTypes.STRING
    },
    address_state: {
      type: DataTypes.STRING
    },
    address_country: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DECIMAL
    },
    longitude: {
      type: DataTypes.DECIMAL
    },
    employee_count: {
      type: DataTypes.INTEGER
    }
  });
  return MechanicCentre;
};