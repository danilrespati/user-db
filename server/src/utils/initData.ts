import { User } from "../entity/User";
import { usersData } from "./MOCK_DATA";

export const initData = async () => {
  console.log("Checking database data...");

  const users = await User.find();
  if (users.length == 0) {
    console.log("User database is empty! \nAdding from sample data...");
    usersData.forEach(async (e) => {
      const user = Object.assign(new User(), e);
      await User.save(user);
    });
    console.log("User database is ready!");
  }
};
