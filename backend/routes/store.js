import express from "express";
import {listStores, ownerDashboard} from "../controllers/storeController.js";
import {protect} from "../middleware/authMiddleware.js";

const router=express.Router();
router.get("/",protect(["USER","ADMIN","OWNER"]),listStores);
router.get("/owner", protect(["OWNER"]), ownerDashboard)
export default router;
