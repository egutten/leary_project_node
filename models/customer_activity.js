module.exports = (sequelize, DataTypes) => {
  
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
  CustomerActivity.trackActivity = function (response, data) {
    return this.create({
      event: data.event,
      conversion_event_id: data.conversion_event_id,
      customer_id: data.customer_id || response,
      user_id: data.user_id
    })
  }
  
  return CustomerActivity;
};
