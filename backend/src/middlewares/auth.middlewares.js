const jwt = require("jsonwebtoken");
import statusResponse from "../utilities/statusResponse";

import db from "../models";

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // Bearer tokenstring
    if (token) {
      await jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, payload) => {
          if (error) {
            return res
              .status(statusResponse.STATUS_UNAUTHORIZED)
              .json(
                statusResponse.createResponse(
                  statusResponse.ERROR,
                  "Đã xảy ra lỗi: UnAuthorized"
                )
              );
          }
          req.userID = payload.sub.id;
          next();
        }
      );
    } else {
      return res
        .status(statusResponse.STATUS_FORBIDDEN)
        .json(
          statusResponse.createResponse(
            statusResponse.ERROR,
            "Đã xảy ra lỗi: Invalid Token"
          )
        );
    }
  } catch (error) {
    return res
      .status(statusResponse.SERVER_ERROR)
      .json(
        statusResponse.createResponse(
          statusResponse.ERROR,
          "Đã xảy ra lỗi: hihiihhi" + error
        )
      );
  }
}

async function verifyTokenAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // Bearer tokenstring
    if (token) {
      await jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, payload) => {
          if (error) {
            return res
              .status(statusResponse.STATUS_UNAUTHORIZED)
              .json(
                statusResponse.createResponse(
                  statusResponse.ERROR,
                  "Đã xảy ra lỗi: UnAuthorized"
                )
              );
          }
          req.userID = payload.sub.id;
          if (payload.sub.roleId == 1) {
            next();
          } else {
            return res
              .status(statusResponse.STATUS_UNAUTHORIZED)
              .json(
                statusResponse.createResponse(
                  statusResponse.ERROR,
                  " UnAuthorized"
                )
              );
          }
        }
      );
    } else {
      return res
        .status(statusResponse.STATUS_FORBIDDEN)
        .json(
          statusResponse.createResponse(
            statusResponse.ERROR,
            "Đã xảy ra lỗi: Invalid Token"
          )
        );
    }
  } catch (error) {
    return res
      .status(statusResponse.SERVER_ERROR)
      .json(
        statusResponse.createResponse(
          statusResponse.ERROR,
          "Đã xảy ra lỗi: hihiihhi" + error
        )
      );
  }
}

module.exports = {
  verifyToken,
  verifyTokenAdmin,
};
