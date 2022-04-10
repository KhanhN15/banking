const { Op } = require("@sequelize/core");
require("dotenv").config();
const { validationResult } = require("express-validator");

import db from "../models";
import statusResponse from "../utilities/statusResponse";

const showAllUser = async (req, res) => {
  try {
    const data = await db.Customer.findAll({
      attributes: { exclude: ["passWord"] },
    });
    if (data) {
      return res
        .status(statusResponse.STATUS_SUCCESS)
        .json(
          statusResponse.createResponse(statusResponse.SUCCESS, { data: data })
        );
    }
    return res
      .status(statusResponse.STATUS_NOT_FOUND)
      .json(statusResponse.createResponse(statusResponse.FAILED, "not found"));
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

const showIndividual = async (req, res) => {
  try {
    const data = await db.Customer.findOne({
      where: {
        id: req.query.id,
      },
      attributes: { exclude: ["passWord", "refreshToken"] },
      include: [
        {
          model: db.CreditCard,
        },
      ],
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

const updateUser = async (req, res) => {
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
      const data = await db.Customer.update(
        {
          fullName: body.fullName,
          birthday: body.birthday,
          address: body.address,
          email: body.email,
          sex: body.sex,
          roleId: body.roleId,
        },
        {
          where: {
            id: body.id,
          },
        }
      );
      if (data) {
        return res
          .status(200)
          .json(
            statusResponse.createResponse(statusResponse.SUCCESS, "success")
          );
      } else {
        return res
          .status(statusResponse.STATUS_NOT_FOUND)
          .json(statusResponse.createResponse(statusResponse.FAILED, "fails"));
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

const uploadImg = async (req, res) => {
  if (req.file && req.body.id) {
    const data = await db.Customer.update(
      {
        image: req.file.filename,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    if (data) {
      return res
        .status(200)
        .json(
          statusResponse.createResponse(
            statusResponse.SUCCESS,
            "upload success"
          )
        );
    }
  } else {
    return res
      .status(statusResponse.STATUS_NOT_FOUND)
      .json(
        statusResponse.createResponse(statusResponse.FAILED, "fails to upload")
      );
  }
};

const activeUser = async (req, res) => {
  try {
    const idUser = req.query.id;
    const status = req.query.status;
    const data = await db.Customer.update(
      {
        status: status,
      },
      {
        where: {
          id: idUser,
        },
      }
    );
    if (data) {
      return res
        .status(200)
        .json(statusResponse.createResponse(statusResponse.SUCCESS, "success"));
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

const showCredit = async (req, res) => {
  try {
    const data = await db.CreditCard.findOne({
      where: {
        numberCard: req.query.credit,
      },
      attributes: {
        exclude: ["money", "userId", "createdAt", "updatedAt"],
      },

      include: [
        {
          model: db.Customer,
          attributes: {
            exclude: [
              "passWord",
              "refreshToken",
              "cccd",
              "email",
              "sex",
              "phone",
              "status",
              "roleId",
              "birthday",
              "address",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
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
module.exports = {
  showAllUser,
  showIndividual,
  updateUser,
  uploadImg,
  activeUser,
  showCredit,
};
