import { Router } from "express";
import {
  AddMessage,
  FindSendMessage,
  getMessage,
} from "../controllers/MessageController.js";
const router = Router();

router.get("/get-message/:from/:to", getMessage);
router.post("/add-message", AddMessage);
router.get("/get-chatmessage", FindSendMessage);
export default router;
