import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoute);


app.listen(PORT,()=>{
    console.log("server is running on PORT:"+PORT);
    connectDB();
});