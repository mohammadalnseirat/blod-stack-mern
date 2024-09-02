import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
