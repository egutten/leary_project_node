module.exports = function(sequelize, DataTypes) {
  
  var ConversionEvent = sequelize.define("ConversionEvent", {
    conversion_event: {
      type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER
      }
    });  
  
  return ConversionEvent;
};
