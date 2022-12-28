import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { initData } from "./utils/initData";
import UserRoute from "./routes/userRoute";

AppDataSource.initialize()
  .then(async () => {
    // add initial user data to database
    await initData();

    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(UserRoute);

    // start express server
    app.listen(4000);

    console.log(
      "Express server has started on port 4000. Open http://localhost:4000/users to see results"
    );
  })
  .catch((error) => console.log(error));
