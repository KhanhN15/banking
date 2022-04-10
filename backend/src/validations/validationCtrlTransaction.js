const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "sendMoney": {
      return [
        body("id", "id required").notEmpty().isNumeric().exists(),
        body("idSend", "id send required").notEmpty().isNumeric().exists(),
        body("idReceive", "id receive required")
          .notEmpty()
          .isNumeric()
          .exists(),
        body("moneySend", "moneySend required").notEmpty().exists(),
        body("description", "description required").notEmpty().exists(),
      ];
    }
  }
};
