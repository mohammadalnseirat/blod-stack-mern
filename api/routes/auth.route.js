import express from "express";
import { signUpPost } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpPost);

export default router;
