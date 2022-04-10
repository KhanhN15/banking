const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "updateUser": {
      return [
        body("id", "Id required").notEmpty().isNumeric(),
        body("roleId", "roleId required").notEmpty(),
        body("fullName", "full name fails")
          .exists()
          .notEmpty()
          .isLength({ max: 100 }),
        body("birthday", "birthday fails ").exists().notEmpty(),
        body("address", "address fails ")
          .exists()
          .notEmpty()
          .isLength({ max: 200 }),
        body("email", "email fails ")
          .isLength({ max: 80 })
          .normalizeEmail()
          .isEmail()
          .exists(),
        body("sex", "sex fails ").exists().notEmpty(),
      ];
    }
  }
};
