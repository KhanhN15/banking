"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saving extends Model {
    static associate(models) {
      Saving.belongsTo(models.Customer, {
        foreignKey: "idUser",
      });
    }
  }
  Saving.init(
    {
      idUser: DataTypes.INTEGER,
      moneySaving: DataTypes.STRING,
      idTransaction: DataTypes.INTEGER,
      description: DataTypes.STRING,
      typeRate: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Saving",
    }
  );
  return Saving;
};
