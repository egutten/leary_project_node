User = require("./user")

module.exports = function(sequelize, DataTypes) {
  
  var ConversionEvent = sequelize.define("ConversionEvent", {
    conversion_event: {
      type: DataTypes.STRING,
      }
    });
  
  // User.associate = (models) => {
    User.hasMany(ConversionEvent);
  // }
  
  
  
  return ConversionEvent;
};
