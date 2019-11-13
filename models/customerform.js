module.exports = function(sequelize, DataTypes) {
  var Form = sequelize.define("form", {
    carmake: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    carmodel:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    licensenumber:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 9]
      }
    },
    servicerequest:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    notes:  {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    }/*,
        customername:  {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        customeremail:  {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        customerphone:  {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        }*/
  });
  return Form;
};