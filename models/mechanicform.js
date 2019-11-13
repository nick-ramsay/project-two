module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
    mechanic:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    date:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 10]
        }
    },
    time:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 8]
        }
    }
    });
    return Request;
  };