import { Router } from "express";
import {
  GetAllUsers,
  LoginUser,
  OnbordUser,
  UploadImageServer,
  cheackUser,
} from "../controllers/AuthController.js";
import uploadImage from "../middlewares/UploadImage.js";
const router = Router();

router.post("/cheack-user", cheackUser);
router.post("/onbord-user", OnbordUser);
router.post("/login-user", LoginUser);
router.post("/upload-image", uploadImage.single("image"), UploadImageServer);
router.get("/getall-user", GetAllUsers);

export default router;
