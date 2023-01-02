import express from "express";
import {
  getUsers,
  getUsersByNik,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:nik", getUsersByNik);
router.get("/users/search/:query", searchUsers);
router.post("/users", createUser);
router.patch("/users/:nik", updateUser);
router.delete("/users/:nik", deleteUser);

export default router;
