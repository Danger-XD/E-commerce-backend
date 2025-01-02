//necessary packages
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import hpp from "hpp";
import cookieParser from "cookie-parser";
// import path from "path";
import router from "./routes/api.js";
import {
  DefaultErrorHandler,
  NotFoundError,
} from "./app/utilities/ErrorHandler.js";

//creating app instance variable
const app = express();

//default middleware
dotenv.config();
app.use(hpp());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: process.env.URL_ENCODE }));
app.use(express.json({ limit: process.env.MAX_JSON_SIZE }));

//APP rate limit
const limiter = rateLimit({
  windowMs: process.env.REQUEST_TIME,
  max: process.env.REQUEST_NUMBER,
});
app.use(limiter);

//cache
app.set("etag", process.env.WEB_CACHE === "true");

//database connection
let options = { user: "", password: "" };
mongoose
  .connect(process.env.DATABASE, { autoIndex: true })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log("DB connection failed: " + err.message);
  });

//restAPI base endpoint handler
app.use("/api", router);

//frontend connection with backend
// app.use(express.static("client/dist"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });
app.get("/",(req, res)=>{
  res.send("Server is running")
})
//Not Found Error Handler
app.use(NotFoundError);

// Default Error Handler
app.use(DefaultErrorHandler);

export default app;
