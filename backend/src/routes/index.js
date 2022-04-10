import express from "express";

import { authRouter } from "./auth.route";
import { userRoute } from "./user.route";
import { transactionRouter } from "./transaction.route";
import { SavingRouter } from "./saving.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRoute);
router.use("/transaction", transactionRouter);
router.use("/saving", SavingRouter);

export const api = router;
