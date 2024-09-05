import express from "express";
import {
  deleteUser,
  test_get,
  updateUser_put,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test_get);
router.put("/update/:userId", verifyToken, updateUser_put); // Protects the routes this is bcz no one can update the user if it is not authenticated.
router.delete("/delete/:userId", verifyToken, deleteUser); // Protects the routes this is bcz no

export default router;
