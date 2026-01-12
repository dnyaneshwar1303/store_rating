import express from "express";
import {rateStore} from "../controllers/ratingController.js";
import {protect} from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/",protect(["USER"]),rateStore);
export default router;
