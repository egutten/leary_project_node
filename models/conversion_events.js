User = require("./user"),

module.exports = function(sequelize, DataTypes) {
  
  var ConversionEvent = sequelize.define("ConversionEvent", {
    conversion_event: {
      type: DataTypes.STRING,
    }
  });
  
  // ConversionEvent.hasMany(User);
  
  return ConversionEvent;
};
