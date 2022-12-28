import express from "express";
import {
  getUsers,
  getUsersByNik,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:nik", getUsersByNik);
router.post("/users", createUser);
router.patch("/users/:nik", updateUser);
router.delete("/users/:nik", deleteUser);

export default router;
