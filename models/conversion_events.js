CustomerActivity = require("./customer_activity");

module.exports = (sequelize, DataTypes) => {
  
  var ConversionEvent = sequelize.define("ConversionEvent", {
    conversion_event: {
      type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      position: {
        type: DataTypes.STRING
      }
    });  
    ConversionEvent.associate = (models) => {
      ConversionEvent.hasMany(models.CustomerActivity, {
        foreignKey: 'conversion_event_id'
      });
    };
  return ConversionEvent;
};
