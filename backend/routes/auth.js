import express from "express";
import {register,login} from "../controllers/authController.js";
import { updatePassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.put("/password", protect(["USER","OWNER","ADMIN"]), updatePassword)

export default router;
