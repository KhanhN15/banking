"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasOne(models.CreditCard, {
        foreignKey: "userId",
      });
      Customer.hasOne(models.Saving, {
        foreignKey: "idUser",
      });
      Customer.hasMany(models.Transaction, {
        foreignKey: "idSend",
        as: "userDataSend",
      });
    }
  }
  Customer.init(
    {
      fullName: DataTypes.STRING,
      cccd: DataTypes.STRING,
      birthday: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      sex: DataTypes.STRING,
      passWord: DataTypes.STRING,
      status: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
