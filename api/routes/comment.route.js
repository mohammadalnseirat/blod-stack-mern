import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createcomment_post } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/createcomment", verifyToken, createcomment_post);

export default router;
