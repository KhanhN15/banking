import express from "express";

import { validate } from "../validations/validationCtrlAuth";
import authController from "../controller/authController";
import { verifyToken } from "../middlewares/auth.middlewares";

const router = express.Router();

router.get("/create", validate("createUser"), authController.check);

// route login
router.post("/login", validate("loginUser"), authController.login);
// route register
router.post("/register", validate("registerUser"), authController.register);
// route logout
router.post("/logout", verifyToken, authController.logout);
export const authRouter = router;
