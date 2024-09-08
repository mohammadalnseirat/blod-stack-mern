import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create_post, getPosts_get } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyToken, create_post);
router.get("/getposts", getPosts_get);

export default router;
