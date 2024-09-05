import express from "express";
import { test_get, updateUser_put } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test_get);
router.put("/update/:userId", verifyToken, updateUser_put); // Protects the routes this is bcz no one can update the user if it is not authenticated.

export default router;
