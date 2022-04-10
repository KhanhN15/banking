"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CreditCard extends Model {
    static associate(models) {
      CreditCard.belongsTo(models.Customer, {
        foreignKey: "userId",
      });
    }
  }
  CreditCard.init(
    {
      numberCard: DataTypes.INTEGER,
      money: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CreditCard",
    }
  );
  return CreditCard;
};
