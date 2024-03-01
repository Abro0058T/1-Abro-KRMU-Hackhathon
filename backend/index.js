// packages
import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

// configuration
dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// PORT
const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/video", videoRoutes);
// app.use("/api/v1/uploads", uploadRoutes);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server started at the port ${PORT}`));
