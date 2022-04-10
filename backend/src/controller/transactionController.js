const { Op } = require("@sequelize/core");
require("dotenv").config();
const { validationResult } = require("express-validator");
import moment from "moment";

import db from "../models";
import statusResponse from "../utilities/statusResponse";

const sendMoney = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(statusResponse.STATUS_UNPROCESSABLE_ENTITY)
      .json(
        statusResponse.createResponse(
          statusResponse.STATUS_UNPROCESSABLE_ENTITY,
          errors.array()
        )
      );
  } else {
    try {
      const body = req.body;
      let user = await db.Customer.findOne({
        where: {
          id: body.id,
        },
        include: [
          {
            model: db.CreditCard,
          },
        ],
      });

      if (user) {
        let money = user.CreditCard.money;
        let moneySend = body.moneySend;
        if (Number(money) < Number(moneySend)) {
          return res
            .status(200)
            .json(
              statusResponse.createResponse(
                statusResponse.FAILED,
                "not enough to make money"
              )
            );
        }
        await db.Transaction.create({
          idSend: body.idSend || user.CreditCard.numberCard,
          idReceive: body.idReceive,
          moneySend: moneySend,
          moneyRest: money - moneySend,
          description: body.description,
          type: "CK",
          transactionPee: 0,
          date: body.date,
        });

        await db.CreditCard.update(
          {
            money: money - moneySend,
          },
          {
            where: {
              userId: body.id,
            },
          }
        );

        let userRecive = await db.CreditCard.findOne({
          where: {
            numberCard: body.idReceive,
          },
        });

        if (userRecive) {
          await db.CreditCard.update(
            {
              money: parseInt(userRecive.money) + parseInt(moneySend),
            },
            {
              where: {
                numberCard: body.idReceive,
              },
            }
          );
        }
        return res
          .status(200)
          .json(
            statusResponse.createResponse(
              statusResponse.SUCCESS,
              "bank success"
            )
          );
      } else {
        return res
          .status(statusResponse.STATUS_NOT_FOUND)
          .json(
            statusResponse.createResponse(statusResponse.FAILED, "not found")
          );
      }
    } catch (error) {
      return res
        .status(statusResponse.STATUS_CONFLICT)
        .json(
          statusResponse.createResponse(
            statusResponse.FAILED,
            "Loi o day" + error
          )
        );
    }
  }
};

const showAllTransaction = async (req, res) => {
  try {
    const data = await db.Transaction.findAll({});
    if (data) {
      return res
        .status(200)
        .json(
          statusResponse.createResponse(statusResponse.SUCCESS, { data: data })
        );
    } else {
      return res
        .status(statusResponse.STATUS_NOT_FOUND)
        .json(statusResponse.createResponse(statusResponse.FAILED, "fails"));
    }
  } catch (error) {
    return res
      .status(statusResponse.STATUS_CONFLICT)
      .json(
        statusResponse.createResponse(
          statusResponse.FAILED,
          "Loi o day" + error
        )
      );
  }
};

const showDetailTransaction = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await db.Transaction.findAll({
      where: {
        [Op.or]: [{ idSend: id }, { idReceive: id }],
      },
    });
    if (data) {
      return res
        .status(200)
        .json(
          statusResponse.createResponse(statusResponse.SUCCESS, { data: data })
        );
    } else {
      return res
        .status(statusResponse.STATUS_NOT_FOUND)
        .json(statusResponse.createResponse(statusResponse.FAILED, "fails"));
    }
  } catch (error) {
    return res
      .status(statusResponse.STATUS_CONFLICT)
      .json(
        statusResponse.createResponse(
          statusResponse.FAILED,
          "Loi o day" + error
        )
      );
  }
};

const showByDay = async (req, res) => {
  try {
    const day = req.query.day;
    const id = req.query.id;
    // moment(day).locale("vi").format("YYYY-MM-DD HH:mm:ss");
    if (id) {
      const idUU = await db.CreditCard.findOne({
        where: {
          numberCard: id,
        },
      });
      if (idUU) {
        const user = await db.Transaction.findAll({
          where: {
            [Op.and]: [{ date: day }, { idSend: idUU.userId }],
            [Op.or]: [{ idReceive: idUU.userId }],
          },
        });
        if (user) {
          return res.status(200).json(
            statusResponse.createResponse(statusResponse.SUCCESS, {
              user: user,
            })
          );
        } else {
          return res
            .status(statusResponse.STATUS_NOT_FOUND)
            .json(
              statusResponse.createResponse(statusResponse.FAILED, "fails")
            );
        }
      }
    }
    const data = await db.Transaction.findAll({
      where: {
        date: day,
      },
    });
    if (data) {
      return res
        .status(200)
        .json(
          statusResponse.createResponse(statusResponse.SUCCESS, { data: data })
        );
    } else {
      return res
        .status(statusResponse.STATUS_NOT_FOUND)
        .json(statusResponse.createResponse(statusResponse.FAILED, "fails"));
    }
  } catch (error) {
    return res
      .status(statusResponse.STATUS_CONFLICT)
      .json(
        statusResponse.createResponse(
          statusResponse.FAILED,
          "Loi o day" + error
        )
      );
  }
};

module.exports = {
  sendMoney,
  showAllTransaction,
  showDetailTransaction,
  showByDay,
};
