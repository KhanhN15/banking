const { Op } = require("@sequelize/core");
require("dotenv").config();
const { validationResult } = require("express-validator");
import moment from "moment";

import db from "../models";
import statusResponse from "../utilities/statusResponse";

const sendSaving = async (req, res) => {
  try {
    const body = req.body;
    const status = body.typeStatus;
    if (status == "GDTK") {
      /// giao dich tai khoan
      let user = await db.Customer.findOne({
        where: {
          id: body.idUser,
        },
        include: [
          {
            model: db.CreditCard,
          },
        ],
      });

      if (user) {
        let money = user.CreditCard.money;
        let moneySend = body.moneySaving;
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
          idSend: user.CreditCard.numberCard,
          idReceive: body.stkUserRecive,
          moneySend: moneySend,
          moneyRest: money - moneySend,
          description: body.description,
          type: "GTK",
          transactionPee: 0,
          date: body.date,
        });

        await db.CreditCard.update(
          {
            money: Number(user.CreditCard.money) - Number(moneySend),
          },
          {
            where: {
              userId: body.idUser,
            },
          }
        );

        let checkSaving = await db.Saving.findOne({
          where: {
            idUser: body.idUser,
          },
        });

        if (checkSaving) {
          await db.Saving.update(
            {
              moneySaving:
                parseInt(checkSaving.moneySaving) + parseInt(moneySend),
            },
            {
              where: {
                idUser: body.idUser,
              },
            }
          );
        } else {
          await db.Saving.create({
            idUser: body.idUser,
            moneySaving: moneySend,
            description: body.description,
            typeRate: body.typeRate,
            date: body.date,
          });
        }
      }
      return res
        .status(200)
        .json(
          statusResponse.createResponse(statusResponse.SUCCESS, "bank success")
        );
    } else {
      /// giao dich tien mat

      const saving = await db.Saving.create({
        idUser: body.idUser,
        moneySaving: body.moneySaving,
        typeRate: body.typeRate,
        description: body.description,
      });

      if (saving.dataValues) {
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

/// rut
const receiveSaving = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id)
      return res
        .status(statusResponse.STATUS_NOT_FOUND)
        .json(
          statusResponse.createResponse(statusResponse.FAILED, "not found")
        );
    // has id
    const saving = await db.Saving.findOne({
      where: {
        idUser: id,
      },
    });
    // check date
    // 12 thang 0.023 6 thang 0.02

    const moneySend = saving.moneySaving;
    if (!moneySend) {
      return res
        .status(statusResponse.STATUS_CONFLICT)
        .json(
          statusResponse.createResponse(statusResponse.FAILED, "Khong co tien")
        );
    }
    const typeRate = checkType(saving.typeRate); // ky han gui thang
    const checkDate = getDate(saving.date); // return so thang

    let money = validateDate(checkDate, typeRate, moneySend);

    await db.Transaction.create({
      idSend: 123,
      idReceive: req.body.stkReceive,
      moneySend: money,
      moneyRest: 0,
      description: "Rut Tien Tiet Kiem",
      type: "RTK",
      transactionPee: 0,
      date: req.body.date,
    });

    let cre = await db.CreditCard.findOne({
      where: {
        userId: id,
      },
    });

    await db.CreditCard.update(
      {
        money: Number(cre.money) + Number(money),
      },
      {
        where: {
          userId: id,
        },
      }
    );

    await db.Saving.destroy({
      where: {
        idUser: id,
      },
    });

    return res.status(200).json(
      statusResponse.createResponse(statusResponse.SUCCESS, {
        data: {
          money: money,
          typeRate: `${typeRate} Tháng`,
          period: checkDate,
        },
      })
    );
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

const showSaving = async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const saving = await db.Saving.findOne({
        where: {
          idUser: id,
        },
      });

      if (saving) {
        return res.status(200).json(
          statusResponse.createResponse(statusResponse.SUCCESS, {
            data: saving,
          })
        );
      } else {
        return res
          .status(statusResponse.STATUS_NOT_FOUND)
          .json(
            statusResponse.createResponse(statusResponse.FAILED, "notfound")
          );
      }
    } else {
      return res
        .status(statusResponse.STATUS_NOT_FOUND)
        .json(statusResponse.createResponse(statusResponse.FAILED, "notfound"));
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

const showAllSaving = async (req, res) => {
  try {
    const saving = await db.Saving.findAll({
      include: [
        {
          model: db.Customer,
          include: [
            {
              model: db.CreditCard,
            },
          ],
        },
      ],
    });

    if (saving) {
      return res.status(200).json(
        statusResponse.createResponse(statusResponse.SUCCESS, {
          data: saving,
        })
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
};

const validateDate = (checkDate, typeRate, moneySend) => {
  let money = 0;
  if (checkDate >= typeRate) {
    // dung ky han
    money = checkDate * 0.023 * moneySend;
  } else {
    money = moneySend;
  }
  return money;
};

const checkType = (text) => {
  switch (text) {
    case "12T":
      return 12;
    case "6T":
      return 6;
    default:
      return 6;
  }
};

const getDate = (date) => {
  const ngay_hien_tai = new Date().getTime();
  const ngay_gui = new Date(date).getTime();

  const period = (ngay_hien_tai - ngay_gui) / 1000 / 2592000;

  return Math.floor(period);
};

const chartSaving = async (req, res) => {
  try {
    // get all giao dich
    const data = await db.Transaction.findAll({});

    let listDate = [];
    let listD = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      let ob = null;
      obj.label = moment(new Date())
        .subtract(i, "days")
        .locale("en")
        .format("ddd - DD/MM");
      ob = moment(new Date())
        .subtract(i, "days")
        .locale("en")
        .format("ddd - DD/MM");

      obj.value = moment(new Date())
        .subtract(i, "days")
        .startOf("day")
        .format("YYYY-MM-DD")
        .valueOf();
      listDate.push(obj);
      listD.push(ob);
    }
    listDate.reverse();
    let arr = [
      {
        label: "Lenh Giao Dich",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ];
    //1
    let money1 = 0;
    data.forEach((b) => {
      if (b.date === listDate[0]["value"]) {
        money1 += Number(b.moneySend);
      }
    });
    arr[0].data.push(money1);
    //1
    //2
    let money2 = 0;
    data.forEach((b) => {
      if (b.date === listDate[1]["value"]) {
        money2 += Number(b.moneySend);
      }
    });
    arr[0].data.push(money2);
    //2
    //3
    let money3 = 0;
    data.forEach((b) => {
      if (b.date === listDate[2]["value"]) {
        money3 += Number(b.moneySend);
      }
    });
    arr[0].data.push(money3);
    //3
    //4
    let money4 = 0;
    data.forEach((b) => {
      if (b.date === listDate[3]["value"]) {
        money4 += Number(b.moneySend);
      }
    });
    arr[0].data.push(money4);
    //4
    //5
    let money5 = 0;
    data.forEach((b) => {
      if (b.date === listDate[4]["value"]) {
        money5 += Number(b.moneySend);
      }
    });
    arr[0].data.push(money5);
    //5
    //6
    let money6 = 0;
    data.forEach((b) => {
      if (b.date === listDate[5]["value"]) {
        money6 += Number(b.moneySend);
      }
    });
    arr[0].data.push(money6);
    //6
    //7
    let money7 = 0;
    data.forEach((b) => {
      if (b.date === listDate[6]["value"]) {
        money7 += Number(b.moneySend);
      }
    });
    arr[0].data.push(money7);
    //7

    return res.status(200).json(
      statusResponse.createResponse(statusResponse.SUCCESS, {
        data: arr,
        date: listD,
      })
    );
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
  sendSaving,
  receiveSaving,
  showSaving,
  showAllSaving,
  chartSaving,
};
