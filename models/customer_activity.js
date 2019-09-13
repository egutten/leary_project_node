module.exports = function(sequelize, DataTypes) {
  
  var CustomerActivity = sequelize.define("CustomerActivity", {
    event: {
      type: DataTypes.STRING
      },
    props: {
      type: DataTypes.STRING
    },
    conversion_event_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    customer_id: {
      type: DataTypes.INTEGER
    },
  });
  CustomerActivity.associate = (models) => {
    CustomerActivity.belongsTo(models.ConversionEvent, {
      foreignKey: 'conversion_event_id',
      as: 'ConversionEvent'
    });
    CustomerActivity.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'Customer'
    });
    CustomerActivity.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User'
    });
  };  
  return CustomerActivity;
};
