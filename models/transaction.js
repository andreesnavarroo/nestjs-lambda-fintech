'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    transaction_id: DataTypes.INTEGER,
    customer_name: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    transaction_type: DataTypes.STRING,
    status: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};