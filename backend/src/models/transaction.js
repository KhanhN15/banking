"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Customer, {
        foreignKey: "idSend",
        targetKey: "id",
        as: "userDataSend",
      });
    }
  }
  Transaction.init(
    {
      idSend: DataTypes.INTEGER,
      idReceive: DataTypes.INTEGER,
      moneySend: DataTypes.STRING,
      moneyRest: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      transactionPee: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
