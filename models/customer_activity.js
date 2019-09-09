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
  
  return CustomerActivity;
};
