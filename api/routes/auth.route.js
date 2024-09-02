import express from "express";
import { signInPost, signUpPost } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpPost);
router.post('/signin',signInPost)

export default router;
