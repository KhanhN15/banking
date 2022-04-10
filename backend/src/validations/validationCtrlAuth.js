const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("userName", "userName doesnt exists").exists(),
        body("email", "Invalid email").exists(),
      ];
    }
    case "loginUser": {
      return [
        body("phone", "phone fails").exists().notEmpty().isNumeric(),
        body("password", "password fails ").exists().notEmpty(),
      ];
    }
    case "registerUser": {
      return [
        body("fullName", "full name fails")
          .exists()
          .notEmpty()
          .isLength({ max: 100 }),
        body("cccd", "CCCD fails ")
          .exists()
          .notEmpty()
          .isLength({ min: 12 })
          .isLength({ max: 13 }),
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
        body("phone", "phone fails ").exists().notEmpty(),
        body("sex", "sex fails ").exists().notEmpty(),
        body("passWord", "passWord fails ").exists().notEmpty(),
        body("numberCard", "numberCard fails ")
          .notEmpty()
          .isNumeric()
          .isLength({ min: 12 })
          .isLength({ max: 13 })
          .bail(),
      ];
    }
  }
};
