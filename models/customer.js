CustomerActivity = require("./customer_activity");

module.exports = function(sequelize, DataTypes) {
  
  var Customer = sequelize.define("Customer", {
    email: {
      type: DataTypes.STRING
      },
    company_name: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    logo: {
      type: DataTypes.TEXT
    },
  });  
  Customer.associate = (models) => {
    Customer.hasMany(models.CustomerActivity, {
      foreignKey: 'customer_id'
    });
  };
  return Customer;
};
