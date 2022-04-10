import express from "express";

import { validate } from "../validations/validationCtrlUser";
import userController from "../controller/userController";
import { verifyTokenAdmin, verifyToken } from "../middlewares/auth.middlewares";
import uploadMulter from "../config/multer";

const router = express.Router();
// route admin manage user
router.get("/ad/show-all", verifyTokenAdmin, userController.showAllUser);
router.get(
  "/ad/show-individual",
  verifyTokenAdmin,
  userController.showIndividual
);
router.post(
  "/update",
  validate("updateUser"),
  verifyToken,
  userController.updateUser
);
router.post("/ad/active-user", verifyTokenAdmin, userController.activeUser);

// route user
router.get("/show-individual", verifyToken, userController.showIndividual);
router.post(
  "/update",
  validate("updateUser"),
  verifyToken,
  userController.updateUser
);
router.post(
  "/upload-img",
  verifyToken,
  uploadMulter.single("image"),
  userController.uploadImg
);

router.get("/show-credit", verifyToken, userController.showCredit);

export const userRoute = router;
