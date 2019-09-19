var bcrypt = require("bcryptjs");
ConversionEvent = require("./conversion_events");
CustomerActivity = require("./customer_activity");


module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.beforeCreate(user => {
   user.password = bcrypt.hashSync(
     user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  User.associate = (models) => {
    User.hasMany(models.ConversionEvent, {
      foreignKey: 'user_id'
    });
  };
  User.associate = (models) => {
    User.hasMany(models.CustomerActivity, {
      foreignKey: 'user_id'
    });
  };
  return User;
};
