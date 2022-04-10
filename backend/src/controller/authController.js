const { Op } = require("@sequelize/core");
import bcrypt from "bcryptjs";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

import db from "../models";
import statusResponse from "../utilities/statusResponse";

const salt = bcrypt.genSaltSync(10);

const check = (req, res) => {
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
    return res
      .status(200)
      .json(
        statusResponse.createResponse(statusResponse.SUCCESS, "Khanhbatluc")
      );
  }
};

const login = async (req, res) => {
  try {
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
      const body = req.body;
      const user = await db.Customer.findOne({
        where: {
          phone: body.phone,
        },
        include: [
          {
            model: db.Saving,
          },
          { model: db.CreditCard },
        ],
      });
      if (user) {
        let checkPass = await bcrypt.compareSync(
          body.password,
          user.dataValues.passWord
        );
        if (checkPass) {
          // success
          const access_token = jwt.sign(
            {
              sub: {
                id: user.dataValues.id,
                roleId: user.dataValues.roleId,
              },
            },
            process.env.SECRET_ACCESS_TOKEN,
            { expiresIn: "7d" }
          );
          const refresh_token = renderRefreshToken(user.dataValues.id);
          // update code
          await db.Customer.update(
            { refreshToken: refresh_token },
            {
              where: {
                id: user.dataValues.id,
              },
            }
          );
          const userCopy = (({ passWord, ...other }) => other)(user.dataValues);
          // code update saving money this here
          // let utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
          // if (user.Saving.date === utc) {

          // }
          // end code update saving money
          return res.status(200).json(
            statusResponse.createResponse(statusResponse.SUCCESS, {
              user: userCopy,
              access_token: access_token,
            })
          );
        } else {
          return res
            .status(statusResponse.STATUS_CONFLICT)
            .json(
              statusResponse.createResponse(
                statusResponse.FAILED,
                "Tai khoan or password not match"
              )
            );
        }
      } else {
        return res
          .status(statusResponse.STATUS_CONFLICT)
          .json(
            statusResponse.createResponse(
              statusResponse.FAILED,
              "Tai khoan or password not match"
            )
          );
      }
      // when user has match
    }
  } catch (error) {
    return res
      .status(statusResponse.STATUS_NOT_FOUND)
      .json(
        statusResponse.createResponse(
          statusResponse.FAILED,
          "Đã xảy ra lỗi: " + error
        )
      );
  }
};

const register = async (req, res) => {
  try {
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
      // data body {fullName,cccd,birthday,address,email......}
      let body = req.body;

      const userF = await db.Customer.findOne({
        where: {
          [Op.or]: [{ cccd: body.cccd }, { phone: body.phone }],
        },
      });
      if (userF) {
        return res
          .status(statusResponse.STATUS_NOT_FOUND)
          .json(statusResponse.createResponse(statusResponse.ERROR, "Exits"));
      }
      // add role and status
      const passHash = await bcrypt.hashSync(body.passWord, salt);
      body.status = 0;
      body.roleId = 0;
      body.passWord = passHash;

      db.Customer.create(body)
        .then((data) => {
          if (data) {
            db.CreditCard.create({
              numberCard: body.numberCard,
              money: 0,
              userId: data.dataValues.id,
            })
              .then((card) => {
                return res
                  .status(200)
                  .json(
                    statusResponse.createResponse(
                      statusResponse.SUCCESS,
                      "create success"
                    )
                  );
              })
              .catch((err) => {
                return res
                  .status(statusResponse.STATUS_NOT_FOUND)
                  .json(
                    statusResponse.createResponse(
                      statusResponse.ERROR,
                      "Đã xảy ra lỗi: " + err
                    )
                  );
              });
          }
        })
        .catch((err) => {
          return res
            .status(statusResponse.STATUS_NOT_FOUND)
            .json(
              statusResponse.createResponse(
                statusResponse.ERROR,
                "Đã xảy ra lỗi: " + err
              )
            );
        });
    }
  } catch (error) {
    return res
      .status(statusResponse.STATUS_NOT_FOUND)
      .json(
        statusResponse.createResponse(
          statusResponse.FAILED,
          "Đã xảy ra lỗi: " + error
        )
      );
  }
};

const renderRefreshToken = (user_id) => {
  const refresh_token = jwt.sign(
    { sub: user_id },
    process.env.SECRET_REFRESH_TOKEN,
    { expiresIn: "30d" }
  );
  return refresh_token;
};

const logout = async (req, res) => {
  await db.Customer.update(
    { refreshToken: " " },
    {
      where: {
        id: req.userID,
      },
    }
  )
    .then(() => {
      return res
        .status(200)
        .json(statusResponse.createResponse(statusResponse.SUCCESS, "success"));
    })
    .catch((err) => {
      return res
        .status(statusResponse.STATUS_CONFLICT)
        .json(
          statusResponse.createResponse(
            statusResponse.FAILED,
            "Loi o day" + err
          )
        );
    });
};

module.exports = {
  check,
  login,
  register,
  logout,
};
