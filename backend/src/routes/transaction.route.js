import express from "express";

import { validate } from "../validations/validationCtrlTransaction";
import transactionController from "../controller/transactionController";
import { verifyTokenAdmin, verifyToken } from "../middlewares/auth.middlewares";

const router = express.Router();
// route send money
router.post(
  "/send-money",
  validate("sendMoney"),
  verifyToken,
  transactionController.sendMoney
);

router.get(
  "/ad/show-all-transaction",
  verifyTokenAdmin,
  transactionController.showAllTransaction
);

router.get(
  "/show-detail",
  verifyToken,
  transactionController.showDetailTransaction
);

router.get(
  "/ad/show-by-day",
  verifyTokenAdmin,
  transactionController.showByDay
);
router.get("/show-by-day", verifyToken, transactionController.showByDay);

export const transactionRouter = router;
