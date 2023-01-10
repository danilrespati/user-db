import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
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
    const { nik, name, page, limit, order, asc, gender, nationality } =
      req.query;

    const arrayFilter = (colName: string, values: string[] | string) => {
      let query: string = ``;
      if (typeof values === "string")
        return `AND (${colName} LIKE '%${values}%')`;
      values.forEach((value: string, index: number) => {
        query += `${colName} LIKE '%${value}%'`;
        if (index != values.length - 1) query += ` OR `;
      });
      return `AND (${query})`;
    };

    const response: [] = await User.query(
      `SELECT * FROM public."user"
    WHERE (CAST(nik as TEXT) ILIKE '%${nik}%')
    AND ("fullName" ILIKE '%${name}%')
    ${gender && arrayFilter("gender", gender as string[] | string)}
    ${
      nationality &&
      arrayFilter("nationality", nationality as string[] | string)
    }
    ORDER BY "${order}" ${asc == "true" ? "ASC" : "DESC"}`
    );

    const startIndex =
      (parseInt(page as string) - 1) * parseInt(limit as string);
    const endIndex = parseInt(page as string) * parseInt(limit as string);
    const result = [response.slice(startIndex, endIndex), response.length];
    res.status(200).json(result);
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
