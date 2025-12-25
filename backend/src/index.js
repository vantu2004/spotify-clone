import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import fileUpload from "express-fileupload";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// this will add auth to req obj => req.auth
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../tmp"),
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }
  res
    .status(err.status || 500)
    .json({
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
    });
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
  connectDB();
});
