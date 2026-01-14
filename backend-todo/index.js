import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from './routes/auth.js'
import todoRoutes from "./routes/todos.js";


dotenv.config();
const app =express();


const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);


app.get("/", (req, res) => {
  res.send("Backend API Running");
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
