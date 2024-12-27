import express from "express"
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getUserForSidebar,getMessages } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users",protectedRoute,getUserForSidebar)
router.get("/:id",protectedRoute,getMessages)
export default router;