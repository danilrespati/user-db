import { Request, response, Response } from "express";
import { User } from "../entity/User";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersByNik = async (req: Request, res: Response) => {
  try {
    const nik: any = req.params.nik;
    const response = await User.findOneBy({ nik: nik });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { nik, name } = req.query;
    const response = await User.query(`SELECT * FROM public."user"
    WHERE (CAST(nik as TEXT) ILIKE '%${nik}%')
    AND ("fullName" ILIKE '%${name}%')`);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    if (!newUser.bornDate) {
      newUser.bornDate = null;
    }
    await User.insert(newUser);
    res.status(201).json({ msg: "User created!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const nik: any = req.params.nik;
    const updatedUser: User = req.body;
    await User.update({ nik: nik }, updatedUser);
    res.status(200).json({ msg: "User updated!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const nik: any = req.params.nik;
    await User.delete({ nik: nik });
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
};
