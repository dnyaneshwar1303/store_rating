import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {
  dashboard,
  addUser,
  users,
  stores,
  userDetails,
  addStore
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect(["ADMIN"]), dashboard);
router.post("/user", protect(["ADMIN"]), addUser);
router.get("/users", protect(["ADMIN"]), users);
router.get("/user/:id", protect(["ADMIN"]), userDetails);
router.get("/stores", protect(["ADMIN"]), stores);
router.post("/store", protect(["ADMIN"]), addStore);

export default router;
