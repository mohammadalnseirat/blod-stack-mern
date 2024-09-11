import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createcomment_post,
  getCommentsPost_get,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/createcomment", verifyToken, createcomment_post);
router.get("/getcommentsPost/:postId", getCommentsPost_get);

export default router;
