import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import path from "path";

import auth from "./routes/auth.js";
import posts from "./routes/posts.js";

import { createTable, adminTable } from "./config/db.js";
const MODE = process.env.NODE_ENV === "production" ? "https://tmylines-00ep.onrender.com" : "http://localhost:3000"
const app = express();
const __dirname = path.resolve();
app.use(
    cors({
        origin: MODE,
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/post", posts);
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname,"frontend/dist")))
  app.get("/{*path}",(req,res)=>{
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "API route not found" });
        console.log("Not found bro…")
    }
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
}
app.listen(PORT, async () => {
    await adminTable();
    await createTable();
    console.log("Server running on port", PORT);
});
