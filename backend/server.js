
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import storeRoutes from "./routes/store.js";
import ratingRoutes from "./routes/rating.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Backend running on ${process.env.PORT}`);
});

