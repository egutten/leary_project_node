User = require("./user"),

module.exports = function(sequelize, DataTypes) {
  
  var ConversionEvent = sequelize.define("ConversionEvent", {
    conversion_event: {
      type: DataTypes.STRING,
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: '"Users"',
      //     key: 'id'
      //   }
      }
    });
  
  User.associate = (models) => {
    Use.hasMany(models.ConversionEvent);
  }
  
  
  
  return ConversionEvent;
};
